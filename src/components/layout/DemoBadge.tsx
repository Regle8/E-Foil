import { isDemo } from "@/lib/base-path";

/** Shown only on the static demo build, so visitors know bookings and checkout aren't live. */
export function DemoBadge() {
  if (!isDemo) return null;
  return (
    <div className="pointer-events-none fixed right-4 top-[5.25rem] z-[45] rounded-full md:right-6 md:top-[5.75rem] border border-white/15 bg-ink/80 px-4 py-2 text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone/80 shadow-2xl backdrop-blur-xl">
      <span className="mr-2 inline-block size-1.5 rounded-full bg-teal align-middle" aria-hidden />
      Demo preview · bookings &amp; checkout disabled
    </div>
  );
}
