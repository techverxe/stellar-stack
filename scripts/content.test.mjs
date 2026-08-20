import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

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

test("the Techverxe case's linkable flag matches a directly-verified state, not a guess", () => {
  // This guarded false while techverxe.com returned no response (2026-08-18,
  // AM). Flipped to true the same day after re-checking directly: HTTP 200,
  // real page content, the same IP now actually serving. The guard's job is
  // the same either way -- whichever value ships here should be the one most
  // recently confirmed by an actual request, not carried over by habit. If
  // this next flips, update the comment in site.ts alongside it.
  const block = siteSrc.match(/id:\s*"techverxe"[\s\S]*?\}/)[0];
  assert.match(
    block,
    /linkable:\s*true/,
    "techverxe is marked NOT linkable; confirm the host is actually still down before reverting this",
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

test("every project ships a real screenshot, never the initial-letter fallback", () => {
  // cards.tsx falls back to a glow plus the client's first letter when
  // `image` is null. That fallback is fine for a project with nothing to show
  // yet; it is NOT fine for a live client site, and it shipped for Techverxe
  // until Talha spotted the bare "T" on the homepage. The fallback stays in
  // the component; this test stops it being reached silently.
  const blocks = siteSrc.match(/\{\s*id:\s*"[a-z-]+",[\s\S]*?\n  \}/g) ?? [];
  const projectBlocks = blocks.filter((b) => /liveUrl:/.test(b));
  assert.ok(
    projectBlocks.length >= 3,
    `expected at least 3 project blocks, parsed ${projectBlocks.length}`,
  );
  for (const b of projectBlocks) {
    const id = b.match(/id:\s*"([a-z-]+)"/)[1];
    const image = b.match(/image:\s*("([^"]+)"|null)/);
    assert.ok(image, `project "${id}" has no image field`);
    assert.notEqual(
      image[1],
      "null",
      `project "${id}" has image: null, so its card renders the letter fallback`,
    );
    assert.match(
      image[2],
      /^\/img\/work\/[a-z0-9-]+\.jpe?g$/,
      `project "${id}" image path looks wrong: ${image[2]}`,
    );
  }
});

test("every photograph that requires attribution carries a complete credit", () => {
  // Attribution is a licence OBLIGATION, not a courtesy: a partial credit (a
  // name with no licence, or a licence with no source) does not satisfy it,
  // and a credit for an image the site no longer uses is worse than none.
  //
  // An EMPTY list is a legitimate state and passes: every photograph is
  // currently Unsplash Licence, which requires no attribution. The three CC
  // BY-SA panel photographs were replaced in TVX-036 and their credits went
  // with them. This test asserts the invariant, not a count, so it keeps
  // working in both directions.
  const block = siteSrc.match(
    /export const photoCredits[\s\S]*?\n\](?: as const)?;/,
  );
  assert.ok(block, "photoCredits is missing from site.ts entirely");
  const entries = block[0].match(/\{[\s\S]*?\}/g) ?? [];
  for (const e of entries) {
    const file = e.match(/file:\s*"([^"]+)"/);
    if (!file) continue; // the inline type literal, not an entry
    for (const key of ["title", "author", "licence", "licenceUrl", "source"]) {
      const m = e.match(new RegExp(`${key}:\\s*\\n?\\s*"([^"]+)"`));
      assert.ok(m, `credit for ${file[1]} is missing ${key}`);
      assert.ok(
        m[1].trim().length > 2,
        `credit for ${file[1]} has an empty ${key}`,
      );
    }
    assert.match(
      e.match(/licenceUrl:\s*\n?\s*"([^"]+)"/)[1],
      /^https:\/\//,
      `credit for ${file[1]} does not link to the licence itself`,
    );
    assert.match(
      e.match(/source:\s*\n?\s*"([^"]+)"/)[1],
      /^https:\/\//,
      `credit for ${file[1]} has no source URL`,
    );
    assert.ok(
      siteSrc.includes(`src: "${file[1]}"`) ||
        siteSrc.includes(`image: "${file[1]}"`),
      `credited file ${file[1]} is not referenced anywhere in site.ts`,
    );
  }
});

test("every panel image referenced actually exists on disk", () => {
  // The panel filenames changed with the copy rewrite (speed/languages/local
  // became price/timeline/visibility). A stale reference here renders a
  // broken image on the homepage, which is the most-viewed page on the site.
  const arr = siteSrc.match(/export const panelImages[\s\S]*?\n\];/);
  assert.ok(arr, "panelImages is missing from site.ts");
  const srcs = [...arr[0].matchAll(/src:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.equal(srcs.length, 4, `expected 4 panel images, found ${srcs.length}`);
  for (const src of srcs) {
    const onDisk = new URL(`../public${src}`, import.meta.url);
    assert.ok(
      existsSync(onDisk),
      `panelImages references ${src}, which does not exist in public/`,
    );
  }
});

test("every locale offers the photo credits section", () => {
  for (const [name, src] of [
    ["fi", fiSrc],
    ["sv", svSrc],
    ["en", enSrc],
  ]) {
    assert.match(
      src,
      /creditsHeading:\s*"[^"]{3,}"/,
      `${name} has no creditsHeading`,
    );
    assert.match(
      src,
      /creditsIntro:\s*\n?\s*"[^"]{20,}"/,
      `${name} has no creditsIntro`,
    );
  }
});

