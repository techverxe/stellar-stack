/**
 * Audits the LIVE site over the public internet.
 *
 * Distinct from verify-site.mjs, which tests the build locally. This one can
 * only pass if DNS, TLS, nginx, redirects, headers and the deployed files are
 * all correct together. Everything here is measured, not asserted.
 *
 * Run:  node audit-live.mjs
 */
import { chromium } from "playwright";
// Node cannot import the TS module directly; kept in sync with src/content/locales.ts
const LOCALES = ["fi", "sv", "en"];

const ORIGIN = "https://tikanmaanhuoltoasema.com";
const fails = [];
const warns = [];
let total = 0;

const check = (name, ok, detail = "") => {
  total++;
  if (!ok) fails.push(`${name}: ${detail}`);
  console.log(
    (ok ? "PASS  " : "FAIL  ") + name + (detail ? `  ${detail}` : ""),
  );
};
const warn = (name, ok, detail = "") => {
  if (!ok) warns.push(`${name}: ${detail}`);
  console.log(
    (ok ? "PASS  " : "WARN  ") + name + (detail ? `  ${detail}` : ""),
  );
};

async function head(url, redirect = "manual") {
  const t0 = performance.now();
  const r = await fetch(url, {
    redirect,
    headers: { "user-agent": "tikanmaan-audit/1" },
  });
  const ms = performance.now() - t0;
  return { status: r.status, headers: r.headers, ms, body: r };
}

console.log(`\n### AUDIT ${new Date().toISOString()}  ${ORIGIN}\n`);

// ---------- 1. redirects and canonical host ----------
const httpR = await head("http://tikanmaanhuoltoasema.com/fi/");
check(
  "http redirects to https",
  httpR.status === 301,
  `${httpR.status} -> ${httpR.headers.get("location")}`,
);
check(
  "http redirect targets https",
  (httpR.headers.get("location") || "").startsWith("https://"),
  httpR.headers.get("location"),
);

const wwwR = await head("https://www.tikanmaanhuoltoasema.com/fi/");
check(
  "www redirects to the apex host",
  wwwR.status === 301,
  `${wwwR.status} -> ${wwwR.headers.get("location")}`,
);

const rootR = await head(`${ORIGIN}/`);
check(
  "bare domain redirects to the Finnish home",
  rootR.status === 302 &&
    (rootR.headers.get("location") || "").endsWith("/fi/"),
  `${rootR.status} -> ${rootR.headers.get("location")}`,
);

// ---------- 2. every sitemap URL is reachable ----------
const smRes = await fetch(`${ORIGIN}/sitemap.xml`);
const sm = await smRes.text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check(
  "sitemap.xml serves and parses",
  smRes.status === 200 && urls.length > 0,
  `${urls.length} urls`,
);
check("sitemap covers all 60 pages", urls.length === 60, urls.length);

const statuses = await Promise.all(
  urls.map(async (u) => ({ u, ...(await head(u, "follow")) })),
);
const bad = statuses.filter((s) => s.status !== 200);
check(
  "every sitemap URL returns 200",
  bad.length === 0,
  bad
    .slice(0, 5)
    .map((b) => `${b.u} ${b.status}`)
    .join(", "),
);
const slowest = statuses.reduce((a, b) => (a.ms > b.ms ? a : b));
warn(
  "slowest page under 800ms TTFB+transfer",
  slowest.ms < 800,
  `${Math.round(slowest.ms)}ms ${slowest.u.replace(ORIGIN, "")}`,
);
const median = statuses.map((s) => s.ms).sort((a, b) => a - b)[
  Math.floor(statuses.length / 2)
];
console.log(
  `      median page response: ${Math.round(median)}ms across ${statuses.length} pages`,
);

// ---------- 3. sitemap URLs must all be https and canonical host ----------
check(
  "no sitemap URL uses http or www",
  urls.every((u) => u.startsWith("https://tikanmaanhuoltoasema.com/")),
  urls.find((u) => !u.startsWith("https://tikanmaanhuoltoasema.com/")) || "",
);

