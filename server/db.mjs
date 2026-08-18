import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SCHEMA = `
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  locale TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  owner_email_sent INTEGER NOT NULL DEFAULT 0
);
`;

export function openDb(dbPath) {
  if (dbPath !== ":memory:") mkdirSync(dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec(SCHEMA);
  return db;
}

export function createContact(
  db,
  { name, company, email, phone, service, message, locale },
) {
  const stmt = db.prepare(`
    INSERT INTO contacts (name, company, email, phone, service, message, locale)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    name,
    company || null,
    email,
    phone || null,
    service || null,
    message,
    locale || null,
  );
  return getContactById(db, info.lastInsertRowid);
}

export function getContactById(db, id) {
  return db.prepare("SELECT * FROM contacts WHERE id = ?").get(id) ?? null;
}

export function markOwnerEmailSent(db, id) {
  db.prepare("UPDATE contacts SET owner_email_sent = 1 WHERE id = ?").run(id);
}
