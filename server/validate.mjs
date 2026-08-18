const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME_LEN = 100;
const MAX_COMPANY_LEN = 100;
const MAX_PHONE_LEN = 30;
const MAX_SERVICE_LEN = 60;
const MAX_MESSAGE_LEN = 4000;

export function validateContactInput(body) {
  const errors = {};
  const name = String(body?.name ?? "").trim();
  const company = String(body?.company ?? "")
    .trim()
    .slice(0, MAX_COMPANY_LEN);
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "")
    .trim()
    .slice(0, MAX_PHONE_LEN);
  const service = String(body?.service ?? "")
    .trim()
    .slice(0, MAX_SERVICE_LEN);
  const message = String(body?.message ?? "").trim();
  const locale = ["fi", "sv", "en"].includes(body?.locale) ? body.locale : null;

  if (!name) errors.name = "required";
  else if (name.length > MAX_NAME_LEN) errors.name = "too_long";

  if (!EMAIL_RE.test(email)) errors.email = "invalid";

  if (!message) errors.message = "required";
  else if (message.length > MAX_MESSAGE_LEN) errors.message = "too_long";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: { name, company, email, phone, service, message, locale },
  };
}
