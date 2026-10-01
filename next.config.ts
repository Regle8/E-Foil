import type { NextConfig } from "next";

// Old Squarespace URLs -> new routes, so existing links and search rankings carry over.
const legacyProducts: Record<string, string> = {
  "/shop-lift-efoils/p/lift5-44-pro-efoil": "/shop/lift5-4-4-pro",
  "/shop-lift-efoils/p/lift5-49-sport": "/shop/lift5-4-9-sport",
  "/shop-lift-efoils/p/lift5-cruiser-54": "/shop/lift5-5-4-cruiser",
  "/shop-lift-efoils/p/liftx-43-efoil": "/shop/liftx-4-3",
  "/shop-lift-efoils/p/liftx-48-efoil": "/shop/liftx-4-8",
  "/shop-lift-efoils/p/liftx-52-efoil": "/shop/liftx-5-2",
  "/shop-lift-efoils/p/efoil-4-bc594": "/shop/lift4-4-2-pro",
  "/shop-lift-efoils/p/49-sport-efoil-jgz5p": "/shop/lift4-4-9-sport",
  "/shop-lift-efoils/p/54-cruiser-efoil-5sck9": "/shop/lift4-5-4-cruiser",
  "/shop-lift-efoils/p/lift3-f-49-sport-efoil": "/shop/lift3-f-4-9-sport",
  "/shop-lift-efoils/p/lift3-f-54-sport-efoil": "/shop/lift3-f-5-4-cruiser",
  "/shop-efoil-accessories/p/full-range-efoil-battery": "/shop/full-range-battery",
  "/shop-efoil-accessories/p/lcs-lift-jet-uk": "/shop/lcs-lift-jet",
  "/shop-efoil-wings/p/21-florence": "/shop/21-florence-x",
};

const serverConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async headers() {
    return [
      {
        source: "/video/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [
      ...Object.entries(legacyProducts).map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/home", destination: "/", permanent: true },
      { source: "/lift-efoils-lift5", destination: "/lift5", permanent: true },
      { source: "/lift-efoils-liftx", destination: "/liftx", permanent: true },
      { source: "/lift-efoils-liftX", destination: "/liftx", permanent: true },
      { source: "/lift-efoil-shop", destination: "/shop", permanent: true },
      { source: "/shop-lift-efoils/:rest*", destination: "/shop?category=efoils", permanent: true },
      { source: "/shop-lift-efoils", destination: "/shop?category=efoils", permanent: true },
      { source: "/shop-efoil-wings/p/:slug", destination: "/shop/:slug", permanent: true },
      { source: "/shop-efoil-wings/:rest*", destination: "/shop?category=wings", permanent: true },
      { source: "/shop-efoil-accessories/p/:slug", destination: "/shop/:slug", permanent: true },
      { source: "/shop-efoil-accessories/:rest*", destination: "/shop?category=accessories", permanent: true },
      { source: "/shop-second-hand-efoils", destination: "/used", permanent: true },
      { source: "/lessons/p/:slug", destination: "/shop/:slug", permanent: true },
      { source: "/what-are-efoils", destination: "/what-is-an-efoil", permanent: true },
      { source: "/about-efoil-london", destination: "/about", permanent: true },
      { source: "/about-1", destination: "/about", permanent: true },
      { source: "/terms-conditions", destination: "/terms", permanent: true },
    ];
  },
};

// GITHUB_PAGES=true builds a static demo of the site for GitHub Pages. There is no server there, so
// forms are swapped for a demo stub, images are served as-is under the repo sub-path, and
// redirects/headers are dropped (static hosting can't apply them). The normal build is untouched.
const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";
const pagesConfig: NextConfig = {
  output: "export",
  basePath: pagesBasePath,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: pagesBasePath, NEXT_PUBLIC_DEMO: "1" },
  images: { loader: "custom", loaderFile: "./src/lib/static-image-loader.ts" },
  turbopack: { resolveAlias: { "@/app/actions": "./src/demo/actions.ts" } },
};

export default process.env.GITHUB_PAGES === "true" ? pagesConfig : serverConfig;
