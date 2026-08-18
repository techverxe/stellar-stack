#!/usr/bin/env bash
# Deploys the built static export from this machine to the droplet.
#
# Atomic: uploads into a timestamped release directory, then flips a symlink.
# A visitor never sees a half-copied site, and a rollback is one symlink change
# rather than a re-upload.
set -euo pipefail

HOST="${1:-client}"
DOMAIN="${2:-stellarstack.fi}"
ROOT="/var/www/${DOMAIN}"
HERE="$(cd "$(dirname "$0")/.." && pwd)"

if [ ! -d "${HERE}/out" ]; then
  echo "No build output found. Run: npm run build"
  exit 1
fi

echo "==> release gate: no placeholders or dev hosts may ship"
( cd "${HERE}" && npm run guard )

REL="$(date +%Y%m%d-%H%M%S)"
echo "==> uploading release ${REL}"
ssh "${HOST}" "mkdir -p ${ROOT}/releases/${REL}"
rsync -az --delete "${HERE}/out/" "${HOST}:${ROOT}/releases/${REL}/"

echo "==> installing nginx config"
ssh "${HOST}" "mkdir -p /etc/nginx/snippets"
scp -q "${HERE}/infra/security-headers.conf" "${HOST}:/etc/nginx/snippets/security.conf"
scp -q "${HERE}/infra/nginx.conf" "${HOST}:/etc/nginx/sites-available/${DOMAIN}"

echo "==> flipping the symlink and reloading"
ssh "${HOST}" "set -e
  chown -R www-data:www-data ${ROOT}/releases/${REL}
  ln -sfn ${ROOT}/releases/${REL} ${ROOT}/current
  nginx -t
  systemctl reload nginx
  # keep the five most recent releases so a rollback target always exists
  ls -1dt ${ROOT}/releases/*/ | tail -n +6 | xargs -r --no-run-if-empty rm -rf --"

echo "==> live verification from the outside"
# This list was inherited byte-for-byte from the tikanmaanhuoltoasema
# template this repo started from (/fi/hinnasto/, /fi/varaa/, /fi/varaa/peru/,
# /llms.txt: none of them exist on this site) and would have failed every
# real deploy at this exact step. Replaced with this site's actual routes.
# "/" is an intentional 302 to "/fi/" (location = / in nginx.conf); every
# other path here must be a real 200, not a redirect or an error.
#
# /.well-known/security.txt assumes TVX-028 has also merged (that PR adds
# the file; this one does not touch public/). If this ever fails on that
# one path alone right after a merge, check merge order before assuming a
# real regression.
for U in "/" "/fi/" "/sv/" "/en/" "/fi/palvelut/" "/fi/palvelut/verkkosivut/" "/fi/toimialat/" "/fi/referenssit/" "/fi/artikkelit/" "/fi/meista/" "/fi/yhteystiedot/" "/fi/kampanja/" "/fi/tietosuoja/" "/sitemap.xml" "/robots.txt" "/favicon.svg" "/og-fi.png" "/.well-known/security.txt"; do
  CODE="$(curl -sS -o /dev/null -w '%{http_code}' "https://${DOMAIN}${U}" || echo FAILED)"
  printf "  %-34s %s\n" "${U}" "${CODE}"
  EXPECTED="200"
  [ "${U}" = "/" ] && EXPECTED="302"
  if [ "${CODE}" != "${EXPECTED}" ]; then
    echo "  FAIL: ${U} returned ${CODE}, expected ${EXPECTED}"
    exit 1
  fi
done

echo

echo "==> security headers actually served"
curl -sSI "https://${DOMAIN}/fi/" | grep -iE "strict-transport|content-security|x-content-type|x-frame|referrer-policy" || true

echo
echo "Deployed release ${REL}"
echo "Rollback: ssh ${HOST} 'ln -sfn ${ROOT}/releases/<previous> ${ROOT}/current && systemctl reload nginx'"
