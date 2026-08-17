/**
 * Responsive and layout audit across a viewport matrix, all three languages.
 *
 * Written after a real defect that none of the existing suites caught: on the
 * English home page the hero headline overlapped the fixed header. Every
 * previous check ran at 1440x900 and 390x844 only, and Finnish is far shorter
 * than English, so the failure lived in the gaps between those two sizes.
 *
 * Checks that no single-viewport test can make:
 *   - nothing collides with the fixed header
 *   - hero content never outgrows its own box
 *   - no horizontal scroll at any width
 *   - no text is clipped by an overflow:hidden ancestor
 *   - every image actually fills its frame rather than stretching or letterboxing
 *   - tap targets are big enough on touch widths
 */
import { chromium } from "playwright";

const ORIGIN = process.env.ORIGIN ?? "https://tikanmaanhuoltoasema.com";

// Deliberately includes SHORT viewports: a laptop with devtools open, and a
// wide-but-short window, which is where the reported defect appeared.
const VIEWPORTS = [
  { w: 320, h: 568, name: "320x568 small phone" },
  { w: 360, h: 640, name: "360x640 android" },
  { w: 390, h: 844, name: "390x844 iphone" },
  { w: 414, h: 896, name: "414x896 large phone" },
  { w: 768, h: 1024, name: "768x1024 tablet portrait" },
  { w: 834, h: 700, name: "834x700 tablet short" },
  { w: 1024, h: 768, name: "1024x768 small laptop" },
  { w: 1280, h: 720, name: "1280x720 laptop" },
  { w: 1440, h: 900, name: "1440x900 desktop" },
  { w: 1600, h: 720, name: "1600x720 wide short" },
  { w: 1920, h: 1080, name: "1920x1080 large" },
  { w: 2560, h: 1080, name: "2560x1080 ultrawide" },
];

const PAGES = [
  "",
  "hinnasto/",
  "palvelut/",
  "palvelut/tayshoito/",
  "rengashotelli/",
  "yhteystiedot/",
  "tietosuoja/",
];
const LOCALES = ["fi", "sv", "en"];

const findings = [];
let checks = 0;

