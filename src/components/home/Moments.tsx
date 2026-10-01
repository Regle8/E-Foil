"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { Eyebrow } from "@/components/ui/Primitives";
import { cn } from "@/lib/format";
import { videos } from "@/lib/media";

const moments = [
  { video: videos.beachWalk, title: "Board under arm", caption: "The walk down to the water never gets old." },
  { video: videos.aerialFormation, title: "Ride together", caption: "No wind, no waves. Pick a line and go." },
  { video: videos.underwaterFoil, title: "Silent glide", caption: "Beneath you, the foil does all the work." },
  { video: videos.packing, title: "Click and go", caption: "Lift Connect System: no tools, no wires." },
  { video: videos.openOcean, title: "Open water", caption: "Cruise lakes, rivers and coastline in a whole new way." },
  { video: videos.coastRide, title: "Just cruising", caption: "Up to two hours of riding per charge." },
  { video: videos.sunsetDuo, title: "Golden hour", caption: "That Friday 5pm feeling, any day of the week." },
];

/** Horizontal, scroll-driven video reel (pinned on desktop, swipeable on touch). */
export function Moments() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      setPinned(mq.matches && !reduce);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={section}
      className="relative bg-ink text-bone"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
      aria-label="Moments on the water"
    >
      <div className={cn(pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" : "py-24 md:py-32")}>
        <div className="shell mb-10 flex items-end justify-between gap-8 md:mb-14">
          <div>
            <Eyebrow className="mb-5 text-bone/65">Moments on the water</Eyebrow>
            <h2 className="display text-[clamp(2.2rem,5vw,4.8rem)]">
              Life, <span className="serif text-[1.12em] text-teal">elevated</span>
            </h2>
          </div>
          {pinned ? (
            <div className="hidden w-48 lg:block" aria-hidden>
              <div className="h-px w-full bg-white/15">
                <motion.div className="h-px bg-teal" style={{ width: progress }} />
              </div>
              <p className="eyebrow mt-3 text-bone/60">Scroll to explore</p>
            </div>
          ) : null}
        </div>
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          tabIndex={pinned ? undefined : 0}
          role={pinned ? undefined : "region"}
          aria-label={pinned ? undefined : "Moments on the water, scroll sideways"}
          className={cn(
            "flex gap-4 md:gap-5",
            pinned
              ? "w-max px-[clamp(1.25rem,4vw,4rem)]"
              : "no-scrollbar snap-x snap-mandatory overflow-x-auto px-[clamp(1.25rem,4vw,4rem)] pb-2"
          )}
        >
          {moments.map((m, i) => (
            <figure
              key={m.title}
              className={cn(
                "relative shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-ink-3",
                i % 3 === 1 ? "aspect-[4/5] w-[78vw] sm:w-[46vw] lg:w-[30vw]" : "aspect-[4/5] w-[78vw] sm:w-[46vw] lg:aspect-[16/11] lg:w-[44vw]"
              )}
            >
              <BackgroundVideo video={m.video} sizes="(min-width: 1024px) 44vw, 80vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" aria-hidden />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                <span className="font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</span>
                <p className="display-tight mt-2 text-2xl md:text-3xl">{m.title}</p>
                <p className="mt-2 max-w-sm text-sm text-bone/70">{m.caption}</p>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
