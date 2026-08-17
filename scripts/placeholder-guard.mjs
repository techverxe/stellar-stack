#!/usr/bin/env node
/**
 * Release gate. Scans the PRODUCTION build output for PLACEHOLDER_ sentinels
 * and for dev-only hosts, and exits non-zero if any survive.
 *
 * Why the build output and not the source: an earlier assumption was that an
 * unrendered field could not reach users. The guard proved that wrong. The
 * whole content module is bundled regardless of which fields a component
 * reads, so reaching a user's screen was never the test. Reaching the build
 * output is.
 *
 * This is deliberately NOT wired into ordinary CI. The Y-tunnus cannot clear
 * until the client supplies it, so running the full scan on every change would
 * make green impossible, and a permanently red pipeline teaches everyone to
 * ignore red. The self-test runs always; the full scan gates release.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.argv[2] ?? "out";
const PATTERNS = [
  { re: /PLACEHOLDER_[A-Z0-9_-]*/g, why: "unresolved placeholder value" },
  { re: /https?:\/\/localhost(:\d+)?/g, why: "localhost URL in shipped output" },
  { re: /127\.0\.0\.1(:\d+)?/g, why: "loopback address in shipped output" },
];
const EXT = new Set([".html", ".js", ".css", ".xml", ".txt", ".json"]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (EXT.has(extname(p))) out.push(p);
  }
  return out;
}

export function scan(root) {
  const hits = [];
  for (const file of walk(root)) {
    const text = readFileSync(file, "utf8");
    for (const { re, why } of PATTERNS) {
      const found = text.match(re);
      if (found) hits.push({ file, why, sample: [...new Set(found)].slice(0, 3) });
    }
  }
  return hits;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let hits;
  try {
    hits = scan(ROOT);
  } catch (err) {
    console.error(`guard: cannot read build output at "${ROOT}". Run the build first.`);
    console.error(String(err.message ?? err));
    process.exit(2);
  }
  if (hits.length === 0) {
    console.log(`guard: clean. No placeholders or dev hosts in ${ROOT}.`);
    process.exit(0);
  }
  console.error(`guard: NOT RELEASABLE. ${hits.length} finding(s) in ${ROOT}:\n`);
  for (const h of hits) console.error(`  ${h.file}\n    ${h.why}: ${h.sample.join(", ")}`);
  console.error("\nThis is the guard doing its job. Supply the real value, do not delete the check.");
  process.exit(1);
}
