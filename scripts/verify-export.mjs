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
    if (/\.(svg|png|jpe?g|webp|woff2?|ico|mp4)$/.test(url)) refs.add(url);
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

    // 8. The dead Techverxe link must not be emitted as a live anchor.
    if (key === "work" && slug === "techverxe") {
      if (/href="https:\/\/techverxe\.com"/.test(html)) {
        fail(
          `/${route}/ links to techverxe.com, which is currently down. ` +
            `Set projects[].linkable = true in src/content/site.ts only once it serves again.`,
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
