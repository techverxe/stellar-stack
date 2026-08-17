# New Client Onboarding Checklist

Use this checklist whenever instantiating a new client website from `client-website-starter`.

---

## 1. Business Facts (`src/content/business.ts`)

- [ ] Update `business.name` (legal name)
- [ ] Update `business.street`, `business.postalCode`, `business.city`, `business.country`
- [ ] Update `business.phone` (E.164 format, e.g. `+358400000000`) and `business.phoneDisplay` (formatted national, e.g. `040 000 0000`)
- [ ] Update `business.email` and `business.url`
- [ ] Update `business.openingHours` (days and times)
- [ ] Update `business.googleMapsEmbedUrl` and `business.googleMapsDirectionsUrl`

---

## 2. Services & Pricing (`src/content/services.ts`)

- [ ] Review service categories (`wash`, `valet`, `special`)
- [ ] Update service titles, descriptions, and durations
- [ ] Update prices across vehicle classes (`sedan`, `suv`, `van`) or adjust vehicle classes
- [ ] Note: Keep price cell shapes valid (`number`, `null`, or `"ask"`)

---

## 3. Brand & Styling (`src/styles/globals.css`)

- [ ] Update CSS custom properties in `:root` for primary, secondary, and accent colors
- [ ] Configure custom display and body fonts via `next/font/local` or `next/font/google` in `src/app/layout.tsx`
- [ ] Test contrast and visual hierarchy

---

## 4. Copy & Localization (`src/content/messages.ts` & `src/content/legal.ts`)

- [ ] Update home page copy, hero headers, and value propositions for `fi`, `sv`, and `en`
- [ ] Update SEO page titles and meta descriptions
- [ ] Update legal pages (`privacy` and `accessibility` policies) with client-specific controller details

---

## 5. Server & Infrastructure (`server/` & `infra/`)

- [ ] Create `/etc/booking.env` on server from `infra/booking.env.example`
- [ ] Fill in `SITE_BASE_URL`, `GOOGLE_SERVICE_ACCOUNT_KEY_BASE64`, `GOOGLE_CALENDAR_ID`, `RESEND_API_KEY`, `EMAIL_FROM`, `OWNER_NOTIFY_EMAIL`
- [ ] Update `infra/nginx.conf` domain names (`server_name`) and SSL paths
- [ ] Update `infra/deploy.sh` SSH host and domain target

---

## 6. Verification & Quality Gate

- [ ] Run `npm run typecheck` (0 TypeScript errors)
- [ ] Run `npm test` (all unit and integration tests pass)
- [ ] Run `npm run build` (static export completes with 0 errors)
- [ ] Run `npm run guard` (0 placeholder or dev-host leaks)
- [ ] Verify live deployment endpoints (`/health`, `/fi/`, `/sv/`, `/en/`)
