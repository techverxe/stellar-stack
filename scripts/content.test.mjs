import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

/**
 * Content invariants, checked against the source text.
 *
 * TypeScript already forces every locale to implement the full `Copy` shape,
 * so these tests deliberately cover what the type system cannot: that the
 * facts are the RIGHT values, and that no locale quietly ships another
 * locale's language. A Swedish file that compiles but contains Finnish prose
 * is a real and easy mistake, and the compiler is blind to it.
 */

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");

const siteSrc = read("../src/content/site.ts");
const fiSrc = read("../src/content/copy/fi.ts");
const svSrc = read("../src/content/copy/sv.ts");
const enSrc = read("../src/content/copy/en.ts");

const grab = (src, key) => {
  const m = src.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  assert.ok(m, `${key} not found`);
  return m[1];
};

const ogSrc = read("../scripts/og.html");

/**
 * The share card is a rendered PNG, so its words cannot be checked by the
 * export verifier the way page text can. This is the only thing standing
 * between a headline edit and three share cards quoting copy the site no
 * longer uses.
 */
test("each locale's share card quotes that locale's real headline", () => {
  for (const [loc, src] of [
    ["fi", fiSrc],
    ["sv", svSrc],
    ["en", enSrc],
  ]) {
    const expected = `${grab(src, "headline")} ${grab(src, "headlineAccent")}`;
    const m = ogSrc.match(new RegExp(`${loc}:\\s*"([^"]+)"`));
    assert.ok(m, `og.html has no ${loc} line`);
    assert.equal(
      m[1],
      expected,
      `og.html ${loc} line has drifted from copy/${loc}.ts`,
    );
  }
});

test("business facts are the real ones", () => {
  assert.equal(grab(siteSrc, "name"), "Stellar Stack");
  assert.equal(grab(siteSrc, "url"), "https://stellarstack.fi");
  assert.equal(grab(siteSrc, "email"), "moi@stellarstack.fi");
  assert.equal(grab(siteSrc, "phoneE164"), "+358417230960");
  assert.equal(grab(siteSrc, "street"), "Hämeenkatu 09");
  assert.equal(grab(siteSrc, "postalCode"), "20500");
  assert.equal(grab(siteSrc, "city"), "Turku");
});

test("the campaign price is 699 and the care plan is 39", () => {
  assert.match(siteSrc, /setup:\s*699\b/);
  assert.match(siteSrc, /monthly:\s*39\b/);
  // The discounted price must actually be a discount, or the page lies.
  const setup = Number(siteSrc.match(/setup:\s*(\d+)/)[1]);
  const regular = Number(siteSrc.match(/setupRegular:\s*(\d+)/)[1]);
  assert.ok(regular > setup, "setupRegular must exceed setup");
});

test("every service and industry id has copy in all three locales", () => {
  const ids = (block) =>
    [
      ...siteSrc.matchAll(
        new RegExp(`${block}[\\s\\S]*?\\[([\\s\\S]*?)\\]`, "g"),
      ),
    ][0][1]
      .split(",")
      .map((s) => s.trim().replace(/^"|"$/g, ""))
      .filter(Boolean);

  const services = ids("export const serviceIds");
  const industries = ids("export const industryIds");

  assert.equal(services.length, 8, "expected 8 services");
  assert.equal(industries.length, 8, "expected 8 industries");

  for (const [name, src] of [
    ["fi", fiSrc],
    ["sv", svSrc],
    ["en", enSrc],
  ]) {
    for (const id of [...services, ...industries]) {
      assert.ok(
        new RegExp(`\\b${id}:\\s*\\{`).test(src),
        `${name} copy is missing an entry for "${id}"`,
      );
    }
    for (const id of ["tikanmaan-huoltoasema", "futuuri", "techverxe"]) {
      // Keys that are valid identifiers are written unquoted by the
      // formatter, so match both forms rather than assuming quotes.
      assert.ok(
        src.includes(`"${id}":`) || new RegExp(`\\b${id}:\\s*\\{`).test(src),
        `${name} copy is missing project "${id}"`,
      );
    }
  }
});

test("no locale ships another locale's prose", () => {
  // Distinctive function words, each verified to occur zero times in the other
  // two files. Note that "ja" is NOT usable here despite being the obvious
  // Finnish marker: it is also Swedish for "yes" and appears legitimately in
  // the Swedish FAQ answers.
  const swedishOnly = [/\boch\b/i, /\bför\b/i, /\binte\b/i, /\batt\b/i];
  const finnishOnly = [/\bettä\b/i, /\bjoka\b/i, /\btai\b/i, /\bmutta\b/i];

  // Strip identifiers and URLs so only prose is examined.
  const prose = (src) =>
    src.replace(/https?:\/\/\S+/g, " ").replace(/^\s*[a-zA-Z]+:\s/gm, " ");

  const sv = prose(svSrc);
  const en = prose(enSrc);

  for (const re of finnishOnly) {
    assert.ok(!re.test(sv), `Swedish copy contains Finnish word ${re}`);
    assert.ok(!re.test(en), `English copy contains Finnish word ${re}`);
  }
  for (const re of swedishOnly) {
    assert.ok(!re.test(en), `English copy contains Swedish word ${re}`);
  }
});

test("the Techverxe case is not marked linkable while its host is down", () => {
  // Guards the honesty of the portfolio: techverxe.com returned no response on
  // 2026-08-18. Flipping this back on is a deliberate act that should also
  // update the note in site.ts.
  const block = siteSrc.match(/id:\s*"techverxe"[\s\S]*?\}/)[0];
  assert.match(
    block,
    /linkable:\s*false/,
    "techverxe is marked linkable; confirm the host actually serves before enabling it",
  );
});

test("no placeholder sentinels remain in content", () => {
  for (const [name, src] of [
    ["site", siteSrc],
    ["fi", fiSrc],
    ["sv", svSrc],
    ["en", enSrc],
  ]) {
    assert.ok(
      !/PLACEHOLDER_/.test(src),
      `${name} still contains a placeholder`,
    );
    assert.ok(!/\bTODO\b/.test(src), `${name} still contains a TODO`);
  }
});

test("prose uses plain hyphens, never dashes", () => {
  // House rule, and it is invisible in review, so it gets a test.
  for (const [name, src] of [
    ["fi", fiSrc],
    ["sv", svSrc],
    ["en", enSrc],
    ["site", siteSrc],
  ]) {
    assert.ok(!/[–—]/.test(src), `${name} contains an en or em dash`);
  }
});
