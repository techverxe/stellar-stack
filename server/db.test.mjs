import { test } from "node:test";
import assert from "node:assert/strict";
import {
  openDb,
  createContact,
  getContactById,
  markOwnerEmailSent,
} from "./db.mjs";

function freshDb() {
  return openDb(":memory:");
}

const sample = {
  name: "Matti M",
  email: "matti@example.com",
  message: "Tarvitsen uuden verkkosivun.",
};

test("createContact writes a row and returns it with defaults applied", () => {
  const db = freshDb();
  const c = createContact(db, sample);
  assert.equal(c.name, sample.name);
  assert.equal(c.email, sample.email);
  assert.equal(c.message, sample.message);
  assert.equal(c.company, null);
  assert.equal(c.phone, null);
  assert.equal(c.owner_email_sent, 0);
  assert.ok(c.id > 0);
  assert.ok(c.created_at);
});

test("createContact stores optional fields when provided", () => {
  const db = freshDb();
  const c = createContact(db, {
    ...sample,
    company: "Acme Oy",
    phone: "0401234567",
    service: "Verkkosivut",
    locale: "fi",
  });
  assert.equal(c.company, "Acme Oy");
  assert.equal(c.phone, "0401234567");
  assert.equal(c.service, "Verkkosivut");
  assert.equal(c.locale, "fi");
});

test("getContactById returns null for a missing row, not an error", () => {
  const db = freshDb();
  assert.equal(getContactById(db, 999), null);
});

test("markOwnerEmailSent flips the flag on the right row only", () => {
  const db = freshDb();
  const a = createContact(db, sample);
  const b = createContact(db, { ...sample, email: "b@example.com" });
  markOwnerEmailSent(db, a.id);
  assert.equal(getContactById(db, a.id).owner_email_sent, 1);
  assert.equal(getContactById(db, b.id).owner_email_sent, 0);
});

test("PLANTED POSITIVE: two contacts from the same email both persist (this is a lead form, not a booking system -- no uniqueness constraint should exist)", () => {
  const db = freshDb();
  const first = createContact(db, sample);
  const second = createContact(db, sample);
  assert.notEqual(first.id, second.id);
  assert.equal(getContactById(db, first.id).email, sample.email);
  assert.equal(getContactById(db, second.id).email, sample.email);
});
