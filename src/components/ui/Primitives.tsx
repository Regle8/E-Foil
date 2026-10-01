import type { ReactNode } from "react";
import { cn, formatPrice } from "@/lib/format";
import { RiderMark } from "@/components/brand/RiderMark";

export function Eyebrow({ children, className, dot = false }: { children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-2.5", className)}>
      {dot ? <span className="size-1.5 animate-pulse-dot rounded-full bg-teal" aria-hidden /> : null}
      {children}
    </p>
  );
}

/** Infinite horizontal ticker. Content is rendered twice for a seamless loop. */
export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("relative flex overflow-hidden", className)} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
      <div className={cn("flex w-max shrink-0", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Price({
  pence,
  compareAt,
  className,
  from = false,
}: {
  pence: number;
  compareAt?: number | null;
  className?: string;
  from?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-2 tabular-nums", className)}>
      {from ? <span className="text-[0.7em] font-normal opacity-60">from</span> : null}
      <span>{formatPrice(pence)}</span>
      {compareAt ? (
        <s className="text-[0.75em] font-normal opacity-60" aria-label={`was ${formatPrice(compareAt)}`}>
          {formatPrice(compareAt)}
        </s>
      ) : null}
    </span>
  );
}

export function Badge({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" | "teal" | "ember" }) {
  const tones = {
    light: "bg-white text-ink",
    dark: "bg-ink text-bone",
    teal: "bg-teal text-ink",
    ember: "bg-ember text-ink",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em]", tones[tone])}>
      {children}
    </span>
  );
}

export function badgeTone(label: string): "light" | "dark" | "teal" | "ember" {
  if (/sale/i.test(label)) return "ember";
  if (/in stock|favourite|best/i.test(label)) return "teal";
  if (/sold/i.test(label)) return "dark";
  return "light";
}

export function RiderDivider({ className }: { className?: string }) {
  return <RiderMark className={cn("inline-block h-[0.8em] w-auto shrink-0", className)} />;
}

export function SectionIntro({
  eyebrow,
  title,
  body,
  className,
  align = "left",
  size = "lg",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  className?: string;
  align?: "left" | "center";
  /** Use "sm" when the intro sits in a narrow column. */
  size?: "lg" | "sm";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow className="mb-6 opacity-70">{eyebrow}</Eyebrow> : null}
      <h2 className={cn("display", size === "lg" ? "text-[clamp(2.25rem,5.2vw,4.75rem)]" : "text-[clamp(2rem,3.3vw,3.1rem)]")}>{title}</h2>
      {body ? <p className="mt-6 max-w-xl text-base leading-relaxed opacity-70 md:text-lg">{body}</p> : null}
    </div>
  );
}

export function Accordion({ items, tone = "dark" }: { items: { q: string; a: string }[]; tone?: "dark" | "light" }) {
  return (
    <div className={cn("divide-y border-y", tone === "dark" ? "divide-white/10 border-white/10" : "divide-ink/10 border-ink/10")}>
      {items.map((item) => (
        <details key={item.q} className="group faq">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-medium md:text-xl [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-full border transition-transform duration-500 ease-(--ease-expo) group-open:rotate-45",
                tone === "dark" ? "border-white/20" : "border-ink/20"
              )}
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="max-w-3xl pb-7 pr-12 leading-relaxed opacity-70">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
