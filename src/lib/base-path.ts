// Prefix for raw asset URLs (video files, SVG sprite) when the site is served from a sub-path,
// e.g. the GitHub Pages demo. next/link and next/image handle this themselves.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const isDemo = process.env.NEXT_PUBLIC_DEMO === "1";

export function withBase(path: string) {
  return path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
}
