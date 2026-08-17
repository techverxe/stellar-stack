# Client Website Starter

A genericized, portfolio-tier starter kit for client websites: multi-lingual static marketing pages plus an optional serverless/lightweight booking and contact API (`node:sqlite`, Google Calendar, Resend email).

Extracted from production client site architectures and genericized under ticket `TVX-001`.

---

## Starter Kit Highlights

- **Text-First Content Layer**: Business facts (`src/content/business.ts`), services & 39-cell pricing matrix (`src/content/services.ts`), and localized copy (`src/content/messages.ts`, `src/content/legal.ts`) completely decoupled from layout components.
- **Onboarding Docs & Guard**: Explicit onboarding guidance in `NEW_CLIENT_CHECKLIST.md` and top doc comments. Release gate (`npm run guard`) prevents accidental deployment of placeholders or dev hostnames.
- **Zero-Dependency Booking API (`server/`)**: Lightweight Node.js service using `node:sqlite`, `node:http`, and `fetch`. Integrates Google Calendar service account sync and Resend email notifications with automatic graceful fallback when unconfigured.
- **Nginx & Systemd Infra (`infra/`)**: Production-ready nginx config with locale-aware routing (`try_files` + `@localize`), security headers (CSP, HSTS), systemd service unit, and atomic deploy script with automated health checks.

---

## Getting Started for a New Client

1. Follow the step-by-step checklist in [`NEW_CLIENT_CHECKLIST.md`](./NEW_CLIENT_CHECKLIST.md).
2. Edit `src/content/business.ts` with the new client's facts.
3. Update `src/content/services.ts` and `src/content/messages.ts`.
4. Customize theme colors and typography in `src/styles/globals.css`.

---

## Local Development & Commands

```bash
npm ci
npm run dev          # Next.js development server
npm run typecheck    # TypeScript compilation check (next typegen && tsc --noEmit)
npm test             # Unit & integration test suite (Node test runner)
npm run build        # Static HTML export to out/
npm run guard        # Release gate check scanning build output
```

### Optional Booking API

```bash
npm run booking-api  # Runs server/index.mjs on port 4001
```

See `infra/booking.env.example` for environment variable configuration.