test("reading time is computed from the article, never hand-written", () => {
  // Every article used to carry a hand-written readMinutes of 8 or 9. Measured
  // against the real text they run 2 to 3 minutes, so the site overstated the
  // length of its own writing by four to five times, on every article card and
  // article page, in all three languages. A number the visitor can check by
  // reading the page is the worst kind to inflate, and a hand-maintained one
  // drifts the moment anyone edits the body.
  assert.ok(
    /export function readingMinutes\(/.test(siteSrc),
    "site.ts no longer exports readingMinutes",
  );
  assert.ok(
    !/readMinutes/.test(siteSrc),
    "a hand-written readMinutes is back in site.ts",
  );
  const page = read("../src/app/[locale]/[section]/[slug]/page.tsx");
  const card = read("../src/components/cards.tsx");
  for (const [name, src] of [["article page", page], ["article card", card]]) {
    assert.ok(
      /readingMinutes\(a\.body\)/.test(src),
      `${name} does not compute the reading time from the rendered body`,
    );
    assert.ok(
      !/meta\.readMinutes/.test(src),
      `${name} still reads a hand-written readMinutes`,
    );
  }
});

test("no locale claims an office at the company address", () => {
  // There is no office: the team is based in Turku and the visible contact
  // label was deliberately corrected to Location / Sijainti / Plats. The
  // correction missed the contact meta description in ALL THREE locales,
  // where the claim is invisible on the page and shows up in search results
  // instead. Scoped to strings that carry the address, so legitimate uses
  // ("the customer hands over keys to their home or office", "digitoimisto",
  // "tietosuojavaltuutetun toimistolle") do not trip it.
  const OFFICE = /\b(office at|toimisto|kontor på|kontor vid)\b/i;
  for (const [name, src] of [
    ["fi", fiSrc],
    ["sv", svSrc],
    ["en", enSrc],
  ]) {
    for (const line of src.split("\n")) {
      if (!/site\.address\.street/.test(line)) continue;
      assert.ok(
        !OFFICE.test(line),
        `${name} claims an office at the company address: ${line.trim().slice(0, 100)}`,
      );
    }
  }
});

test("a linkable project is never described as offline in any locale", () => {
  // TVX-030 flipped Techverxe's `linkable` to true after verifying the host
  // was back up, and updated two guards with it, but the case-study PROSE in
  // all three locales still said the site was under maintenance and that "the
  // link does not open". The card rendered a live link next to text saying the
  // link did not work. One fact, several homes, and only some of them updated.
  const block = siteSrc.match(/id:\s*"techverxe"[\s\S]*?\n  \}/)[0];
  const linkable = /linkable:\s*true/.test(block);
  const OFFLINE =
    /(under maintenance|does not open|huollossa|ei toistaiseksi avaudu|under underhåll|öppnas tills vidare inte)/i;
  for (const [name, src] of [
    ["fi", fiSrc],
    ["sv", svSrc],
    ["en", enSrc],
  ]) {
    const project = src.match(/techverxe:\s*\{[\s\S]*?\n    \},/);
    if (!project) continue;
    const saysOffline = OFFLINE.test(project[0]);
    if (linkable) {
      assert.ok(
        !saysOffline,
        `${name} describes Techverxe as offline while projects[].linkable is true`,
      );
    } else {
      assert.ok(
        saysOffline,
        `${name} does not mention the outage while projects[].linkable is false`,
      );
    }
  }
});

test("the build id is pinned to the commit, not randomised", () => {
  // Next generates a random build id per build and embeds it in every page's
  // RSC payload, which makes the output non-reproducible: the same commit
  // built twice differs on every route. That was only found by trying, when a
  // clean clone of the DEPLOYED commit differed from the live site on all 99
  // routes in exactly one field while every visible byte matched.
  //
  // Pinned to the commit, a rebuild is byte-identical to what is deployed, so
  // "the live site is this commit" becomes checkable. It is also the closest
  // thing a static export has to a served-version endpoint.
  const cfg = read("../next.config.mjs");
  assert.match(
    cfg,
    /generateBuildId/,
    "next.config.mjs no longer pins the build id, so builds are not reproducible",
  );
  assert.match(
    cfg,
    /git rev-parse --short=12 HEAD/,
    "the build id is no longer derived from the commit",
  );
});
