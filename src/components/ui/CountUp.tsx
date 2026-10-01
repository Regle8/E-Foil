"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({
  value,
  className,
  duration = 1.8,
  grouping = true,
}: {
  value: number;
  className?: string;
  duration?: number;
  /** Thousands separators (off for years). */
  grouping?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-GB", { useGrouping: grouping });
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce, grouping]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-GB", { useGrouping: grouping })}
    </span>
  );
}
