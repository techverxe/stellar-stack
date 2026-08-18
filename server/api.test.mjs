import { test } from "node:test";
import assert from "node:assert/strict";
import { openDb, getContactById } from "./db.mjs";
import { submitContact } from "./api.mjs";

const noopLog = () => {};

const good = {
  name: "Matti M",
  email: "matti@example.com",
  message: "Tarvitsen uuden verkkosivun.",
};

test("submitContact: 400 on invalid input, no row created", async () => {
  const db = openDb(":memory:");
  const { status, body } = await submitContact(
    db,
    { ...good, email: "bad" },
    { log: noopLog },
  );
  assert.equal(status, 400);
  assert.equal(body.fields.email, "invalid");
  assert.equal(getContactById(db, 1), null);
});

test("submitContact: 201 with the new row's id, email unconfigured degrades silently (not thrown)", async () => {
  const db = openDb(":memory:");
  const { status, body } = await submitContact(db, good, { log: noopLog });
  assert.equal(status, 201);
  assert.ok(body.id > 0);
  const row = getContactById(db, body.id);
  assert.equal(row.name, good.name);
  // RESEND_API_KEY is unset in the test environment, so email sending is a
  // no-op by design (see config.mjs's emailConfigured) -- this must not be
  // an error, and must not block the write that already happened.
  assert.equal(row.owner_email_sent, 0);
});

// api.mjs also wraps sendOwnerContactEmail in try/catch so a Resend failure
// can never roll back an already-committed enquiry. That specific throw
// path needs a real or deliberately mocked RESEND_API_KEY to reach, since
// config.mjs reads the env once at module load and nothing in a test can
// flip its already-evaluated emailConfigured afterward. This is the same
// boundary tikanmaanhuoltoasema/server/ accepts -- it has no email.test.mjs
// either, for the same structural reason -- rather than a gap unique to
// this port. Not worth a test that would only prove a mock fired, not that
// the real integration behaves correctly.
