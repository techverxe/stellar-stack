#!/usr/bin/env bash
# One-time host provisioning for the Stellar Stack staging site. Idempotent.
#
# Run from a machine with gcloud auth:  ./infra/provision.sh
#
# The site is `output: "export"`, so the pages are plain files with no Node
# process behind them. The ONE exception is the contact form's API, which is
# a standalone zero-dependency service (server/*.mjs) proxied at /api/contact.
# See infra/README.md for why this is Caddy on GCP rather than the archived
# nginx-on-droplet path.
set -euo pipefail

PROJECT="${GCP_PROJECT:-techverxe}"
ZONE="${GCP_ZONE:-europe-north1-b}"
VM="${VM_NAME:-stellar-web-vm}"
HERE="$(cd "$(dirname "$0")" && pwd)"

echo "== install caddy and node, lay out the web root =="
gcloud compute ssh "$VM" --project="$PROJECT" --zone="$ZONE" --quiet --command='
  set -e
  export DEBIAN_FRONTEND=noninteractive
  sudo apt-get update -qq
  sudo apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl

  if [ ! -f /usr/share/keyrings/caddy-stable-archive-keyring.gpg ]; then
    curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/gpg.key" \
      | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  fi
  if [ ! -f /etc/apt/sources.list.d/caddy-stable.list ]; then
    curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt" \
      | sudo tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
    sudo apt-get update -qq
  fi
  sudo apt-get install -y -qq caddy

  # Node is needed ONLY for the contact API. The version floor is real: the
  # service imports node:sqlite, which is not present before 22.5.
  if ! command -v node >/dev/null || [ "$(node -e "console.log(process.versions.node.split(\".\")[0])")" -lt 22 ]; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y -qq nodejs
  fi
  node --version

  # Releases plus a symlink, adopted from the archived droplet plan: rollback
  # is one symlink change rather than a re-upload, and history is retained.
  sudo mkdir -p /srv/stellar/releases
  if [ ! -e /srv/stellar/current ]; then
    R=/srv/stellar/releases/bootstrap
    sudo mkdir -p "$R"
    printf "%s\n" "<!doctype html><title>stellar staging</title><h1>Host is up, nothing deployed yet</h1>" \
      | sudo tee "$R/index.html" >/dev/null
    sudo ln -sfn "$R" /srv/stellar/current
  fi
  sudo chmod -R a+rX /srv/stellar

  # Contact API: dedicated unprivileged user, and a data directory OUTSIDE
  # the synced release tree so a redeploy can never touch stored enquiries.
  id -u stellar-contact >/dev/null 2>&1 || sudo useradd --system --no-create-home --shell /usr/sbin/nologin stellar-contact
  sudo mkdir -p /opt/stellar-contact/app /var/lib/stellar-contact
  sudo chown -R stellar-contact:stellar-contact /opt/stellar-contact /var/lib/stellar-contact

  # The env file is WRITTEN ON THE HOST, never copied from a workstation: it
  # is the one file that will hold a real Resend key, and a key that travels
  # by scp has been on a second disk. Existing files are left untouched, so a
  # filled-in key survives every re-run.
  if [ ! -f /etc/stellar-contact.env ]; then
    printf "%s\n" \
      "CONTACT_PORT=4001" \
      "CONTACT_DB_PATH=/var/lib/stellar-contact/contacts.db" \
      "RESEND_API_KEY=" \
      "EMAIL_FROM=Stellar Stack <onboarding@resend.dev>" \
      "OWNER_NOTIFY_EMAIL=moi@stellarstack.fi" \
      | sudo tee /etc/stellar-contact.env >/dev/null
    sudo chown root:stellar-contact /etc/stellar-contact.env
    sudo chmod 640 /etc/stellar-contact.env
    echo "    created /etc/stellar-contact.env; the service runs with email as"
    echo "    a logged no-op until RESEND_API_KEY is filled in by hand."
  else
    echo "    /etc/stellar-contact.env already exists, left untouched"
  fi
'

echo "== install the Caddyfile =="
gcloud compute scp "$HERE/caddy/Caddyfile" "$VM":~/Caddyfile.new --project="$PROJECT" --zone="$ZONE" --quiet
gcloud compute ssh "$VM" --project="$PROJECT" --zone="$ZONE" --quiet --command='
  set -e
  sudo cp ~/Caddyfile.new /etc/caddy/Caddyfile
  # Validate BEFORE reloading. An invalid config that reaches a reload takes
  # the site down; a rejected one leaves the old config serving.
  sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null
  sudo systemctl enable --now caddy
  sudo systemctl reload caddy
  code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1/)
  echo "local HTTP: $code"
  [ "$code" = "200" ] || { echo "FAIL: caddy is not serving"; exit 1; }
'
echo "PROVISION OK"
