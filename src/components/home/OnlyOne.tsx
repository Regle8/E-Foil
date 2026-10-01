import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { stats } from "@/data/content";
import { site } from "@/lib/site";

export function OnlyOne() {
  return (
    <section className="relative overflow-hidden bg-bone py-24 text-ink md:py-36">
      <div className="shell">
        <Reveal>
          <Eyebrow className="mb-8 text-ink/65">The only one</Eyebrow>
        </Reveal>
        <RevealLines
          className="display text-[clamp(1.65rem,6.3vw,6.75rem)]"
          lines={[
            "There's one place",
            "in London where",
            <span key="line-0">
              you can <span className="serif text-[1.12em] text-teal-deep">fly</span> on water
            </span>,
          ]}
        />
      </div>
      <div className="shell mt-14 grid grid-cols-1 gap-14 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal delay={0.2} className="grid grid-cols-1 max-w-xl gap-6 text-base leading-relaxed text-ink/70 md:text-lg">
            <p>
              Efoil London holds exclusive e-foil access to the Queen Mother Reservoir in Datchet: 475 acres of sheltered flat water, 15
              minutes from the city and 10 from Heathrow, with Windsor Castle on the horizon.
            </p>
            <p>
              Every lesson and free-ride session is booked through us. No tides, no swell and no compromise: just glassy water and the
              quietest, smoothest eFoils on the planet.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/london" variant="ink" size="lg">
              Discover the reservoir
            </ButtonLink>
            <ButtonLink href="/lessons" variant="ghost-dark" size="lg">
              See lessons
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6">
          <figure className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink sm:aspect-[16/12]">
            <Image
              src="/images/photos/reservoir-aerial.webp"
              alt="Satellite view of Queen Mother Reservoir near Datchet"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="scale-[1.08] object-cover transition-transform duration-[2.5s] ease-(--ease-expo) group-hover:scale-[1.14]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" aria-hidden />
            <div className="absolute left-[25%] top-[46%] -translate-x-1/2 -translate-y-1/2 sm:left-[34%]" aria-hidden>
              <span className="relative flex size-4">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal opacity-70" />
                <span className="relative inline-flex size-4 rounded-full border-2 border-white bg-teal" />
              </span>
            </div>
            <figcaption className="absolute inset-x-0 top-0 flex items-start justify-between p-6 text-bone">
              <span className="eyebrow">{site.reservoir.coords}</span>
              <span className="eyebrow rounded-full border border-white/30 px-3 py-1.5 backdrop-blur-md">Exclusive</span>
            </figcaption>
            <div className="absolute inset-x-0 bottom-0 p-6 text-bone">
              <p className="display-tight text-2xl md:text-3xl">{site.reservoir.name}</p>
              <p className="mt-2 text-sm text-bone/70">Datchet · Windsor · 10 minutes from Heathrow</p>
            </div>
          </figure>
        </Reveal>
      </div>

      <div className="shell mt-20 md:mt-28">
        <dl className="grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-b border-ink/15 py-8 pr-6 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:not(:first-child)]:pl-8">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="display flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[clamp(2.6rem,6vw,5.5rem)]">
                  <CountUp value={Number(s.value)} />
                  <span className="font-mono text-sm font-normal tracking-[0.2em] text-ink/60">{s.unit}</span>
                </span>
                <span className="mt-3 block max-w-[15rem] text-sm leading-snug text-ink/60">{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
