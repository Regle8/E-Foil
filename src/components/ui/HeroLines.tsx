import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/format";

/** Masked line-by-line headline reveal using CSS only, for above-the-fold heroes. */
export function HeroLines({
  lines,
  className,
  as: Tag = "h1",
  delay = 0.1,
  stagger = 0.11,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
  stagger?: number;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.06em] block overflow-hidden pb-[0.06em]">
          <span className="hero-rise block" style={{ animationDelay: `${delay + i * stagger}s` } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** CSS entrance for hero copy/CTAs. `lift` moves without fading so the element counts as painted immediately. */
export function HeroIn({
  children,
  delay = 0,
  mode = "fade",
  className,
}: {
  children: ReactNode;
  delay?: number;
  mode?: "fade" | "lift";
  className?: string;
}) {
  return (
    <div className={cn(mode === "fade" ? "hero-fade" : "hero-lift", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
