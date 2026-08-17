/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: nginx serves plain files. No Node process in production,
  // which removes a whole class of runtime and patching risk for a site with
  // no database, no auth and no server-side logic.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};
export default nextConfig;