function record(sev, page, vp, what, detail) {
  findings.push({ sev, page, vp, what, detail });
}

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    isMobile: vp.w < 768,
    hasTouch: vp.w < 768,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const loc of LOCALES) {
    // the home page is the risky one, so it is checked at every viewport;
    // inner pages at a representative subset to keep the run bounded
    const pages =
      vp.w === 390 || vp.w === 1440 || vp.w === 1600
        ? PAGES
        : ["", "hinnasto/"];
    for (const sub of pages) {
      const url = `${ORIGIN}/${loc}/${sub}`;
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(350);
      checks++;

      const r = await page.evaluate(() => {
        const out = {
          overflow: null,
          headerCollision: null,
          heroOverflow: null,
          clipped: [],
          badImages: [],
          smallTaps: [],
          offscreen: [],
        };

        // 1. horizontal scroll
        const de = document.documentElement;
        if (de.scrollWidth > innerWidth + 1) {
          const wide = [...document.querySelectorAll("body *")]
            .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
            .slice(0, 3)
            .map(
              (e) =>
                e.tagName +
                (e.className
                  ? "." + String(e.className).trim().split(/\s+/)[0]
                  : ""),
            );
          out.overflow = {
            scrollWidth: de.scrollWidth,
            innerWidth,
            culprits: wide,
          };
        }

        // 2. anything colliding with the fixed header at rest
        const hdr = document.querySelector(".hdr");
        if (hdr) {
          const hb = hdr.getBoundingClientRect();
          const main = document.querySelector("main");
          // the FIRST visible text block of the page must start below the header
          // Measure the first element that actually CARRIES TEXT, not its
          // padded container. `.pagehead` has padding-top of a full header
          // height, so its border box starts at y=0 while the visible text sits
          // well below the header. Measuring the container reported 15 false
          // collisions before this was corrected.
          const candidates = [...(main?.querySelectorAll("h1, h2, p, .label") ?? [])];
          const firstText = candidates.find((e) => {
            const b = e.getBoundingClientRect();
            return e.textContent.trim() && b.height > 0 && b.width > 0;
          });
          if (firstText) {
            const fb = firstText.getBoundingClientRect();
            if (fb.top < hb.bottom - 1 && fb.bottom > hb.top) {
              out.headerCollision = {
                el:
                  firstText.tagName +
                  "." +
                  String(firstText.className).trim().split(/\s+/)[0],
                elTop: Math.round(fb.top),
                headerBottom: Math.round(hb.bottom),
                overlapPx: Math.round(hb.bottom - fb.top),
              };
            }
          }
        }

        // 3. hero content taller than the hero box
        const hero = document.querySelector(".hero");
        const heroIn = document.querySelector(".hero-in");
        if (hero && heroIn) {
          const a = hero.getBoundingClientRect(),
            b = heroIn.getBoundingClientRect();
          if (b.height > a.height + 1 || b.top < a.top - 1) {
            out.heroOverflow = {
              heroH: Math.round(a.height),
              contentH: Math.round(b.height),
              contentTop: Math.round(b.top),
              heroTop: Math.round(a.top),
            };
          }
        }

        // 4. text clipped by an overflow:hidden ancestor
        for (const e of document.querySelectorAll(
          "h1, h2, h3, p, li, td, .num, .total",
        )) {
          if (!e.textContent.trim()) continue;
          if (
            e.scrollWidth > e.clientWidth + 2 &&
            getComputedStyle(e).overflow !== "visible"
          ) {
            out.clipped.push({
              el: e.tagName,
              text: e.textContent.trim().slice(0, 30),
              scroll: e.scrollWidth,
              client: e.clientWidth,
            });
          }
        }

        // 5. images: must be laid out, and must fill their frame
        for (const img of document.querySelectorAll("img")) {
          const b = img.getBoundingClientRect();
          if (b.width < 2 || b.height < 2) continue; // lazy / offscreen
          const cs = getComputedStyle(img);
          if (!img.complete || img.naturalWidth === 0) continue;
          if (cs.objectFit !== "cover" && cs.objectFit !== "contain") {
            // no object-fit: a mismatch between box ratio and natural ratio stretches it
            const boxRatio = b.width / b.height;
            const natRatio = img.naturalWidth / img.naturalHeight;
            if (Math.abs(boxRatio - natRatio) / natRatio > 0.02) {
              out.badImages.push({
                src: img.currentSrc.split("/").pop(),
                fit: cs.objectFit,
                box: `${Math.round(b.width)}x${Math.round(b.height)}`,
                natural: `${img.naturalWidth}x${img.naturalHeight}`,
              });
            }
          }
          // an image whose rendered box is far larger than the source is visibly soft
          if (b.width > img.naturalWidth * 1.9) {
            out.badImages.push({
              src: img.currentSrc.split("/").pop(),
              fit: "upscaled",
              box: `${Math.round(b.width)}x${Math.round(b.height)}`,
              natural: `${img.naturalWidth}x${img.naturalHeight}`,
            });
          }
        }

        // 6. tap targets on touch widths
        if (innerWidth < 768) {
          for (const e of document.querySelectorAll("a, button")) {
            const b = e.getBoundingClientRect();
            if (b.width < 1 || b.height < 1) continue;
            if (b.height < 32 && e.textContent.trim()) {
              out.smallTaps.push({
                el: e.tagName,
                text: e.textContent.trim().slice(0, 22),
                h: Math.round(b.height),
              });
            }
          }
        }

        return out;
      });

      const where = `/${loc}/${sub}`;
      if (r.overflow)
        record(
          "HIGH",
          where,
          vp.name,
          "horizontal scroll",
          JSON.stringify(r.overflow),
        );
      if (r.headerCollision)
        record(
          "HIGH",
          where,
          vp.name,
          "content collides with fixed header",
          JSON.stringify(r.headerCollision),
        );
      if (r.heroOverflow)
        record(
          "HIGH",
          where,
          vp.name,
          "hero content outgrows its box",
          JSON.stringify(r.heroOverflow),
        );
      for (const c of r.clipped.slice(0, 2))
        record("MED", where, vp.name, "text clipped", JSON.stringify(c));
      for (const b of r.badImages.slice(0, 3))
        record(
          "MED",
          where,
          vp.name,
          "image does not fit its frame",
          JSON.stringify(b),
        );
      const taps = [...new Map(r.smallTaps.map((t) => [t.text, t])).values()];
      for (const t of taps.slice(0, 2))
        record(
          "LOW",
          where,
          vp.name,
          "tap target under 32px",
          JSON.stringify(t),
        );
    }
  }
  await ctx.close();
  process.stdout.write(`  ${vp.name} done\n`);
}

await browser.close();

console.log("\n" + "=".repeat(70));
console.log(`${checks} page-viewport combinations checked`);
const bySev = { HIGH: [], MED: [], LOW: [] };
findings.forEach((f) => bySev[f.sev].push(f));

for (const sev of ["HIGH", "MED", "LOW"]) {
  const list = bySev[sev];
  if (!list.length) {
    console.log(`${sev}: none`);
    continue;
  }
  // group identical problems so one bug is not reported 30 times
  const grouped = new Map();
  for (const f of list) {
    const k = `${f.what} | ${f.page}`;
    if (!grouped.has(k)) grouped.set(k, []);
    grouped.get(k).push(f);
  }
  console.log(
    `\n${sev}: ${list.length} finding(s) in ${grouped.size} group(s)`,
  );
  for (const [k, fs] of grouped) {
    console.log(`  ${k}`);
    console.log(`    at: ${fs.map((f) => f.vp.split(" ")[0]).join(", ")}`);
    console.log(`    e.g. ${fs[0].detail}`);
  }
}
process.exit(bySev.HIGH.length ? 1 : 0);
