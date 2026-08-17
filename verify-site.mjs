/**
 * Verifies the BUILT static export, served the way nginx will serve it.
 *
 * Not "does it compile". A green build proves the components mounted; it says
 * nothing about whether fonts loaded, whether the scroll sequence advances,
 * whether every internal link resolves, or whether the structured data parses.
 * v1 shipped with green everything and unloaded fonts.
 *
 * Run:  node verify-site.mjs      (expects `npm run build` to have run)
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const OUT = new URL("./out/", import.meta.url).pathname;
const PORT = 8951;
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

// mirrors nginx `try_files $uri $uri/index.html =404`
const server = createServer((req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0]);
  let p = join(OUT, url);
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p) && existsSync(p + ".html")) p += ".html";
  if (!existsSync(p)) {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(
      existsSync(join(OUT, "404.html"))
        ? readFileSync(join(OUT, "404.html"))
        : "404",
    );
    return;
  }
  res.writeHead(200, {
    "content-type": MIME[extname(p)] || "application/octet-stream",
  });
  res.end(readFileSync(p));
});

const fails = [];
let total = 0;
const check = (name, ok, detail = "") => {
  total++;
  if (!ok) fails.push(`${name}: ${detail}`);
  console.log(
    (ok ? "PASS  " : "FAIL  ") + name + (detail ? `  ${detail}` : ""),
  );
};

await new Promise((r) => server.listen(PORT, r));
const base = `http://127.0.0.1:${PORT}`;
const browser = await chromium.launch();

try {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(`${base}/fi/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  check(
    "no console or page errors on the home page",
    errors.length === 0,
    errors.slice(0, 3).join("; "),
  );

  // --- fonts: the exact defect that got v1 rejected ---
  const fonts = await page.evaluate(() => ({
    display: document.fonts.check("400 100px Anton"),
    body: document.fonts.check("400 16px Archivo"),
    mono: document.fonts.check("400 11px 'Geist Mono'"),
    h1: getComputedStyle(document.querySelector("h1")).fontFamily,
  }));
  check("display face actually loaded", fonts.display, fonts.h1);
  check("body face actually loaded", fonts.body);
  check("mono face actually loaded", fonts.mono);
  check(
    "h1 is not falling back to system-ui",
    !/system-ui/.test(fonts.h1.split(",")[0]),
    fonts.h1,
  );

  const dia = await page.evaluate(() => {
    const c = document.createElement("canvas").getContext("2d");
    c.font = "400 100px Anton";
    return {
      a: c.measureText("KASINPESU").width,
      b: c.measureText("KÄSINPESU").width,
    };
  });
  check(
    "Finnish diacritics render from the real face",
    Math.abs(dia.a - dia.b) < 1,
    `${dia.a.toFixed(1)} vs ${dia.b.toFixed(1)}`,
  );

  // --- the wash sequence must actually advance ---
  const seq = await page.evaluate(() => {
    const s = document.getElementById("nain");
    return { top: s.offsetTop, h: s.offsetHeight };
  });
  const stages = [];
  for (const f of [0.06, 0.28, 0.5, 0.72]) {
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      seq.top + seq.h * f,
    );
    await page.waitForTimeout(950);
    stages.push(await page.textContent(".seq-stage-t"));
  }
  check(
    "wash sequence advances through 4 distinct stages",
    new Set(stages).size === 4,
    stages.join(" | "),
  );

  const rail = await page.evaluate(
    () =>
      new DOMMatrix(
        getComputedStyle(document.querySelector(".seq-rail-fill")).transform,
      ).a,
  );
  check("progress rail tracks scroll", rail > 0.9, rail.toFixed(2));

  // --- calculator arithmetic against the real price matrix ---
  await page.goto(`${base}/fi/hinnasto/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const grid = await page.evaluate(() => {
    const rows = [...document.querySelectorAll(".tbl tbody tr")];
    const cells = rows.flatMap((r) => [...r.querySelectorAll("td")].slice(1));
    const txt = cells.map((c) => c.textContent.trim());
    return {
      rows: rows.length,
      cells: cells.length,
      ask: txt.filter((t) => t === "Kysy hintaa").length,
      na: txt.filter((t) => t === "Ei tarjolla").length,
      num: txt.filter((t) => /\d/.test(t)).length,
    };
  });
  check("13 service rows", grid.rows === 13, grid.rows);
  check("39 price cells", grid.cells === 39, grid.cells);
  check(
    "split is 27 numeric / 3 not offered / 9 on request",
    grid.num === 27 && grid.na === 3 && grid.ask === 9,
    `${grid.num}/${grid.na}/${grid.ask}`,
  );

  await page.click("#laskuri .toggle button:nth-child(2)");
  await page.waitForTimeout(700);
  check(
    "calculator maasturi total = 105",
    (await page.textContent("#laskuri .total")).includes("105"),
    await page.textContent("#laskuri .total"),
  );
  await page.click("#laskuri .toggle button:nth-child(1)");
  await page.waitForTimeout(700);
  check(
    "calculator henkilöauto total = 80",
    (await page.textContent("#laskuri .total")).includes("80"),
    await page.textContent("#laskuri .total"),
  );

  const sms = await page.getAttribute("#laskuri a.cta", "href");
  check(
    "booking link is sms: with the ?&body= prefill form",
    sms.startsWith("sms:+358405417999?&body="),
    sms.slice(0, 40),
  );
  // Every sms: link must target the SAME number as tel: and must carry a
  // prefilled body. The booking flow IS the conversion path on this site: a
  // bare sms: link that opens an empty message to no one is a silent failure
  // that looks fine in a screenshot.
  const linkAudit = await page.evaluate(async () => {
    const pages = [
      "/fi/",
      "/sv/",
      "/en/",
      "/fi/hinnasto/",
      "/fi/rengashotelli/",
    ];
    const res = { tel: new Set(), sms: new Set(), noBody: 0, count: 0 };
    for (const u of pages) {
      const html = await (await fetch(u)).text();
      for (const m of html.matchAll(/href="(tel:[^"]+)"/g))
        res.tel.add(m[1].slice(4));
      for (const m of html.matchAll(/href="(sms:[^"]+)"/g)) {
        res.count++;
        res.sms.add(m[1].slice(4).split("?")[0]);
        // raw HTML encodes & as &amp;, so match both forms or every link
        // looks bodyless. This check reported 8/8 missing before the fix.
        if (!/[?&](amp;)?body=.+/.test(m[1])) res.noBody++;
      }
    }
    return {
      tel: [...res.tel],
      sms: [...res.sms],
      noBody: res.noBody,
      count: res.count,
    };
  });
  check(
    "sms: uses the same number as tel:",
    linkAudit.tel.length === 1 &&
      linkAudit.sms.length === 1 &&
      linkAudit.tel[0] === linkAudit.sms[0],
    `tel ${linkAudit.tel.join()} vs sms ${linkAudit.sms.join()}`,
  );
  check(
    "every sms: link prefills a message body",
    linkAudit.count > 0 && linkAudit.noBody === 0,
    `${linkAudit.count} links, ${linkAudit.noBody} without a body`,
  );

  check(
    "booking link carries the selected services",
    /k%C3%A4sinpesu|kasinpesu/i.test(sms),
  );

  // --- every internal link resolves to a real generated page ---
  const seen = new Set();
  const queue = ["/fi/", "/sv/", "/en/"];
  const broken = [];
  while (queue.length) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    const resp = await page.goto(base + url, { waitUntil: "domcontentloaded" });
    if (!resp || resp.status() >= 400) {
      broken.push(`${url} -> ${resp ? resp.status() : "no response"}`);
      continue;
    }
    const links = await page.evaluate(() =>
      [...document.querySelectorAll("a[href^='/']")].map((a) =>
        a.getAttribute("href"),
      ),
    );
    for (const l of links) if (!seen.has(l)) queue.push(l);
  }
  check(
    "every internal link resolves",
    broken.length === 0,
    broken.slice(0, 5).join(", "),
  );
  // 63 = the prior 60 plus /varaa/ in fi/sv/en. /varaa/peru/ (3 more) is
  // deliberately unlisted: it is the cancellation page, reachable only via
  // the token link sent on booking, never linked from nav or any page.
  check(
    "crawl reached the whole site (63 pages)",
    seen.size === 63,
    `${seen.size} pages`,
  );

  // policy pages must exist in all three languages and be reachable
  for (const loc of ["fi", "sv", "en"]) {
    for (const slug of ["tietosuoja", "saavutettavuus"]) {
      const r = await page.goto(`${base}/${loc}/${slug}/`, {
        waitUntil: "domcontentloaded",
      });
      // characters, not words: Finnish compounds heavily, so a word count
      // under-reports the same substance and fails a threshold English passes.
      const chars = await page.evaluate(
        () => document.querySelector(".legal").innerText.trim().length,
      );
      check(
        `policy page /${loc}/${slug}/ serves real content`,
        r.status() === 200 && chars > 900,
        `${r.status()}, ${chars} chars`,
      );
    }
  }
  await page.goto(`${base}/fi/`, { waitUntil: "networkidle" });
  check(
    "footer links to both policy pages",
    await page.evaluate(
      () =>
        Boolean(document.querySelector('a[href="/fi/tietosuoja/"]')) &&
        Boolean(document.querySelector('a[href="/fi/saavutettavuus/"]')),
    ),
  );

  // --- structured data must parse and say the right things ---
  await page.goto(`${base}/fi/`, { waitUntil: "networkidle" });
  const ld = await page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')].map(
      (s) => s.textContent,
    ),
  );
  let parsed = [];
  try {
    parsed = ld.map((x) => JSON.parse(x));
    check("all JSON-LD blocks parse", true);
  } catch (e) {
    check("all JSON-LD blocks parse", false, String(e.message));
  }
  const biz = parsed.find((p) => p["@type"] === "AutoWash");
  check("LocalBusiness JSON-LD present as AutoWash", Boolean(biz));
  check(
    "JSON-LD telephone is E.164",
    biz?.telephone === "+358405417999",
    biz?.telephone,
  );
  check(
    "JSON-LD has 6 opening-hours entries, Sunday excluded",
    biz?.openingHoursSpecification?.length === 6,
    biz?.openingHoursSpecification?.length,
  );
  check(
    "no aggregateRating anywhere (we have one real review)",
    !JSON.stringify(parsed).includes("aggregateRating"),
  );
  check(
    "offer catalog lists all 13 services",
    biz?.hasOfferCatalog?.itemListElement?.length === 13,
    biz?.hasOfferCatalog?.itemListElement?.length,
  );

  await page.goto(`${base}/fi/palvelut/kiillotus/`, {
    waitUntil: "networkidle",
  });
  const svcLd = await page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => JSON.parse(s.textContent))
      .find((x) => x["@type"] === "Service"),
  );
  check(
    "on-request service omits `offers` entirely",
    svcLd && !("offers" in svcLd),
  );
  await page.goto(`${base}/fi/palvelut/auton-kasinpesu/`, {
    waitUntil: "networkidle",
  });
  const priced = await page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => JSON.parse(s.textContent))
      .find((x) => x["@type"] === "Service"),
  );
  check(
    "priced service publishes a correct AggregateOffer",
    priced?.offers?.lowPrice === 20 && priced?.offers?.highPrice === 35,
    JSON.stringify(priced?.offers ?? {}),
  );
  check(
    "serviceType is not hardcoded to Car Wash for every service",
    svcLd?.serviceType === "Auto Detailing",
    svcLd?.serviceType,
  );

  // --- language switching keeps you on the same page ---
  await page.goto(`${base}/fi/hinnasto/`, { waitUntil: "networkidle" });
  await page.click('.langs a[hreflang="sv"]');
  // Client-side routing updates history without firing a load event, so
  // waitForLoadState returns while the router is still swapping. Wait on the
  // URL itself. The earlier failure here was the harness, not the site.
  await page.waitForURL("**/sv/hinnasto/", { timeout: 10000 });
  check(
    "language switch stays on the same page",
    page.url().endsWith("/sv/hinnasto/"),
    page.url(),
  );
  check(
    "html lang follows the locale",
    (await page.getAttribute("html", "lang")) === "sv-FI",
    await page.getAttribute("html", "lang"),
  );

  // --- images ---
  await page.goto(`${base}/fi/`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  const imgs = await page.evaluate(async () => {
    const all = [...document.querySelectorAll("img")];
    const r = await Promise.all(
      all.map(
        (i) =>
          new Promise((res) => {
            const t = new Image();
            t.onload = () => res(true);
            t.onerror = () => res(false);
            t.src = i.src;
          }),
      ),
    );
    return {
      total: all.length,
      broken: r.filter((x) => !x).length,
      noAlt: all.filter((i) => i.getAttribute("alt") === null).length,
    };
  });
  check("every image decodes", imgs.broken === 0, JSON.stringify(imgs));
  check("every image has an alt attribute", imgs.noAlt === 0, imgs.noAlt);

  check(
    "no horizontal scroll at 1440",
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  );
  await ctx.close();

  // --- mobile ---
  const m = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mp = await m.newPage();
  await mp.goto(`${base}/fi/hinnasto/`, { waitUntil: "networkidle" });
  await mp.waitForTimeout(500);
  check(
    "mobile: no horizontal scroll at 390",
    await mp.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
    await mp.evaluate(() => document.documentElement.scrollWidth),
  );
  check(
    "mobile: price table becomes cards, all 13 present",
    await mp.evaluate(
      () =>
        getComputedStyle(document.querySelector(".tbl")).display === "none" &&
        document.querySelectorAll(".cards .card").length === 13,
    ),
  );
  await mp.goto(`${base}/fi/`, { waitUntil: "networkidle" });
  check(
    "mobile: header CTA keeps a visible label",
    await mp.evaluate(() => {
      const c = document.querySelector(".hdr .cta");
      return (
        [...c.querySelectorAll("span")].filter(
          (s) => getComputedStyle(s).display !== "none" && s.textContent.trim(),
        ).length > 0
      );
    }),
  );
  await m.close();

  // --- reduced motion ships the end state, never an empty section ---
  const r = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const rp = await r.newPage();
  await rp.goto(`${base}/fi/`, { waitUntil: "networkidle" });
  await rp.waitForTimeout(600);
  const rm = await rp.evaluate(() => ({
    sticky: getComputedStyle(document.querySelector(".seq-sticky")).display,
    stat: getComputedStyle(document.querySelector(".seq-static")).display,
    cells: document.querySelectorAll(".seq-static .cell").length,
    hidden: [...document.querySelectorAll(".rvl")].filter(
      (e) => getComputedStyle(e).opacity !== "1",
    ).length,
  }));
  check(
    "reduced motion: scrubbed sequence replaced by all 4 stages",
    rm.sticky === "none" && rm.stat !== "none" && rm.cells === 4,
    JSON.stringify(rm),
  );
  check(
    "reduced motion: nothing is left invisible",
    rm.hidden === 0,
    rm.hidden,
  );
  await r.close();

  // --- performance: LCP and CLS under throttling, not a one-off manual
  // measurement quoted from memory. "Good" Core Web Vitals thresholds
  // (LCP < 2500ms, CLS < 0.1); this box is far from a real network, so a
  // pass here is a floor, not proof of real-world speed, but a regression
  // (the booking JS, the Maps iframe) would still show up as a real number
  // moving, not as a stale claim nobody re-checked. ---
  for (const [label, url] of [
    ["home", "/fi/"],
    ["contact (has the Maps iframe)", "/fi/yhteystiedot/"],
  ]) {
    const pctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const pg = await pctx.newPage();
    const cdp = await pctx.newCDPSession(pg);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
      latency: 150,
    });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await pg.addInitScript(() => {
      window.__lcp = 0;
      window.__cls = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        window.__lcp = entries[entries.length - 1].startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await pg.goto(`${base}${url}`, { waitUntil: "load" });
    await pg.waitForTimeout(1000);
    const vitals = await pg.evaluate(() => ({
      lcp: window.__lcp,
      cls: window.__cls,
    }));
    check(
      `${label}: LCP under 2500ms cold on throttled 3G/4x CPU`,
      vitals.lcp > 0 && vitals.lcp < 2500,
      `${Math.round(vitals.lcp)}ms`,
    );
    check(`${label}: CLS under 0.1`, vitals.cls < 0.1, vitals.cls.toFixed(4));
    await pctx.close();
  }
} finally {
  await browser.close();
  server.close();
}

console.log("\n" + "=".repeat(60));
console.log(`${total - fails.length}/${total} checks passed`);
fails.forEach((f) => console.log("  - " + f));
process.exit(fails.length ? 1 : 0);
