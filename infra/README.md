# infra

Staging host for the Stellar Stack site.

|          |                                                                             |
| -------- | --------------------------------------------------------------------------- |
| URL      | https://stellar.futuuri.online                                              |
| Host     | `stellar-web-vm`, GCP project `techverxe`, zone `europe-north1-b`, `e2-micro` |
| IP       | `35.228.246.36`, reserved as `stellar-web-ip`                               |
| DNS      | A record on `futuuri.online`, managed at DigitalOcean                       |
| Web root | `/srv/stellar/current` -> `/srv/stellar/releases/<UTC timestamp>`           |
| Server   | Caddy, automatic TLS from Let's Encrypt                                     |
| API      | `stellar-contact.service`, `127.0.0.1:4001`, proxied at `/api/contact`      |

```bash
./infra/provision.sh    # one-time host setup, idempotent
./infra/deploy.sh       # gates, build, ship, verify the live site
```

**This is not the production site.** `stellarstack.fi` is not registered yet,
and every canonical URL, the hreflang set and the sitemap in this build point
at it. This host serves the same build under a different name purely so the
site can be seen and used before the domain exists.

## Why Caddy on GCP, and what happened to the nginx scripts

The inherited plan in this directory targeted nginx plus certbot on a
DigitalOcean droplet. It was never run: no server existed for this site until
2026-08-19. Those files are kept in `_archive-nginx-droplet/` rather than
deleted, because they are real work and a droplet may still be the right
answer at the production cutover.

GCP because the Techverxe project already runs there (`techverxe-com`,
`protax-web-vm`), so there is no new provider and no new billing surface.
Caddy rather than nginx for one reason that matters on a host nobody watches:
it issues **and renews** TLS itself. nginx means certbot plus a renewal timer,
which is two more things that can fail silently at 3am.

This is the same shape as the sibling Protax staging host, deliberately: one
pattern, twice, beats two patterns once.

**What was ported across rather than reinvented**, because the nginx config
was better than a first Caddy attempt would have been:

- the full security header set, including the CSP and `Permissions-Policy`
- the cache tiers: `_next/static` immutable for a year, `/img` and `/brand`
  for 30 days, pages `must-revalidate`, sitemap for an hour
- release directories plus a symlink flip, so rollback is one symlink change
- dotfile denial, the `404.html` error page, the bare-root redirect to `/fi/`
  and the locale backstop
- the `/api/contact` proxy, declared BEFORE the routing handlers so the
  locale backstop can never rewrite an API call

## Two CSP values that differ from the Protax Caddyfile

Both were checked against this site's own built export rather than copied:

- **`font-src` stays `'self'`, with no `data:`.** Protax needs `data:` because
  its build inlines a woff as a data: URI. This site self-hosts Inter and
  Geist Mono as real `.woff2` files under `/_next/static/media`.
- **`frame-src` is `'none'`.** The contact page links out to Google Maps with
  a plain anchor and embeds no iframe (`grep -c "<iframe>"` on the built
  contact page returns 0).

Copying a policy without re-deriving it is how a site ends up granting
permissions it does not use, or blocking a resource it does.

## The contact API

The one non-static path. `server/*.mjs` is a standalone Node service with zero
npm dependencies (`node:http`, `node:sqlite`, raw `fetch`), so deploying it is
a file copy with no install step. It runs as its own unprivileged user under
`ProtectSystem=strict`, and its SQLite database lives at
`/var/lib/stellar-contact`, outside the synced tree, so a redeploy cannot
touch stored enquiries.

`deploy.sh` ships the unit file on every deploy, not once at provision time:
the unit is source in this repo, so a change to it must reach the host the
same way a change to `server/*.mjs` does.

### The Resend key

`email.mjs` degrades to a logged no-op when `RESEND_API_KEY` is empty, and the
row records `owner_email_sent = 0`. So the form is fully functional before any
email exists: validated, stored, success returned, nothing silently lost.

The key is a secret and never travels through this repo, a workstation file,
or a command line. Put it in Secret Manager, then read it onto the host:

```bash
# 1. store it (prompts, input hidden, value goes to stdin not argv)
gcloud secrets create stellar-resend-api-key --project=techverxe --replication-policy=automatic
printf 'Paste the Resend API key, then Enter: '; stty -echo; IFS= read -r k; stty echo; echo
printf '%s' "$k" | gcloud secrets versions add stellar-resend-api-key --project=techverxe --data-file=-
unset k

# 2. check it landed
gcloud secrets versions list stellar-resend-api-key --project=techverxe
```

Then set `RESEND_API_KEY` and `OWNER_NOTIFY_EMAIL` in
`/etc/stellar-contact.env` on the host and `systemctl restart
stellar-contact`. `provision.sh` creates that file once and never overwrites
it, so a filled-in key survives every re-run; `deploy.sh` never reads it.

Until `stellarstack.fi` is verified in Resend, `EMAIL_FROM` has to stay
`onboarding@resend.dev`, which in a sandboxed Resend account can only deliver
to the account owner's own verified address.

## Two things to change at cutover

1. **`robots.txt` is overridden to disallow everything**, in the Caddyfile.
   This host must never be indexed under a name that is not the site's own.
   Remove that block at cutover or the production site ships noindex.
2. **The Caddyfile names `stellar.futuuri.online`.** At cutover it gets the
   real domain, and the archived droplet path becomes a live option again.
