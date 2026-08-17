import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(
  new URL("../src/content/business.ts", import.meta.url),
  "utf8",
);

const grab = (key) => {
  const m = src.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  assert.ok(m, `${key} not found in business.ts`);
  return m[1];
};

test("Stellar Stack facts are defined properly", () => {
  assert.equal(grab("name"), "Stellar Stack");
  assert.equal(grab("email"), "moi@stellarstack.fi");
  assert.equal(grab("city"), "Turku");
});
