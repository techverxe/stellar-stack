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
