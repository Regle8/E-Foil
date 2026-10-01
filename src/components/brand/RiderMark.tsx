// Efoil London rider silhouette (traced from the original logo). The path lives in a cached SVG sprite
// so the many marks across a page don't each inline ~12KB of path data.
export function RiderMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 810 950" className={className} fill="currentColor" role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <use href="/brand/rider-sprite.svg#rider" />
    </svg>
  );
}
