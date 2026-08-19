#!/usr/bin/env bash
# Issues the TLS certificate and installs the real site config.
# Run AFTER DNS resolves to this droplet.
set -euo pipefail
DOMAIN="${1:-stellarstack.fi}"

echo "==> confirming DNS points here BEFORE asking Let's Encrypt for anything"
MYIP="$(curl -s -4 https://icanhazip.com || true)"
DNSIP="$(getent hosts "${DOMAIN}" | awk '{print $1}' | head -1 || true)"
echo "    droplet public IP    : ${MYIP:-unknown}"
echo "    ${DOMAIN} resolves to: ${DNSIP:-nothing}"
if [ -z "${DNSIP}" ] || [ "${DNSIP}" != "${MYIP}" ]; then
  echo
  echo "STOP: DNS does not point at this droplet yet."
  echo "Certbot would fail, and repeated failures count against Let's Encrypt"
  echo "rate limits, which then blocks the real attempt for hours."
  exit 1
fi

echo "==> temporary HTTP server so the ACME challenge can be answered"
cat > /etc/nginx/sites-available/bootstrap <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};
    location ^~ /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 200 'provisioning'; add_header Content-Type text/plain; }
}
EOF
ln -sf /etc/nginx/sites-available/bootstrap /etc/nginx/sites-enabled/bootstrap
unlink "/etc/nginx/sites-enabled/${DOMAIN}" 2>/dev/null || true
nginx -t && systemctl reload nginx

echo "==> requesting certificate for apex and www"
certbot certonly --webroot -w /var/www/certbot \
  -d "${DOMAIN}" -d "www.${DOMAIN}" \
  --non-interactive --agree-tos --register-unsafely-without-email \
  --keep-until-expiring

echo "==> installing the real site config"
unlink /etc/nginx/sites-enabled/bootstrap 2>/dev/null || true
ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
nginx -t && systemctl reload nginx

echo "==> renewal timer"
systemctl enable --now certbot.timer
certbot renew --dry-run 2>&1 | tail -3

echo
echo "TLS live: https://${DOMAIN}"
