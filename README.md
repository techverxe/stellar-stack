# Stellar Stack

Outreach and lead generation site for **Stellar Stack**, a Turku-based digital
studio selling websites and digital growth services to Finnish small businesses.

Target domain: **stellarstack.fi** (not yet purchased at time of writing).

---

## What this is

A trilingual static marketing site: **81 pages**, 27 per language, in Finnish,
Swedish and English. There is no database, no auth and no server-side logic; the
whole thing exports to plain files that nginx serves directly.

| Area          | Count | Notes                                        |
| ------------- | ----- | -------------------------------------------- |
| Locales       | 3     | `fi` (default), `sv` (Finland Swedish), `en` |
| Services      | 8     | Each with its own detail page and FAQ        |
| Industries    | 8     | Across four outreach segments                |
| Case studies  | 3     | Tikanmaan Huoltoasema, Futuuri, Techverxe    |
| Campaign page | 1     | The 699 EUR fixed-price offer                |

### URL structure

Every locale is prefixed, including the default:

```
/fi/            /sv/               /en/
/fi/palvelut/   /sv/tjanster/      /en/services/
/fi/toimialat/  /sv/branscher/     /en/industries/
/fi/referenssit/ /sv/referenser/   /en/work/
/fi/kampanja/   /sv/kampanj/       /en/offer/
```

Path segments are translated per locale; detail slugs are locale-neutral ids
(`/en/services/verkkosivut/`) so the language switcher can always map a page to
its counterpart in the other two languages. The bare root redirects to `/fi/`
via nginx, with a generated `out/index.html` as a fallback for previewing the
export directly.

---

## Commands

```bash
npm ci
npm run dev        # Next.js dev server
npm run build      # static export to out/, then postbuild
npm run typecheck  # next typegen && tsc --noEmit
npm test           # content invariants + guard self-tests
npm run verify     # mechanical check of the built export
npm run guard      # release gate: no placeholders or dev hosts in out/
```

`npm run build` runs `scripts/postbuild.mjs`, which writes `out/index.html`
(root redirect) and `out/404.html`. Neither can be expressed in the app router
when every page lives under a locale prefix.

### The verification gates

Three separate checks, because "the build succeeded" and "the site is correct"
are different claims:

- **`npm test`** guards the content. Business facts are the real ones, all eight
  services and eight industries have copy in all three locales, no locale ships
  another locale's prose, and no dashes appear in prose.
- **`npm run verify`** guards the built export: 81 routes present, `<html lang>`
  correct per locale, one self-referencing canonical per page, a complete
  hreflang set, exactly one non-empty H1, real contact details reachable from
  every page, every referenced asset actually on disk, and the sitemap URL count
  matching the route count.
- **`npm run guard`** is the release gate, run automatically by `deploy.sh`.

`verify` has been proven to fail on planted defects (wrong `lang`, a forbidden
string, a missing contact detail, a dead portfolio link) and to pass again once
they are reverted. Do not weaken a check to make a build green.

---

## Content

All copy lives in `src/content/`, fully decoupled from layout:

- `site.ts` — locale-neutral facts: address, phone, pricing, portfolio metadata.
  Anything wrong here is wrong in all three languages at once, so it is the one
  file to check before a release.
- `i18n.ts` — locales, translated path segments, URL builders.
- `copy/{fi,sv,en}.ts` — every string, all implementing the `Copy` interface in
  `copy/types.ts`. A missing translation is a TypeScript error, not a blank
  section discovered by a visitor.

Finnish is the reference version: a message changes there first.

---

## Known open items

- **`stellarstack.fi` is not registered yet.** Every canonical URL, the sitemap
  and the structured data already point at it.
- **Y-tunnus is pending.** The footer says so honestly rather than showing a
  placeholder. Fill in `footer.businessIdPending` in all three locales once the
  company is registered.
- **`techverxe.com` is down** (verified 2026-08-18: DNS points at a VM removed
  in the 2026-08-08 GCP reorganisation). Its case study ships with
  `linkable: false` in `site.ts`, which renders a disabled "site under
  maintenance" state instead of a link to nothing. A test asserts this stays
  false; flip it, and update the note beside it, once the host serves again.
- **The contact form composes a `mailto:`.** There is no server to POST to. It
  always works and needs no API key. When a real endpoint exists, only
  `handleSubmit` in `ContactForm.tsx` changes.
- **No Open Graph image yet.** `buildMetadata` references `/og.png`, which is
  not in `public/`. Social shares will fall back to no image until one is added.

---

## Deploy

Same shape as the other client sites: atomic symlink releases on a droplet,
nginx serving files, Let's Encrypt for TLS.

```bash
bash infra/setup-server.sh          # once, on the droplet
bash infra/issue-tls.sh
npm run build
bash infra/deploy.sh <ssh-host> stellarstack.fi
```

`deploy.sh` runs the release guard before uploading and keeps the five most
recent releases so a rollback is one symlink change.

---

## Brand

Logo artwork is in `public/brand/`, supplied by the client and installed
unmodified apart from a tightened `viewBox` (the originals sit inside a 1500
square with wide transparent margins, which cannot be sized in a header):

- `mark-black.svg` / `mark-white.svg` — icon only
- `lockup-horizontal-{black,white}.svg` — icon plus wordmark, side by side
- `lockup-stacked-{black,white}.svg` — icon above wordmark

The header and footer render the mark as an image with the wordmark as live
text, so it stays crisp at any size and is read correctly by screen readers.

Palette: near-black ground `#090d16` with an electric blue accent `#38bdf8`.
Type: Anton (display), Archivo (body), Geist Mono (labels), all self-hosted.
