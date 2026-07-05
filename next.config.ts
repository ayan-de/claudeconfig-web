import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Marketing site is fully static — no SSR, no server runtime.
  // The /out directory is what gets deployed to GitHub Pages.
  output: "export",

  // Trailing slashes work better with GitHub Pages' path routing.
  trailingSlash: false,

  images: {
    // Static export requires unoptimized images; the logo is local and small.
    unoptimized: true,
  },

  // Disable powered-by header in production
  poweredByHeader: false,
};

export default nextConfig;