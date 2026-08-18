// Shared formatting for the owner notification email. server/ ships
// standalone (rsync'd with zero deps, no src/ import), so the brand tokens
// below are a deliberate, small, load-bearing duplication of
// src/styles/globals.css's --dark/--mint/--ink rather than a build-time
// dependency. Keep in sync by hand if the palette ever changes.
const DARK = "#0c1216";
const MINT = "#83d6c4";
const INK = "#171717";
const MUTED = "#5b6672";
const LINE = "#e2e5ea";
const BG = "#f6f7f9";

export function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Table-based layout, every style inline: this is email, not a browser.
 * Gmail, Outlook and most mobile mail clients strip or ignore <style>
 * blocks and flex/grid, so a table skeleton with inline styles is the one
 * layout approach that renders consistently across all of them. Mirrors
 * tikanmaanhuoltoasema/server/format.mjs's emailShell exactly.
 */
function emailShell({ preheader, title, bodyHtml }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0; padding:0; background:${BG}; font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}; padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background:#ffffff; border:1px solid ${LINE}; border-radius:4px; overflow:hidden;">
            <tr>
              <td style="background:${DARK}; padding:22px 28px;">
                <span style="font-family:Arial,Helvetica,sans-serif; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:${MINT};">Stellar Stack</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px; border-top:1px solid ${LINE}; background:${BG};">
                <p style="margin:0; font-size:12.5px; color:${MUTED}; line-height:1.6;">
                  Stellar Stack &middot; H&auml;meenkatu 09, 20500 Turku<br />
                  <a href="tel:+358417230960" style="color:${MUTED}; text-decoration:underline;">041 723 0960</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label, value) {
  return `<tr>
    <td style="padding:9px 0; border-bottom:1px solid ${LINE}; font-size:13px; color:${MUTED}; width:32%; vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:9px 0; border-bottom:1px solid ${LINE}; font-size:14.5px; color:${INK}; vertical-align:top;">${value}</td>
  </tr>`;
}

/** Plain-text version, shared with the HTML body so the two can't drift. */
export function contactDetailLines(contact) {
  const lines = [`Name: ${contact.name}`, `Email: ${contact.email}`];
  if (contact.company) lines.push(`Company: ${contact.company}`);
  if (contact.phone) lines.push(`Phone: ${contact.phone}`);
  if (contact.service) lines.push(`Interested in: ${contact.service}`);
  if (contact.locale) lines.push(`Site language: ${contact.locale}`);
  lines.push("", "Message:", contact.message);
  return lines;
}

export function ownerContactEmailHtml(contact) {
  const rows = [
    detailRow(
      "Name",
      `<a href="mailto:${escapeHtml(contact.email)}" style="color:${INK};">${escapeHtml(contact.email)}</a><br />${escapeHtml(contact.name)}`,
    ),
  ];
  if (contact.company)
    rows.push(detailRow("Company", escapeHtml(contact.company)));
  if (contact.phone)
    rows.push(
      detailRow(
        "Phone",
        `<a href="tel:${escapeHtml(contact.phone.replace(/\s/g, ""))}" style="color:${INK};">${escapeHtml(contact.phone)}</a>`,
      ),
    );
  if (contact.service)
    rows.push(detailRow("Interested in", escapeHtml(contact.service)));
  if (contact.locale)
    rows.push(detailRow("Site language", escapeHtml(contact.locale)));

  const body = `
    <h1 style="margin:0 0 18px; font-size:19px; font-weight:600; color:${INK};">New enquiry from stellarstack.fi</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${rows.join("")}
    </table>
    <p style="margin:0 0 6px; font-size:13px; color:${MUTED};">Message</p>
    <p style="margin:0; font-size:14.5px; color:${INK}; line-height:1.6; white-space:pre-wrap;">${escapeHtml(contact.message)}</p>
  `;

  return emailShell({
    preheader: `${contact.name}: ${contact.message.slice(0, 80)}`,
    title: "New enquiry",
    bodyHtml: body,
  });
}
