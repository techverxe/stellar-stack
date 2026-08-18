import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContactInput } from "./validate.mjs";

const good = {
  name: "Matti M",
  email: "matti@example.com",
  message: "Tarvitsen uuden verkkosivun.",
};

test("valid input passes with no errors", () => {
  const { valid, errors } = validateContactInput(good);
  assert.equal(valid, true);
  assert.deepEqual(errors, {});
});

test("missing name is rejected", () => {
  const { valid, errors } = validateContactInput({ ...good, name: "  " });
  assert.equal(valid, false);
  assert.equal(errors.name, "required");
});

test("invalid email is rejected", () => {
  const { valid, errors } = validateContactInput({
    ...good,
    email: "not-an-email",
  });
  assert.equal(valid, false);
  assert.equal(errors.email, "invalid");
});

test("missing message is rejected", () => {
  const { valid, errors } = validateContactInput({ ...good, message: "" });
  assert.equal(valid, false);
  assert.equal(errors.message, "required");
});

test("PLANTED POSITIVE: an over-length message is rejected, not silently truncated and accepted", () => {
  const { valid, errors } = validateContactInput({
    ...good,
    message: "x".repeat(5000),
  });
  assert.equal(valid, false);
  assert.equal(errors.message, "too_long");
});

test("an unrecognised locale is dropped rather than stored as garbage", () => {
  const { value } = validateContactInput({ ...good, locale: "de" });
  assert.equal(value.locale, null);
});

test("a real locale is kept", () => {
  const { value } = validateContactInput({ ...good, locale: "sv" });
  assert.equal(value.locale, "sv");
});

test("whitespace-only optional fields normalize to empty strings, not literal whitespace", () => {
  const { value } = validateContactInput({
    ...good,
    company: "   ",
    phone: "  ",
  });
  assert.equal(value.company, "");
  assert.equal(value.phone, "");
});

test("fields are trimmed", () => {
  const { value } = validateContactInput({
    ...good,
    name: "  Matti M  ",
    email: "  matti@example.com  ",
  });
  assert.equal(value.name, "Matti M");
  assert.equal(value.email, "matti@example.com");
});