// ---------- 4. robots ----------
const robots = await (await fetch(`${ORIGIN}/robots.txt`)).text();
check(
  "robots.txt allows crawling",
  /Allow: \//.test(robots) && !/Disallow: \/\s*$/m.test(robots),
);
check(
  "robots.txt points at the sitemap",
  robots.includes(`${ORIGIN}/sitemap.xml`),
);

// ---------- 5. security headers on every response class ----------
const CLASSES = [
  ["html page", `${ORIGIN}/fi/`],
  ["image", `${ORIGIN}/img/wash-dark.webp`],
  ["robots", `${ORIGIN}/robots.txt`],
  ["sitemap", `${ORIGIN}/sitemap.xml`],
];
const REQUIRED = [
  "strict-transport-security",
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "permissions-policy",
  "content-security-policy",
];
for (const [label, url] of CLASSES) {
  const r = await head(url, "follow");
  const missing = REQUIRED.filter((h) => !r.headers.get(h));
  check(
    `security headers present on ${label}`,
    missing.length === 0,
    missing.join(", "),
  );
  const cc = [...r.headers.entries()].filter(([k]) => k === "cache-control");
  check(
    `exactly one cache-control on ${label}`,
    cc.length === 1,
    `${cc.length}`,
  );
}
const h = (await head(`${ORIGIN}/fi/`, "follow")).headers;
check(
  "HSTS is at least one year",
  /max-age=(\d+)/.test(h.get("strict-transport-security")) &&
    Number(h.get("strict-transport-security").match(/max-age=(\d+)/)[1]) >=
      31536000,
  h.get("strict-transport-security"),
);
check(
  "HSTS does NOT claim preload",
  !/preload/.test(h.get("strict-transport-security") || ""),
);
check(
  "CSP forbids framing",
  /frame-ancestors 'none'/.test(h.get("content-security-policy")),
);
check(
  "CSP has no wildcard source",
  !/\*/.test(h.get("content-security-policy")),
);
check(
  "server version is hidden",
  (h.get("server") || "") === "nginx",
  h.get("server"),
);

// ---------- 6. compression ----------
const gz = await fetch(`${ORIGIN}/fi/`, {
  headers: { "accept-encoding": "gzip" },
});
check(
  "html is compressed",
  (gz.headers.get("content-encoding") || "") === "gzip",
  gz.headers.get("content-encoding") || "none",
);

// ---------- 7. TLS ----------
const tls = await new Promise((res) => {
  import("node:tls").then((t) => {
    const s = t.connect(
      {
        host: "tikanmaanhuoltoasema.com",
        port: 443,
        servername: "tikanmaanhuoltoasema.com",
      },
      () => {
        const c = s.getPeerCertificate();
        res({
          proto: s.getProtocol(),
          issuer: c.issuer?.O,
          valid_to: c.valid_to,
          san: c.subjectaltname,
        });
        s.end();
      },
    );
    s.on("error", (e) => res({ error: String(e.message) }));
  });
});
check("TLS 1.3 negotiated", tls.proto === "TLSv1.3", tls.proto || tls.error);
check(
  "certificate covers apex and www",
  (tls.san || "").includes("tikanmaanhuoltoasema.com") &&
    (tls.san || "").includes("www."),
  tls.san,
);
const daysLeft = Math.round((new Date(tls.valid_to) - Date.now()) / 86400000);
check(
  "certificate valid for more than 20 days",
  daysLeft > 20,
  `${daysLeft} days, issuer ${tls.issuer}`,
);

