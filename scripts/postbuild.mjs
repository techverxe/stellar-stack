#!/usr/bin/env node
/**
 * Post-build steps that a static export cannot express in the app router.
 *
 * 1. `out/index.html`. Every locale is prefixed (/fi/, /sv/, /en/), so nothing
 *    renders at the bare root. In production nginx redirects / to /fi/, but the
 *    build output is also served directly from `out/` during review (a plain
 *    `python3 -m http.server`, which is how the previous site was previewed),
 *    and there a missing root is just a 404. This writes a real page that
 *    redirects, works with JavaScript disabled via meta refresh, and carries
 *    the hreflang set so a crawler landing on the root still learns about all
 *    three languages.
 *
 * 2. `out/404.html`. Same reasoning: served by nginx as the error page, and
 *    picked up automatically by most static hosts.
 *
 * Both files are generated rather than committed so the locale list and the
 * site URL stay single-sourced from src/content.
 */

import { writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");
const SITE = "https://stellarstack.fi";
const LOCALES = [
  { code: "fi", tag: "fi-FI", name: "Suomi" },
  { code: "sv", tag: "sv-FI", name: "Svenska" },
  { code: "en", tag: "en", name: "English" },
];
const DEFAULT = "fi";

const alternates = LOCALES.map(
  (l) => `<link rel="alternate" hreflang="${l.tag}" href="${SITE}/${l.code}/">`,
)
  .concat(
    `<link rel="alternate" hreflang="x-default" href="${SITE}/${DEFAULT}/">`,
  )
  .join("\n    ");

const shell = (title, body, extraHead = "") => `<!doctype html>
<html lang="fi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <meta name="theme-color" content="#090d16">
    ${extraHead}
    <style>
      html,body{margin:0;height:100%}
      body{background:#090d16;color:#f5f8fc;display:grid;place-items:center;
        font-family:system-ui,-apple-system,sans-serif;text-align:center;padding:24px}
      .b{max-width:44ch;display:flex;flex-direction:column;gap:14px;align-items:center}
      h1{font-size:26px;margin:0;letter-spacing:-.02em}
      p{margin:0;color:#9aa8bd;line-height:1.6;font-size:15px}
      .l{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:6px}
      a{display:inline-block;padding:10px 20px;border-radius:999px;background:#38bdf8;
        color:#05080f;text-decoration:none;font-weight:600;font-size:15px}
      a.g{background:transparent;color:#f5f8fc;border:1px solid rgba(255,255,255,.16)}
    </style>
  </head>
  <body>${body}</body>
</html>
`;

const rootBody = `
    <div class="b">
      <h1>Stellar Stack</h1>
      <p>Ohjataan suomenkieliselle sivustolle. Redirecting to the Finnish site.</p>
      <div class="l">
        ${LOCALES.map(
          (l) =>
            `<a class="${l.code === DEFAULT ? "" : "g"}" href="/${l.code}/" hreflang="${l.tag}">${l.name}</a>`,
        ).join("\n        ")}
      </div>
    </div>
    <script>location.replace("/${DEFAULT}/" + location.search + location.hash);</script>`;

const notFoundBody = `
    <div class="b">
      <h1>404</h1>
      <p>Sivua ei löytynyt. Sidan hittades inte. Page not found.</p>
      <div class="l">
        ${LOCALES.map(
          (l) =>
            `<a class="${l.code === DEFAULT ? "" : "g"}" href="/${l.code}/" hreflang="${l.tag}">${l.name}</a>`,
        ).join("\n        ")}
      </div>
    </div>`;

async function main() {
  try {
    await access(OUT);
  } catch {
    console.error("postbuild: out/ does not exist. Run `npm run build` first.");
    process.exit(1);
  }

  await writeFile(
    join(OUT, "index.html"),
    shell(
      "Stellar Stack",
      rootBody,
      `<link rel="canonical" href="${SITE}/${DEFAULT}/">\n    ${alternates}\n    <meta http-equiv="refresh" content="0; url=/${DEFAULT}/">`,
    ),
    "utf8",
  );

  await writeFile(
    join(OUT, "404.html"),
    shell(
      "404 | Stellar Stack",
      notFoundBody,
      `<meta name="robots" content="noindex">`,
    ),
    "utf8",
  );

  console.log(
    "postbuild: wrote out/index.html (root redirect) and out/404.html",
  );
}

main();
