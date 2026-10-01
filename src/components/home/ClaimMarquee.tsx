import { Fragment } from "react";
import { RiderMark } from "@/components/brand/RiderMark";
import { Marquee } from "@/components/ui/Primitives";
import { cn } from "@/lib/format";

const items = [
  "London's only e-foil destination",
  "Queen Mother Reservoir",
  "15 minutes from London",
  "Windsor Castle views",
  "UK's largest LIFT dealer",
  "Lessons from £150",
];

export function ClaimMarquee({ className }: { className?: string }) {
  return (
    <section aria-label="Highlights" className={cn("border-y border-white/10 bg-ink py-7 text-bone md:py-9", className)}>
      <Marquee duration={55}>
        {items.map((item, i) => (
          <Fragment key={item}>
            <span className={cn("display px-6 text-[clamp(1.6rem,3.6vw,3.25rem)] md:px-10", i % 2 === 1 && "text-outline text-bone/80")}>
              {item}
            </span>
            <RiderMark className="h-[clamp(1.6rem,3.2vw,3rem)] w-auto shrink-0 text-teal" />
          </Fragment>
        ))}
      </Marquee>
    </section>
  );
}
