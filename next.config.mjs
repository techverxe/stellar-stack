import { execSync } from "node:child_process";

/**
 * The build id, pinned to the commit rather than randomised.
 *
 * Next generates a random build id per build and embeds it in every page's
 * RSC payload. That makes the output non-reproducible: building the same
 * commit twice produces different bytes, so "the live site matches this
 * commit" cannot be checked by comparing bytes. It was only discoverable by
 * trying: a clean clone of the deployed commit differed from the live site on
 * all 99 routes, in exactly one field, while every visible byte matched.
 *
 * Pinned to the short commit SHA, this becomes a served-version signal. The
 * static export has no /api/version endpoint to interrogate, so the build id
 * is the closest equivalent, and it makes a rebuild of the same commit
 * byte-identical to what is deployed.
 *
 * Falls back to a fixed string outside a git checkout (a CI tarball, say) so
 * a build never fails for want of git.
 */
function buildId() {
  if (process.env.BUILD_ID) return process.env.BUILD_ID;
  try {
    return execSync("git rev-parse --short=12 HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "nogit";
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the web server serves plain files. No Node process in
  // production, which removes a whole class of runtime and patching risk for a
  // site with no database, no auth and no server-side logic.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  generateBuildId: buildId,
};
export default nextConfig;
