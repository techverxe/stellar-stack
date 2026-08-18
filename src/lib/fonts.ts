import localFont from "next/font/local";

/**
 * Type system.
 *
 * The reference design sets its headings in Alliance No.2, a licensed
 * commercial face we are not going to copy. Inter is the closest free
 * substitute for what actually matters here: a neutral grotesque that holds up
 * at LIGHT weights and very large sizes, which is the whole character of that
 * design (92px at weight 300, not a bold display face).
 *
 * Self-hosted, so there is no third-party request and no way for a face to be
 * "declared" without being loaded. An earlier build of this site declared a
 * display family with no @font-face anywhere and silently fell back to
 * system-ui on every page; a test now measures the loaded face rather than
 * trusting this comment.
 *
 * The `latin` subset's unicode-range covers U+0000-00FF, which includes
 * a-diaeresis, o-diaeresis and a-ring, so Finnish and Swedish render from the
 * real face rather than a fallback.
 */

/**
 * Display AND body are the same family, which is deliberate: the reference
 * design gets its texture from weight and size contrast, not from mixing
 * families. `swap` throughout, because both roles use the same file, so there
 * is no second face arriving later to cause a shift.
 */
export const sans = localFont({
  src: [
    {
      path: "../fonts/inter_749a30.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  preload: true,
  adjustFontFallback: "Arial",
});

/**
 * Used only for the wide-tracked uppercase eyebrow labels above section
 * headings, which is a signature of the reference layout.
 */
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
  preload: false,
});

export const fontVars = `${sans.variable} ${mono.variable}`;
