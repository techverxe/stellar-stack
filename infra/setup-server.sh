#!/usr/bin/env bash
# One-time droplet setup. Idempotent: safe to re-run.
# Run as root on the droplet.
set -euo pipefail

DOMAIN="${1:-example-client.com}"
ROOT="/var/www/${DOMAIN}"

echo "==> packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx ufw rsync

echo "==> web root"
mkdir -p "${ROOT}/releases" /var/www/certbot
chown -R www-data:www-data "${ROOT}" /var/www/certbot

echo "==> node (booking API only; the rest of the site stays static)"
if ! command -v node >/dev/null || [ "$(node -e 'console.log(process.versions.node.split(".")[0])')" -lt 25 ]; then
  curl -fsSL https://deb.nodesource.com/setup_25.x | bash -
  apt-get install -y -qq nodejs
fi
node --version

echo "==> booking API service account and data directory"
id -u booking >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin booking
mkdir -p /opt/booking/app /var/lib/booking
chown -R booking:booking /opt/booking /var/lib/booking

echo "==> booking API env file"
if [ ! -f /etc/booking.env ]; then
  HERE_INFRA="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  cp "${HERE_INFRA}/booking.env.example" /etc/booking.env
  chown root:booking /etc/booking.env
  chmod 640 /etc/booking.env
  echo "    created /etc/booking.env from the template. Fill in the"
  echo "    Google/Resend values by hand when those accounts exist; deploy.sh"
  echo "    never touches this file."
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
