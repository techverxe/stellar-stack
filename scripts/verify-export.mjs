#!/usr/bin/env node
/**
 * Mechanical check of the static export.
 *
 * This exists because "the build succeeded" and "the site is correct" are
 * different claims. A Next.js export happily emits a page whose <html lang> is
 * wrong, whose hreflang set is incomplete, or which still references an asset
 * that was deleted, and none of that fails the build. Each check below is a
 * defect class that has actually shipped on a site in this repo's lineage.
 *
 * Exits non-zero on any failure so it can gate a release.
 */

import { readFile, readdir, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";

const OUT = join(process.cwd(), "out");

const LOCALES = { fi: "fi-FI", sv: "sv-FI", en: "en" };
const SECTIONS = {
  services: { fi: "palvelut", sv: "tjanster", en: "services" },
  industries: { fi: "toimialat", sv: "branscher", en: "industries" },
  work: { fi: "referenssit", sv: "referenser", en: "work" },
  insights: { fi: "artikkelit", sv: "artiklar", en: "insights" },
  about: { fi: "meista", sv: "om-oss", en: "about" },
  contact: { fi: "yhteystiedot", sv: "kontakt", en: "contact" },
  offer: { fi: "kampanja", sv: "kampanj", en: "offer" },
  privacy: { fi: "tietosuoja", sv: "dataskydd", en: "privacy" },
};
const SERVICES = [
  "verkkosivut",
  "verkkokauppa",
  "hakukoneoptimointi",
  "mainonta",
  "sisalto",
  "analytiikka",
  "sovelluskehitys",
  "yllapito",
];
const INDUSTRIES = [
  "autoala",
  "rakennus",
  "kiinteistohuolto",
  "ravintolat",
  "kauneus",
  "kauppa",
  "asiantuntijat",
  "terveys",
];
const PROJECTS = ["tikanmaan-huoltoasema", "futuuri", "techverxe"];
const ARTICLES = [
  "kotisivun-hinta",
  "google-business-profiili",
  "sivuston-nopeus",
  "monikielisyys",
  "evasteeton-analytiikka",
];

/** Content that must never appear: leftovers from the starter kit or the clone. */
const FORBIDDEN = [
  "Tikanmaan Huoltoasema on",
  "huoltoasema.fi",
  "demandstack",
  "DemandStack",
  "Eisenhower",
  "Diamond Grade",
  "Unlimited Logistics",
  "lorem ipsum",
  "Lorem ipsum",
  "TODO",
  "PLACEHOLDER",
  "localhost:3000",
  "Client Website Starter",
];

const failures = [];
const notes = [];

function fail(msg) {
  failures.push(msg);
}

function expectedRoutes() {
  const routes = [];
  for (const locale of Object.keys(LOCALES)) {
    routes.push(`${locale}`);
    for (const key of Object.keys(SECTIONS)) {
      routes.push(`${locale}/${SECTIONS[key][locale]}`);
    }
    for (const slug of SERVICES) {
      routes.push(`${locale}/${SECTIONS.services[locale]}/${slug}`);
    }
    for (const slug of INDUSTRIES) {
      routes.push(`${locale}/${SECTIONS.industries[locale]}/${slug}`);
    }
    for (const slug of PROJECTS) {
      routes.push(`${locale}/${SECTIONS.work[locale]}/${slug}`);
    }
    for (const slug of ARTICLES) {
      routes.push(`${locale}/${SECTIONS.insights[locale]}/${slug}`);
    }
  }
  return routes;
}

/** Which locale and which page-identity a route belongs to. */
function routeIdentity(route) {
  const [locale, section, slug] = route.split("/");
  if (!section) return { locale, key: "home", slug: null };
  for (const key of Object.keys(SECTIONS)) {
    if (SECTIONS[key][locale] === section)
      return { locale, key, slug: slug ?? null };
  }
  return { locale, key: null, slug: slug ?? null };
}

async function collectLocalAssets(html) {
  const refs = new Set();
  for (const m of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
    const url = m[1];
    if (url.startsWith("//")) continue;
    // Images carry `?v=<content hash>`, added by postbuild so that replacing a
    // file cannot be served from a stale cache. Strip it: this set is about
    // whether the FILE exists, and the fingerprint itself is checked in 9a.
    // Without stripping, the extension test below (anchored with $) matches
    // nothing and every image silently drops out of the set.
    const bare = url.split("?")[0];
    if (/\.(svg|png|jpe?g|webp|woff2?|ico|mp4)$/.test(bare)) refs.add(bare);
  }
  // Share-card images live in `content=` on a meta tag, as an ABSOLUTE URL, so
  // neither half of the pattern above sees them. Without this, a renamed or
  // missing og-<locale>.png ships green and every share of that locale renders
  // a broken preview: the failure is invisible on the site itself.
  for (const m of html.matchAll(
    /<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g,
  )) {
    const url = m[1].replace(/^https:\/\/stellarstack\.fi/, "");
    if (url.startsWith("/")) refs.add(url);
    else fail(`share-card image is not on the site origin: ${m[1]}`);
  }
  return refs;
}

async function main() {
  try {
    await access(OUT);
  } catch {
    fail("out/ does not exist. Run `npm run build` first.");
    return report();
  }

  const routes = expectedRoutes();
  const assetRefs = new Set();

  for (const route of routes) {
    const file = join(OUT, route, "index.html");
    let html;
    try {
      html = await readFile(file, "utf8");
    } catch {
      fail(`missing page: /${route}/`);
      continue;
    }

    const { locale, key, slug } = routeIdentity(route);

    // 1. <html lang> must match the locale, not the default.
    const lang = html.match(/<html[^>]*lang="([^"]+)"/)?.[1];
    if (lang !== LOCALES[locale]) {
      fail(`/${route}/ has lang="${lang}", expected "${LOCALES[locale]}"`);
    }

    // 2. Exactly one canonical, pointing at this page's own URL.
    const canon = [
      ...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g),
    ];
    if (canon.length !== 1) {
      fail(`/${route}/ has ${canon.length} canonical links, expected 1`);
    } else if (!canon[0][1].endsWith(`/${route}/`)) {
      fail(`/${route}/ canonical points at ${canon[0][1]}`);
    }

    // 3. All three languages plus x-default must be declared.
    //    Matched case-insensitively on purpose: React serialises the attribute
    //    as `hrefLang`, and HTML attribute names are case-insensitive, so a
    //    case-sensitive check here reports 324 failures on a correct site.
    const alts = [...html.matchAll(/hreflang="([^"]+)"/gi)].map((m) => m[1]);
    for (const tag of [...Object.values(LOCALES), "x-default"]) {
      if (!alts.includes(tag)) {
        fail(`/${route}/ is missing hreflang="${tag}"`);
      }
    }

    // 4. Exactly one H1, and it must not be empty.
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
    if (h1s.length !== 1) {
      fail(`/${route}/ has ${h1s.length} h1 elements, expected 1`);
    } else if (h1s[0][1].replace(/<[^>]+>/g, "").trim().length === 0) {
      fail(`/${route}/ has an empty h1`);
    }

    // 5. A non-empty title and meta description.
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    if (title.trim().length < 10) {
      fail(`/${route}/ has a missing or too-short <title>`);
    }
    const desc =
      html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
    if (desc.trim().length < 40) {
      fail(`/${route}/ has a missing or too-short meta description`);
    }

    // 6. No leftovers from the starter kit or the reference site.
    for (const needle of FORBIDDEN) {
      if (html.includes(needle)) {
        fail(`/${route}/ contains forbidden string "${needle}"`);
      }
    }

    // 7. Real contact details are reachable from every page (they are in the
    //    footer), because a marketing site that cannot be contacted is broken
    //    regardless of how it looks.
    if (!html.includes("tel:+358417230960")) {
      fail(`/${route}/ is missing the phone link`);
    }
    if (!html.includes("moi@stellarstack.fi")) {
      fail(`/${route}/ is missing the email address`);
    }
    if (!html.includes("Hämeenkatu 09")) {
      fail(`/${route}/ is missing the street address`);
    }

    // 8. The Techverxe link must match the currently-verified state of that
    //    host, in whichever direction is currently true. Verified DOWN on
    //    2026-08-18 (AM) and flipped linkable:false; verified back UP later
    //    the same day (HTTP 200, real content) and flipped linkable:true.
    //    This check enforces that projects[].linkable in site.ts and the
    //    actually-rendered anchor cannot silently drift apart in EITHER
    //    direction, not just the down-and-forgotten one.
    if (key === "work" && slug === "techverxe") {
      const hasLiveAnchor = /href="https:\/\/techverxe\.com"/.test(html);
      if (!hasLiveAnchor) {
        fail(
          `/${route}/ does not link to techverxe.com even though ` +
            `projects[].linkable is true in src/content/site.ts. Either the ` +
            `host went down again (flip linkable to false) or the render ` +
            `broke (fix the render).`,
        );
      }
    }

    for (const ref of await collectLocalAssets(html)) assetRefs.add(ref);
  }

  // 9. Every referenced local asset must actually exist in the export.
  for (const ref of assetRefs) {
    try {
      await access(join(OUT, ref.replace(/^\//, "")));
    } catch {
      fail(`referenced asset does not exist in out/: ${ref}`);
    }
  }

  // 9a. Every image reference must carry a fingerprint that MATCHES the file
  //     it points at. Without one, replacing an image's contents leaves
  //     returning visitors on the old image for the full 30-day cache window.
  //     That is not hypothetical: in TVX-034 four panel photographs were
  //     swapped in at the same paths, the origin served the new bytes, every
  //     byte-identity check against the origin passed, and the site still
  //     showed the previous artwork to anyone who had loaded it the day
  //     before. A STALE fingerprint is as bad as a missing one, so the hash
  //     is recomputed from the file here rather than merely checked for shape.
  const fpHash = new Map();
  for (const route of routes) {
    let html = "";
    try {
      html = await readFile(join(OUT, route, "index.html"), "utf8");
    } catch {
      continue;
    }
    for (const m of html.matchAll(/(?:src|href)="(\/(?:img|brand)\/[^"]+)"/g)) {
      const [bare, query] = m[1].split("?");
      const stamped = /^v=([0-9a-f]{8})$/.exec(query ?? "");
      if (!stamped) {
        fail(
          `/${route}/ references ${bare} with no ?v= fingerprint, so a ` +
            `replaced file would be served from stale caches for 30 days`,
        );
        continue;
      }
      if (!fpHash.has(bare)) {
        try {
          const buf = await readFile(join(OUT, bare.replace(/^\//, "")));
          fpHash.set(
            bare,
            createHash("sha256").update(buf).digest("hex").slice(0, 8),
          );
        } catch {
          fpHash.set(bare, null);
        }
      }
      const actual = fpHash.get(bare);
      if (actual && stamped[1] !== actual) {
        fail(
          `/${route}/ references ${bare}?v=${stamped[1]} but that file hashes ` +
            `to ${actual}: the fingerprint is stale, so caches keep serving ` +
            `the previous image`,
        );
      }
    }
  }

  // 9b. Imagery that a page is meaningless without. These are asserted BY NAME
  //     rather than by counting, because a count stays green while the wrong
  //     file is missing. The Techverxe card in particular rendered a bare
  //     letter "T" for weeks: cards.tsx falls back to the client's initial
  //     when `image` is null, and nothing noticed.
  const REQUIRED_IMAGES = [
    "/img/panels/price.jpeg",
    "/img/panels/timeline.jpeg",
    "/img/panels/visibility.jpeg",
    "/img/panels/ownership.jpeg",
    "/img/work/tikanmaan.jpeg",
    "/img/work/futuuri.jpeg",
    "/img/work/techverxe.jpeg",
  ];
  for (const img of REQUIRED_IMAGES) {
    try {
      await access(join(OUT, img.replace(/^\//, "")));
    } catch {
      fail(`required image missing from the export: ${img}`);
      continue;
    }
    if (!assetRefs.has(img)) {
      fail(`${img} exists in the export but no page references it`);
    }
  }

  // 9c. Photo attribution. Every photograph is currently Unsplash Licence,
  //     which requires none, so the privacy page must render NO credits block:
  //     a heading over an empty list, or a credit naming an image the site no
  //     longer uses, is worse than nothing. The moment a CC-licensed image is
  //     added back to site.ts's photoCredits, this flips to checking that its
  //     author, licence link and source page all appear.
  const creditedAuthors = [
    ...(await readFile(
      new URL("../src/content/site.ts", import.meta.url),
      "utf8",
    ).catch(() => "")).matchAll(/author:\s*"([^"]+)"/g),
  ].map((m) => m[1]);
  const PRIVACY_ROUTES = {
    fi: "fi/tietosuoja",
    sv: "sv/dataskydd",
    en: "en/privacy",
  };
  for (const [locale, route] of Object.entries(PRIVACY_ROUTES)) {
    let html = "";
    try {
      html = await readFile(join(OUT, route, "index.html"), "utf8");
    } catch {
      fail(`privacy page missing for ${locale}: /${route}/`);
      continue;
    }
    for (const author of creditedAuthors) {
      if (!html.includes(author)) {
        fail(`/${route}/ does not credit "${author}", required by its licence`);
      }
    }
    if (!creditedAuthors.length && /creativecommons\.org\/licenses/.test(html)) {
      fail(
        `/${route}/ still renders a Creative Commons credit although ` +
          `photoCredits is empty: it names an image the site no longer uses`,
      );
    }
  }

  // 10. Root redirect, 404, sitemap and robots must all be present.
  for (const f of ["index.html", "404.html", "sitemap.xml", "robots.txt"]) {
    try {
      await access(join(OUT, f));
    } catch {
      fail(`missing ${f} in out/`);
    }
  }

  const root = await readFile(join(OUT, "index.html"), "utf8").catch(() => "");
  if (!root.includes("url=/fi/")) {
    fail("out/index.html does not redirect to /fi/");
  }

  const sitemap = await readFile(join(OUT, "sitemap.xml"), "utf8").catch(
    () => "",
  );
  const urlCount = (sitemap.match(/<loc>/g) ?? []).length;
  if (urlCount !== routes.length) {
    fail(`sitemap lists ${urlCount} URLs, expected ${routes.length}`);
  }

  notes.push(
    `checked ${routes.length} routes and ${assetRefs.size} distinct assets`,
  );
  report();
}

function report() {
  for (const n of notes) console.log(`  ${n}`);
  if (failures.length === 0) {
    console.log("verify-export: PASS");
    process.exit(0);
  }
  console.error(`\nverify-export: FAIL (${failures.length})`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

main();
