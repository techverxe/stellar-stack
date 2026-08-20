#!/usr/bin/env node
/**
 * Rendered-page invariants that markup and CSS review cannot catch.
 *
 * Exists because of a real defect: `.ftr-cards` lifts itself 80px with a
 * transform so the footer cards sit UP into the white above, and `.ftr`
 * carried `overflow: hidden`, which clipped exactly those 80px. Every footer
 * card heading and the tagline's first line were cut off on every page of the
 * live site, and the white left behind read as a huge unexplained gap. The
 * CSS was self-consistent, the build was green, all five gates passed, and 99
 * routes were byte-identical to the build. Nothing in the suite could see it,
 * because the defect only exists once a browser paints.
 *
 * So these are POSITIVE checks: not "nothing overflows" but "this specific
 * element is actually on screen where it should be". Absence-of-defect gates
 * are what let the footer ship broken.
 *
 * Serves out/ itself on an ephemeral port. RENDER_BASE=https://host points it
 * at a deployed site instead.
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;
if (!existsSync(join(OUT, "index.html"))) {
  console.error("FAIL: no build in out/. Run npm run build first.");
  process.exit(1);
}
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml",
  ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2",
  ".json": "application/json", ".ico": "image/x-icon",
};
const server = createServer((req, res) => {
  let p = join(OUT, decodeURIComponent((req.url || "/").split("?")[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p) || statSync(p).isDirectory()) {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(existsSync(join(OUT, "404.html")) ? readFileSync(join(OUT, "404.html")) : "404");
    return;
  }
  res.writeHead(200, { "content-type": MIME[extname(p)] || "application/octet-stream" });
  res.end(readFileSync(p));
});

const LIVE = process.env.RENDER_BASE?.replace(/\/$/, "");
if (!LIVE) await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = LIVE || `http://127.0.0.1:${server.address().port}`;

// One page per locale, plus an inner page, since the footer is shared and a
// regression would hit every route at once.
const PAGES = ["/fi/", "/sv/", "/en/", "/fi/palvelut/verkkosivut/"];
const WIDTHS = [1440, 1280, 900, 390];

const failures = [];
const fail = (m) => { failures.push(m); console.log("FAIL  " + m); };
const pass = (m) => console.log("PASS  " + m);

const browser = await chromium.launch();
try {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    for (const path of PAGES) {
      await page.goto(BASE + path, { waitUntil: "load" });
      await page.evaluate(() =>
        document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = "eager")),
      );
      // The footer sits thousands of pixels down and hit-testing is viewport
      // relative, so it has to be brought on screen first. A single
      // scrollIntoView is NOT enough and silently lands short: this page
      // reveals sections as they enter view, so the document grows underneath
      // the scroll and the footer keeps moving down. Measured: one call left
      // the footer still 3149px below the fold. Step down until the scroll
      // position stops changing, the way a visitor actually gets there.
      await page.evaluate(async () => {
        let last = -1;
        for (let i = 0; i < 60 && window.scrollY !== last; i++) {
          last = window.scrollY;
          window.scrollTo(0, document.documentElement.scrollHeight);
          await new Promise((r) => setTimeout(r, 80));
        }
        document.querySelector("footer")?.scrollIntoView({ block: "end" });
      });
      await page.waitForTimeout(300);

      const r = await page.evaluate(() => {
        const foot = document.querySelector("footer");
        if (!foot) return { error: "no footer element" };
        const cs = getComputedStyle(foot);
        const fr = foot.getBoundingClientRect();
        const cards = [...foot.querySelectorAll(".ftr-card")];
        const heads = [...foot.querySelectorAll(".ftr-card h2")];

        // Hit-test each heading's own centre. This is the check that matters:
        // a clipped heading still has a box and still reports its text, but
        // the point at its centre belongs to something else, or to nothing.
        const headings = heads.map((h) => {
          const b = h.getBoundingClientRect();
          const cx = b.left + b.width / 2;
          const cy = b.top + b.height / 2;
          const hit = document.elementFromPoint(cx, cy);
          return {
            text: (h.textContent || "").trim().slice(0, 24),
            visible: b.width > 0 && b.height > 0,
            insideViewport: cy >= 0 && cy <= window.innerHeight,
            hitIsSelfOrChild: !!hit && (hit === h || h.contains(hit) || hit.contains(h)),
          };
        });
        const cardTop = cards.length ? Math.min(...cards.map((c) => c.getBoundingClientRect().top)) : null;
        return {
          overflow: cs.overflow,
          overflowY: cs.overflowY,
          cardCount: cards.length,
          cardsRise: cardTop === null ? null : Math.round(fr.top - cardTop),
          headings,
        };
      });

      const where = `${width}px ${path}`;
      if (r.error) { fail(`${where}: ${r.error}`); continue; }

      // 1. The ground must not clip its own lifted cards.
      if (r.overflow === "hidden" || r.overflowY === "hidden") {
        fail(`${where}: footer overflow is hidden, which clips the lifted cards`);
      } else pass(`${where}: footer does not clip`);

      // 2. The lift must still be happening.
      if (!(r.cardsRise > 0)) {
        fail(`${where}: footer cards do not rise above the ground (${r.cardsRise})`);
      } else pass(`${where}: cards rise ${r.cardsRise}px`);

      // 3. Every heading must be genuinely on screen and hit-testable.
      if (!r.headings.length) fail(`${where}: no footer card headings found`);
      for (const h of r.headings) {
        if (!h.visible || !h.insideViewport || !h.hitIsSelfOrChild) {
          fail(
            `${where}: footer heading "${h.text}" is not visible ` +
              `(box=${h.visible} inViewport=${h.insideViewport} hitTest=${h.hitIsSelfOrChild})`,
          );
        }
      }
      if (r.headings.every((h) => h.visible && h.insideViewport && h.hitIsSelfOrChild)) {
        pass(`${where}: all ${r.headings.length} footer headings visible`);
      }
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  if (server.listening) server.close();
}

console.log("\n" + "=".repeat(56));
if (failures.length) {
  console.log(`RENDER CHECK FAILED: ${failures.length} problem(s)`);
  process.exit(1);
}
console.log(`RENDER CHECK CLEAN across ${WIDTHS.length} widths x ${PAGES.length} pages`);
