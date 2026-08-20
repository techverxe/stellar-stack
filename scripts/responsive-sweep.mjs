#!/usr/bin/env node
/**
 * Responsive sweep: loads representative pages at every width from a small
 * phone to a wide desktop and fails if anything overflows the viewport.
 *
 * Exists because "it looked fine when I checked" is not a claim anyone can
 * verify, and because two real defects shipped that only a narrow viewport
 * showed: a mobile menu that rendered permanently open (`display: flex`
 * outranking the `hidden` attribute), and CSS grids using
 * `minmax(300px, ...)`, whose hard floor forced 348px of content into a
 * 320px screen.
 *
 * Serves ./out ITSELF on an ephemeral port. Run:
 *   npm run build && node scripts/responsive-sweep.mjs
 *
 * It used to require `npx serve out -l 4010` to be running separately and
 * hit a hardcoded localhost:4010. That is how this gate came to report
 * "SWEEP CLEAN, 154 checks" during a deploy while actually measuring a
 * SEPARATE WORKTREE's build, left serving on that port by an earlier session
 * hours before. A gate that measures whatever happens to be on a well-known
 * port is not a gate; it cannot fail for the tree it is supposedly checking.
 * Owning the server means the pages measured are always this build's.
 *
 * SWEEP_BASE=https://host points it at a deployed site instead.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const OUT = new URL('../out/', import.meta.url).pathname;
if (!existsSync(join(OUT, 'index.html'))) {
  console.error('FAIL: no build in out/. Run npm run build first.');
  process.exit(1);
}
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2',
  '.json': 'application/json', '.ico': 'image/x-icon',
};
// Mirrors the Caddyfile's try_files: path, path/, path/index.html.
const server = createServer((req, res) => {
  let p = join(OUT, decodeURIComponent((req.url || '/').split('?')[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p) && existsSync(p + '.html')) p += '.html';
  if (!existsSync(p) || statSync(p).isDirectory()) {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end(existsSync(join(OUT, '404.html')) ? readFileSync(join(OUT, '404.html')) : '404');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
  res.end(readFileSync(p));
});

const LIVE = process.env.SWEEP_BASE?.replace(/\/$/, '');
if (!LIVE) await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = LIVE || `http://127.0.0.1:${server.address().port}`;
console.log('sweeping', BASE);

const WIDTHS = [320,360,390,414,480,568,640,720,768,834,900,1024,1100,1180,1280,1366,1440,1512,1600,1728,1920,2560];
// One page of every template. The industry DETAIL page was missing until
// STK-016 rewrote that template, which meant the sweep could not have
// caught an overflow on eight routes per locale.
const PAGES = ['/fi/','/fi/palvelut/','/fi/referenssit/','/fi/kampanja/','/fi/yhteystiedot/','/en/insights/','/fi/palvelut/verkkosivut/','/fi/toimialat/rakennus/','/fi/artikkelit/sivuston-nopeus/'];

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
const problems = [];

for (const w of WIDTHS) {
  await page.setViewportSize({ width: w, height: 900 });
  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'load' });
    await page.evaluate(() => {
      document.querySelectorAll('img[loading="lazy"]').forEach(i => i.loading = 'eager');
    });
    await page.waitForTimeout(120);
    const res = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const bad = [];
      if (document.documentElement.scrollWidth > vw + 1) {
        bad.push({ kind: 'DOC', detail: document.documentElement.scrollWidth + ' > ' + vw });
      }
      document.querySelectorAll('*').forEach(el => {
        if (el.classList && el.classList.contains('skip')) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.right > vw + 1 || r.left < -1) {
          bad.push({ kind: 'EL', detail: el.tagName + '.' + String(el.className || '').split(' ')[0] + ' x=' + Math.round(r.left) + ' right=' + Math.round(r.right) });
        }
      });
      const seen = new Set();
      return bad.filter(b => { const k = b.detail; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 4);
    });
    if (res.length) problems.push({ w, path, res });
  }
}

await browser.close();
if (server.listening) server.close();
if (!problems.length) { console.log('SWEEP CLEAN across', WIDTHS.length, 'widths x', PAGES.length, 'pages =', WIDTHS.length*PAGES.length, 'checks'); }
else {
  console.log('PROBLEMS:', problems.length);
  for (const p of problems.slice(0,25)) console.log(` ${p.w}px ${p.path}`, JSON.stringify(p.res));
  // Exit non-zero so CI and deploy.sh actually stop. This script printed its
  // problems and exited 0 before, which made it advisory in every caller.
  process.exit(1);
}
