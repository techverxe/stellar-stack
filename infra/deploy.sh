#!/usr/bin/env bash
# Build and deploy the static export plus the contact API to the staging host.
#
# The gates run FIRST and a red gate stops the deploy. A deploy that ships
# whatever happens to be in out/ is not a deploy, it is a copy.
#
# Atomic by release directory plus symlink flip, adopted from the archived
# droplet plan: a visitor never sees a half-copied site, and rollback is one
# symlink change rather than a re-upload.
set -euo pipefail

PROJECT="${GCP_PROJECT:-techverxe}"
ZONE="${GCP_ZONE:-europe-north1-b}"
VM="${VM_NAME:-stellar-web-vm}"
DOMAIN="${DOMAIN:-stellar.futuuri.online}"
KEEP="${KEEP_RELEASES:-5}"

cd "$(dirname "$0")/.."

echo "== gates =="
# All five, in the order CI runs them. `sweep` is included deliberately: it
# was documented as a gate and wired into nothing until TVX-027.
npm run typecheck
npm test
npm run build
npm run verify
npm run guard
npm run sweep

COUNT="$(find out -name '*.html' | wc -l | tr -d ' ')"
[ "$COUNT" -gt 0 ] || { echo "FAIL: build produced no HTML"; exit 1; }
echo "built $COUNT html files"

REL="$(date -u +%Y%m%dT%H%M%SZ)"
echo "== ship release $REL =="
COPYFILE_DISABLE=1 tar --no-xattrs -czf - -C out . | gcloud compute ssh "$VM" --project="$PROJECT" --zone="$ZONE" --quiet --command="
  set -e
  R=/srv/stellar/releases/$REL
  sudo mkdir -p \"\$R\"
  sudo tar -xzf - -C \"\$R\"
  # Assert the payload before it can become live.
  sudo test -f \"\$R/index.html\" || { echo 'FAIL: no index.html in payload'; sudo rm -rf \"\$R\"; exit 1; }
  sudo chmod -R a+rX \"\$R\"
  sudo ln -sfn \"\$R\" /srv/stellar/current
  # Keep a bounded history so rollback stays possible without filling a 20GB disk.
  ls -1dt /srv/stellar/releases/*/ | tail -n +\$(( $KEEP + 1 )) | xargs -r sudo rm -rf
  echo \"current -> \$(readlink -f /srv/stellar/current)\"
"

echo "== ship the contact API =="
# The unit file ships on every deploy, not once at provision time: it is
# source in this repo, so a change to it must reach the host the same way a
# change to server/*.mjs does.
gcloud compute scp "$(dirname "$0")/stellar-contact.service" "$VM":~/stellar-contact.service --project="$PROJECT" --zone="$ZONE" --quiet
gcloud compute ssh "$VM" --project="$PROJECT" --zone="$ZONE" --quiet --command="sudo cp ~/stellar-contact.service /etc/systemd/system/stellar-contact.service"
# server/ has zero npm dependencies (node:sqlite, node:http, fetch), so this
# is a plain file copy: no install step, no build step, no node_modules. The
# SQLite database lives at /var/lib/stellar-contact, outside anything shipped
# here, so a redeploy can never touch stored enquiries.
COPYFILE_DISABLE=1 tar --no-xattrs --exclude server/data -czf - server | gcloud compute ssh "$VM" --project="$PROJECT" --zone="$ZONE" --quiet --command="
  set -e
  sudo rm -rf /opt/stellar-contact/app/server
  sudo mkdir -p /opt/stellar-contact/app
  sudo tar -xzf - -C /opt/stellar-contact/app
  sudo chown -R stellar-contact:stellar-contact /opt/stellar-contact/app
  sudo systemctl daemon-reload
  sudo systemctl enable stellar-contact >/dev/null 2>&1 || true
  sudo systemctl restart stellar-contact
  sleep 2
  sudo systemctl is-active --quiet stellar-contact || {
    echo 'FAIL: contact API did not start'
    sudo journalctl -u stellar-contact -n 30 --no-pager
    exit 1
  }
  echo 'contact API: active'
"

echo "== verify the LIVE site, not the build =="
fail=0
check() {
  local path="$1" want="$2"
  local got; got="$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://$DOMAIN$path")"
  printf '  %-30s %s (want %s)\n' "$path" "$got" "$want"
  [ "$got" = "$want" ] || fail=1
}
check /                       302
check /palvelut/              302
check /fi/                    200
check /sv/                    200
check /en/                    200
check /fi/palvelut/           200
check /fi/toimialat/          200
check /fi/yhteystiedot/       200
check /fi/kampanja/           200
# A 404 that returns 200 makes every check above meaningless, so assert it.
check /fi/definitely-not-a-page/ 404
# Regression guards for the two routing bugs this config was built around.
check /favicon.svg            200
check /favicon.ico            404
check /og-fi.png              200
# The contact API is the one non-static path; prove the proxy reaches it.
check /api/contact/health     200

echo "  contact API health body:"
curl -s --max-time 20 "https://$DOMAIN/api/contact/health" | sed 's/^/    /'
echo

if [ "$fail" != "0" ]; then
  echo "DEPLOY VERIFY FAILED. Roll back to the previous release with:"
  echo "  gcloud compute ssh $VM --project=$PROJECT --zone=$ZONE --command='sudo ln -sfn \$(ls -1dt /srv/stellar/releases/*/ | sed -n 2p) /srv/stellar/current'"
  exit 1
fi
echo "DEPLOY OK - https://$DOMAIN"