// ---------- 8. every referenced asset actually exists ----------
// Catches a dangling reference after an asset rename, which is exactly what
// the .jpg to .webp switch produced and what this audit caught in the act.
const assetRefs = new Set();
for (const loc of LOCALES) {
  for (const sub of [
    "",
    "hinnasto/",
    "rengashotelli/",
    "yhteystiedot/",
    "palvelut/auton-kasinpesu/",
    "tietosuoja/",
  ]) {
    const html = await (await fetch(`${ORIGIN}/${loc}/${sub}`)).text();
    for (const m of html.matchAll(
      /(?:src|href|content)="(\/[^"]+\.(?:webp|jpg|png|svg|woff2|css|js|xml|txt))"/g,
    )) {
      assetRefs.add(m[1]);
    }
  }
}
const assetResults = await Promise.all(
  [...assetRefs].map(async (a) => ({ a, s: (await fetch(ORIGIN + a)).status })),
);
const deadAssets = assetResults.filter((r) => r.s !== 200);
check(
  `every referenced asset exists (${assetRefs.size} checked)`,
  deadAssets.length === 0,
  deadAssets
    .slice(0, 5)
    .map((d) => `${d.a} ${d.s}`)
    .join(", "),
);

// ---------- 9. 404 ----------
const nf = await head(`${ORIGIN}/fi/ei-ole-olemassa/`, "follow");
check("unknown URL returns a real 404 status", nf.status === 404, nf.status);

// ---------- 9. browser-level behaviour on the LIVE site ----------
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await ctx.newPage();
const errors = [];
const insecure = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
page.on("request", (r) => {
  if (r.url().startsWith("http://")) insecure.push(r.url());
  if (
    !r.url().includes("tikanmaanhuoltoasema.com") &&
    !r.url().startsWith("data:")
  )
    insecure.push(r.url());
});

await page.goto(`${ORIGIN}/fi/`, { waitUntil: "networkidle" });
check(
  "no console errors on the live home page",
  errors.length === 0,
  errors.slice(0, 2).join("; "),
);
check(
  "no third-party or insecure requests",
  insecure.length === 0,
  insecure.slice(0, 3).join(", "),
);

const liveFonts = await page.evaluate(() => ({
  d: document.fonts.check("400 100px Anton"),
  b: document.fonts.check("400 16px Archivo"),
  m: document.fonts.check("400 11px 'Geist Mono'"),
}));
check(
  "all three fonts load on the live site",
  liveFonts.d && liveFonts.b && liveFonts.m,
  JSON.stringify(liveFonts),
);

const seq = await page.evaluate(() => {
  const s = document.getElementById("nain");
  return { top: s.offsetTop, h: s.offsetHeight };
});
const seen = [];
for (const f of [0.06, 0.28, 0.5, 0.72]) {
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    seq.top + seq.h * f,
  );
  await page.waitForTimeout(900);
  seen.push(await page.textContent(".seq-stage-t"));
}
check(
  "scroll sequence runs on the live site",
  new Set(seen).size === 4,
  seen.join(" | "),
);

await page.goto(`${ORIGIN}/fi/hinnasto/`, { waitUntil: "networkidle" });
await page.click("#laskuri .toggle button:nth-child(2)");
await page.waitForTimeout(700);
check(
  "live calculator computes maasturi = 105",
  (await page.textContent("#laskuri .total")).includes("105"),
  await page.textContent("#laskuri .total"),
);

// every link on every page, including tel: and sms:
const linkReport = { tel: 0, sms: 0, internal: 0, external: 0, broken: [] };
const visited = new Set();
const queue = ["/fi/", "/sv/", "/en/"];
while (queue.length) {
  const u = queue.shift();
  if (visited.has(u)) continue;
  visited.add(u);
  const r = await page.goto(ORIGIN + u, { waitUntil: "domcontentloaded" });
  if (r.status() !== 200) {
    linkReport.broken.push(`${u} ${r.status()}`);
    continue;
  }
  const links = await page.evaluate(() =>
    [...document.querySelectorAll("a[href]")].map((a) =>
      a.getAttribute("href"),
    ),
  );
  for (const l of links) {
    if (l.startsWith("tel:")) linkReport.tel++;
    else if (l.startsWith("sms:")) linkReport.sms++;
    else if (l.startsWith("/")) {
      linkReport.internal++;
      if (!visited.has(l)) queue.push(l);
    } else if (l.startsWith("http")) linkReport.external++;
  }
}
check(
  "every internal link on every page resolves",
  linkReport.broken.length === 0,
  linkReport.broken.slice(0, 5).join(", "),
);
check("crawled all 60 pages live", visited.size === 60, visited.size);
console.log(
  `      links seen: ${linkReport.internal} internal, ${linkReport.tel} tel:, ${linkReport.sms} sms:, ${linkReport.external} external`,
);
check(
  "tel: and sms: links exist on the site",
  linkReport.tel > 0 && linkReport.sms > 0,
);

