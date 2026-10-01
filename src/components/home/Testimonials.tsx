"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Primitives";
import { cn } from "@/lib/format";

type Testimonial = { quote: string; name: string; place: string };

export function Testimonials({ items, tone = "light" }: { items: Testimonial[]; tone?: "light" | "dark" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 8000);
    return () => window.clearInterval(t);
  }, [paused, items.length]);

  const go = (dir: 1 | -1) => {
    setPaused(true);
    setIndex((i) => (i + dir + items.length) % items.length);
  };
  const item = items[index];
  const light = tone === "light";

  return (
    <section
      className={cn("py-24 md:py-36", light ? "bg-sand text-ink" : "bg-ink-2 text-bone")}
      aria-roledescription="carousel"
      aria-label="What riders say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow className={cn("mb-6", light ? "text-ink/65" : "text-bone/65")}>Riders say</Eyebrow>
          <p className={cn("max-w-xs text-sm leading-relaxed", light ? "text-ink/60" : "text-bone/60")}>
            Hundreds of riders have taken their first flight with Oly and the team. Here are a few of them.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className={cn(
                "grid size-12 place-items-center rounded-full border transition",
                light ? "border-ink/20 hover:bg-ink hover:text-bone" : "border-white/20 hover:bg-white hover:text-ink"
              )}
              aria-label="Previous testimonial"
            >
              <Icon name="arrowLeft" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={cn(
                "grid size-12 place-items-center rounded-full border transition",
                light ? "border-ink/20 hover:bg-ink hover:text-bone" : "border-white/20 hover:bg-white hover:text-ink"
              )}
              aria-label="Next testimonial"
            >
              <Icon name="arrowRight" className="size-4" />
            </button>
            <span className="ml-3 font-mono text-xs tabular-nums opacity-60">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative min-h-[22rem] lg:col-span-9 md:min-h-[20rem]">
          <span className="serif pointer-events-none absolute -left-2 -top-16 select-none text-[10rem] leading-none text-teal-deep/25 md:-top-24 md:text-[14rem]" aria-hidden>
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
            >
              <blockquote className="serif relative text-[clamp(1.7rem,3.3vw,3.1rem)] leading-[1.15]">{item.quote}</blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className={cn("grid size-12 place-items-center rounded-full text-sm font-semibold", light ? "bg-ink text-bone" : "bg-teal text-ink")}>
                  {item.name[0]}
                </span>
                <span>
                  <span className="block font-medium">{item.name}</span>
                  <span className={cn("block text-sm", light ? "text-ink/65" : "text-bone/65")}>{item.place}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
