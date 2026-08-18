import { validateContactInput } from "./validate.mjs";
import { createContact, markOwnerEmailSent } from "./db.mjs";
import { sendOwnerContactEmail } from "./email.mjs";

/** { status, body }: plain objects so tests never need a real HTTP server. */
export async function submitContact(
  db,
  requestBody,
  { log = console.error } = {},
) {
  const { valid, errors, value } = validateContactInput(requestBody);
  if (!valid) {
    return { status: 400, body: { error: "invalid_input", fields: errors } };
  }

  const contact = createContact(db, value);

  // Best-effort from here down: the enquiry itself is already committed to
  // the DB. A Resend failure must not make the visitor think their message
  // was lost -- it wasn't, it just hasn't emailed anyone about it yet.
  try {
    if (await sendOwnerContactEmail(contact)) {
      markOwnerEmailSent(db, contact.id);
    }
  } catch (err) {
    log(`contact ${contact.id}: owner email failed: ${err.message}`);
  }

  return { status: 201, body: { id: contact.id } };
}
