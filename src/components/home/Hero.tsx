import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Primitives";
import { HeroIn, HeroLines } from "@/components/ui/HeroLines";
import { videos } from "@/lib/media";
import { site } from "@/lib/site";

const highlights = [
  { k: "Exclusive access", v: "Queen Mother Reservoir" },
  { k: "15 min", v: "from London" },
  { k: "Lessons from", v: "£150" },
  { k: "Authorised", v: "LIFT Foils dealer" },
];

export function Hero() {
  return (
    <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-bone">
      <BackgroundVideo
        video={videos.hero}
        priority
        controls
        controlsClassName="bottom-[10.25rem] right-[clamp(1.25rem,4vw,4rem)] md:bottom-28"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/5 to-ink/95" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/10 to-transparent" aria-hidden />

      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-12 pt-32 md:pb-16">
        <HeroIn delay={0.05}>
          <Eyebrow dot className="mb-7 text-bone/85 md:mb-9">
            {site.reservoir.name} · {site.reservoir.place}
            <span className="hidden sm:inline"> · {site.reservoir.coords}</span>
          </Eyebrow>
        </HeroIn>
        <HeroLines
          delay={0.12}
          stagger={0.11}
          className="display text-[clamp(2.55rem,8.3vw,9.4rem)] leading-[0.86]"
          lines={[
            "London's only",
            <span key="efoil" className="serif block pb-[0.08em] text-[1.18em] leading-[0.82] tracking-[-0.03em] text-teal">
              e-foil
            </span>,
            "destination",
          ]}
        />
        <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <HeroIn delay={0.3} mode="lift" className="max-w-[34rem]">
            <p className="text-base leading-relaxed text-bone/80 md:text-lg">
              Exclusive e-foil access to 475 acres of flat water, 15 minutes from London, in the shadow of Windsor Castle. Fly silently.
              Feel weightless. Book your first flight with the UK&apos;s largest LIFT eFoil centre.
            </p>
          </HeroIn>
          <HeroIn delay={0.5} className="flex flex-wrap gap-3">
            <ButtonLink href="/lessons" size="lg">
              Book your first flight
            </ButtonLink>
            <ButtonLink href="/shop" size="lg" variant="ghost">
              Shop LIFT eFoils
            </ButtonLink>
          </HeroIn>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/15 bg-ink/30 backdrop-blur-md">
        <dl className="shell grid grid-cols-2 md:grid-cols-4">
          {highlights.map((h, i) => (
            <div
              key={h.k}
              className={
                "flex flex-col gap-1 py-4 md:py-5 " +
                (i % 2 === 1 ? "border-l border-white/15 pl-5 md:pl-6 " : "md:pl-6 ") +
                (i >= 2 ? "border-t border-white/15 md:border-t-0 " : "") +
                (i === 2 ? "md:border-l md:border-white/15 " : "") +
                (i === 0 ? "md:pl-0" : "")
              }
            >
              <dt className="eyebrow text-bone/65">{h.k}</dt>
              <dd className="text-sm font-medium md:text-base">{h.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