// canonical + hreflang correctness live
for (const loc of LOCALES) {
  await page.goto(`${ORIGIN}/${loc}/hinnasto/`, {
    waitUntil: "domcontentloaded",
  });
  const meta = await page.evaluate(() => ({
    canon: document.querySelector('link[rel="canonical"]')?.href,
    alts: [...document.querySelectorAll('link[rel="alternate"]')].map((l) =>
      l.getAttribute("hreflang"),
    ),
    lang: document.documentElement.lang,
    title: document.title,
    desc:
      document.querySelector('meta[name="description"]')?.content?.length ?? 0,
  }));
  check(
    `/${loc}/hinnasto/ canonical is self-referential`,
    meta.canon === `${ORIGIN}/${loc}/hinnasto/`,
    meta.canon,
  );
  check(
    `/${loc}/hinnasto/ has all 4 hreflang entries`,
    meta.alts.length === 4,
    meta.alts.join(","),
  );
  check(
    `/${loc}/hinnasto/ description is a usable length`,
    meta.desc >= 70 && meta.desc <= 165,
    `${meta.desc} chars`,
  );
}

// Speed, measured on a COLD load. The earlier version reused the warmed
// context and reported LCP 136ms with a 1KB transfer, which is the cache
// talking, not the site. Fresh context, cache disabled, network throttled.
const perfCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const perfPage = await perfCtx.newPage();
const pcdp = await perfCtx.newCDPSession(perfPage);
await pcdp.send("Network.enable");
await pcdp.send("Network.setCacheDisabled", { cacheDisabled: true });
await pcdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 150, // Fast 3G
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
});
await pcdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

await perfPage.goto(`${ORIGIN}/fi/`, { waitUntil: "load" });
await perfPage.waitForTimeout(4000);
const perf = await perfPage.evaluate(
  () =>
    new Promise((res) => {
      let lcp = 0,
        cls = 0;
      new PerformanceObserver((l) =>
        l.getEntries().forEach((e) => (lcp = e.startTime)),
      ).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((l) =>
        l.getEntries().forEach((e) => {
          if (!e.hadRecentInput) cls += e.value;
        }),
      ).observe({ type: "layout-shift", buffered: true });
      setTimeout(() => {
        const nav = performance.getEntriesByType("navigation")[0];
        const rs = performance.getEntriesByType("resource");
        const bytes = rs.reduce((s, r) => s + (r.transferSize || 0), 0);
        res({
          lcp: Math.round(lcp),
          cls: +cls.toFixed(4),
          ttfb: Math.round(nav.responseStart),
          kb: Math.round((bytes + (nav.transferSize || 0)) / 1024),
          requests: rs.length,
        });
      }, 1500);
    }),
);
console.log(
  `      COLD load @ Fast3G + 4x CPU: TTFB ${perf.ttfb}ms, LCP ${perf.lcp}ms, CLS ${perf.cls}, ${perf.kb}KB over ${perf.requests} requests`,
);
check(
  "cold-load LCP under 2500ms on Fast 3G + 4x CPU",
  perf.lcp < 2500,
  `${perf.lcp}ms`,
);
check("cold-load CLS under 0.1", perf.cls < 0.1, perf.cls);
check(
  "perf measurement was genuinely cold, not cached",
  perf.kb > 100,
  `${perf.kb}KB`,
);
warn("first-load transfer under 1200KB", perf.kb < 1200, `${perf.kb}KB`);
await perfCtx.close();

await browser.close();

console.log("\n" + "=".repeat(62));
console.log(
  `${total - fails.length}/${total} checks passed, ${warns.length} warning(s)`,
);
fails.forEach((f) => console.log("  FAIL " + f));
warns.forEach((w) => console.log("  WARN " + w));
process.exit(fails.length ? 1 : 0);
