#!/usr/bin/env bash
# One-time droplet setup. Idempotent: safe to re-run.
# Run as root on the droplet.
set -euo pipefail

DOMAIN="${1:-stellarstack.fi}"
ROOT="/var/www/${DOMAIN}"

echo "==> packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx ufw rsync

echo "==> web root"
mkdir -p "${ROOT}/releases" /var/www/certbot
chown -R www-data:www-data "${ROOT}" /var/www/certbot

echo "==> node (contact API only; the rest of the site stays static)"
# Only actually required: >= 22.5 for a stable node:sqlite.
if ! command -v node >/dev/null || [ "$(node -e 'console.log(process.versions.node.split(".")[0])')" -lt 25 ]; then
  curl -fsSL https://deb.nodesource.com/setup_25.x | bash -
  apt-get install -y -qq nodejs
fi
node --version

echo "==> contact API service account and data directory"
id -u stellar-contact >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin stellar-contact
mkdir -p /opt/stellar-contact/app /var/lib/stellar-contact
chown -R stellar-contact:stellar-contact /opt/stellar-contact /var/lib/stellar-contact

echo "==> contact API env file"
# Never overwrite a real one. If this is the first run, the file is created
# blank; the service still starts (see stellar-contact.service), it just
# runs with email as a logged no-op until RESEND_API_KEY is filled in.
if [ ! -f /etc/stellar-contact.env ]; then
  HERE_INFRA="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  cp "${HERE_INFRA}/stellar-contact.env.example" /etc/stellar-contact.env
  chown root:stellar-contact /etc/stellar-contact.env
  chmod 640 /etc/stellar-contact.env
  echo "    created /etc/stellar-contact.env from the template. Fill in"
  echo "    RESEND_API_KEY by hand when that account exists; deploy.sh never"
  echo "    touches this file."
fi

echo "==> firewall"
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null
ufw status | head -8

echo "==> hide nginx version globally"
echo "server_tokens off;" > /etc/nginx/conf.d/security.conf

echo "==> disable the packaged default site"
unlink /etc/nginx/sites-enabled/default 2>/dev/null || true

nginx -t
systemctl enable --now nginx

echo
echo "Setup complete."
echo "NEXT: DNS must resolve to this droplet BEFORE TLS can be issued, because"
echo "Let's Encrypt validates over HTTP on port 80. Then run: bash issue-tls.sh <DOMAIN>"
