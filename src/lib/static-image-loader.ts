// Image loader for the static GitHub Pages demo: no optimisation server, so serve the original file
// under the site's base path (remote images pass straight through).
export default function staticImageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}
