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
 * Requires the built export to be served. Run:
 *   npm run build && npx serve out -l 4010
 *   node scripts/responsive-sweep.mjs
 */
import { chromium } from 'playwright';

const WIDTHS = [320,360,390,414,480,568,640,720,768,834,900,1024,1100,1180,1280,1366,1440,1512,1600,1728,1920,2560];
const PAGES = ['/fi/','/fi/palvelut/','/fi/referenssit/','/fi/kampanja/','/fi/yhteystiedot/','/en/insights/','/fi/palvelut/verkkosivut/'];

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
const problems = [];

for (const w of WIDTHS) {
  await page.setViewportSize({ width: w, height: 900 });
  for (const path of PAGES) {
    await page.goto('http://localhost:4010' + path, { waitUntil: 'load' });
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
if (!problems.length) { console.log('SWEEP CLEAN across', WIDTHS.length, 'widths x', PAGES.length, 'pages =', WIDTHS.length*PAGES.length, 'checks'); }
else { console.log('PROBLEMS:', problems.length); for (const p of problems.slice(0,25)) console.log(` ${p.w}px ${p.path}`, JSON.stringify(p.res)); }
