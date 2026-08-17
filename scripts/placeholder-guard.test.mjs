import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { scan } from "./placeholder-guard.mjs";

/** A guard nobody has watched fail is a decoration that happens to exit 0.
 *  These plant real positives and require the guard to catch each one. */

function fixture(files) {
  const dir = mkdtempSync(join(tmpdir(), "guard-"));
  for (const [name, body] of Object.entries(files)) {
    const full = join(dir, name);
    mkdirSync(join(full, ".."), { recursive: true });
    writeFileSync(full, body);
  }
  return dir;
}

test("clean output passes", () => {
  const d = fixture({ "index.html": "<p>040 541 7999</p>", "a.js": "const x=1" });
  assert.equal(scan(d).length, 0);
});

test("catches a PLACEHOLDER_ sentinel in html", () => {
  const d = fixture({ "index.html": "<p>Y-tunnus: PLACEHOLDER_0000000-0</p>" });
  const hits = scan(d);
  assert.equal(hits.length, 1);
  assert.match(hits[0].sample[0], /^PLACEHOLDER_/);
});

test("catches a placeholder in a JS chunk, not just html", () => {
  const d = fixture({ "_next/static/chunk.js": 'var b={businessId:"PLACEHOLDER_0000000-0"}' });
  assert.equal(scan(d).length, 1);
});

test("catches a localhost URL", () => {
  const d = fixture({ "sitemap.xml": "<loc>http://localhost:3000/fi/</loc>" });
  const hits = scan(d);
  assert.equal(hits.length, 1);
  assert.match(hits[0].why, /localhost/);
});

test("catches a loopback address", () => {
  const d = fixture({ "index.html": "<img src=http://127.0.0.1:8080/x.jpg>" });
  assert.equal(scan(d).length, 1);
});

test("ignores non-shipping file types", () => {
  const d = fixture({ "notes.md": "PLACEHOLDER_0000000-0" });
  assert.equal(scan(d).length, 0);
});
