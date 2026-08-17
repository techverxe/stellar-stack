import localFont from "next/font/local";

/**
 * Self-hosted, so there is no third-party font request and no way for a face
 * to be "declared" without being loaded. v1 declared `--font-display: Anton`
 * with no @font-face anywhere and silently fell back to system-ui on every
 * page, which is the single defect that got that build rejected.
 *
 * These are the Google `latin` subsets, whose unicode-range covers
 * U+0000-00FF, i.e. Latin-1 Supplement, which contains a-diaeresis,
 * o-diaeresis and a-ring. Finnish therefore renders from the real face rather
 * than a fallback. A test measures that rather than trusting this comment.
 */

/**
 * `optional`, not `swap`, and ONLY on the display face.
 *
 * Measured on the live site: `swap` produced a single 0.0895 layout shift at
 * ~1.16s, exactly when the Anton file finished downloading. The hero block
 * shrank from 850px to 709px, which is one line of the headline. Anton is
 * heavily condensed while the generated fallback is size-adjusted Arial, so
 * the fallback wraps the headline to one more line and the bottom-aligned
 * hero content jumps when the real face arrives.
 *
 * `optional` means: if the face is not ready within roughly 100ms the browser
 * keeps the fallback for that page view and never swaps, so there is no
 * reflow. The file is same-origin, preloaded and small, so it is normally
 * ready in time; a first visit on a very slow link sees the fallback once and
 * gets the real face on every later view from cache.
 *
 * Body and mono stay on `swap`: small text, negligible shift.
 */
export const display = localFont({
  src: [
    { path: "../fonts/anton_75f46c.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-display",
  display: "optional",
  fallback: ["Impact", "sans-serif"],
  preload: true,
});

export const body = localFont({
  src: [
    {
      path: "../fonts/archivo_2a392e.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

export const mono = localFont({
  src: [
    {
      path: "../fonts/geistmono_013b2f.woff2",
      weight: "300 500",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
  preload: true,
});

export const fontVars = `${display.variable} ${body.variable} ${mono.variable}`;
