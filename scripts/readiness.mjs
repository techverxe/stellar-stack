#!/usr/bin/env node
/**
 * Launch readiness, reported not enforced.
 *
 * The output guard (`npm run guard`) blocks a placeholder from SHIPPING.
 * This reports data that is still missing but is not itself a shipping
 * defect, so the site can go live while the gap stays visible instead of
 * being quietly forgotten once the sentinel stops appearing on screen.
 */
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/content/business.ts", import.meta.url), "utf8");
const open = [
  ...[...src.matchAll(/(\w+):\s*"(PLACEHOLDER_[^"]*)"/g)].map((m) => m[1]),
  ...[...src.matchAll(/(\w+):\s*null as/g)].map((m) => m[1]),
];

if (open.length === 0) {
  console.log("readiness: all business facts resolved.");
  process.exit(0);
}
console.log(`readiness: ${open.length} unresolved business fact(s): ${open.join(", ")}`);
console.log("The site is deployable. These remain open and are NOT shown on the live site.");
process.exit(0);
