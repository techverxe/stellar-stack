import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/**
 * Contact API config, read from process.env once at module load.
 *
 * Mirrors tikanmaanhuoltoasema/server/config.mjs exactly: this is the only
 * in-repo (well, in-org) precedent for "a static-export site plus a small
 * standalone Node service," so the pattern is copied rather than invented.
 */
export const config = {
  port: Number(process.env.CONTACT_PORT || 4001),
  dbPath: process.env.CONTACT_DB_PATH || path.join(here, "data", "contacts.db"),

  resend: {
    apiKey: process.env.RESEND_API_KEY || "",
    from: process.env.EMAIL_FROM || "Stellar Stack <onboarding@resend.dev>",
    ownerEmail: process.env.OWNER_NOTIFY_EMAIL || "moi@stellarstack.fi",
  },
};

/**
 * Degrades to a logged no-op when unconfigured, rather than throwing, so the
 * contact flow itself (DB write, returned to the visitor as success) works
 * and is testable before a Resend account exists. Every skipped send is
 * still recorded on the row (`owner_email_sent` = 0), auditable rather than
 * silently lost.
 */
export const emailConfigured = Boolean(config.resend.apiKey);
