import { config, emailConfigured } from "./config.mjs";
import { contactDetailLines, ownerContactEmailHtml } from "./format.mjs";

/**
 * `html` is optional: mail clients that render HTML show the branded
 * version and everything else falls back to the same plain text.
 * Mirrors tikanmaanhuoltoasema/server/email.mjs's sendEmail exactly.
 */
async function sendEmail(to, subject, text, html) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resend.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.resend.from,
      to: [to],
      subject,
      text,
      ...(html ? { html } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(
      `Resend email send failed: ${res.status} ${await res.text()}`,
    );
  }
}

/** Returns true if sent, false if email isn't configured yet (a no-op, not an error). */
export async function sendOwnerContactEmail(contact) {
  if (!emailConfigured) return false;
  await sendEmail(
    config.resend.ownerEmail,
    `New enquiry: ${contact.name}${contact.company ? ` (${contact.company})` : ""}`,
    contactDetailLines(contact).join("\n"),
    ownerContactEmailHtml(contact),
  );
  return true;
}
