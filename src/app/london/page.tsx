import type { Metadata } from "next";
import Image from "next/image";
import { Statement } from "@/components/home/Statement";
import { PageHero } from "@/components/layout/PageHero";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink, ExternalLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, SectionIntro } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { locations } from "@/data/content";
import { videos } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Queen Mother Reservoir: London's only e-foil destination",
  description:
    "E-foil in London at Queen Mother Reservoir, Datchet. Exclusive e-foil access to 475 acres of sheltered flat water, 15 minutes from London and 10 from Heathrow. Plus our coastal centre on Hayling Island.",
  alternates: { canonical: "/london" },
};

const numbers = [
  { value: 475, unit: "acres", label: "of water to fly over" },
  { value: 2, unit: "km", label: "long, and over 1km wide" },
  { value: 15, unit: "min", label: "from London" },
  { value: 1976, unit: "", label: "opened by HM Queen Elizabeth, the Queen Mother" },
];

const facilities = [
  { icon: "wave" as const, title: "Flat water, whatever the weather", body: "The reservoir's enclosed surroundings keep the water sheltered and glassy: perfect for learning." },
  { icon: "shield" as const, title: "Exclusive access", body: "Efoil London is the only e-foil operator at the reservoir. Lessons and free-ride sessions are pre-booked through us." },
  { icon: "sparkle" as const, title: "Proper facilities", body: "Large changing rooms with warm showers, a canteen, a lounge and a big astroturf rigging area." },
  { icon: "pin" as const, title: "Easy to reach", body: "15 minutes from London and 10 from Heathrow, nestled in the shadow of Windsor Castle." },
];

export default function LondonPage() {
  const { london, hayling } = locations;
  return (
    <>
      <PageHero
        video={videos.aerialFormation}
        eyebrow={`${site.reservoir.name} · ${site.reservoir.place} · ${site.reservoir.coords}`}
        lines={[
          "The only place",
          <span key="to" className="serif text-[1.15em] text-teal">
            to e-foil
          </span>,
          "in London",
        ]}
        intro={
          <p>
            Exclusive e-foil access to 475 acres of sheltered water at the Queen Mother Reservoir: 15 minutes from London, 10 from
            Heathrow, with Windsor Castle on the horizon.
          </p>
        }
      >
        <ButtonLink href="/lessons" size="lg">
          Book a session
        </ButtonLink>
        <ExternalLink href={site.reservoir.mapsUrl} size="lg">
          Open in Maps
        </ExternalLink>
      </PageHero>

      <section className="bg-bone py-24 text-ink md:py-32">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow className="mb-8 text-ink/65">London&apos;s e-foil centre</Eyebrow>
              </Reveal>
              <RevealLines
                className="display text-[clamp(1.9rem,4.1vw,4.1rem)]"
                lines={[
                  "One of the largest",
                  "inland waters",
                  <span key="se">
                    in <span className="serif text-[1.12em] text-teal-deep">Southern</span> England
                  </span>,
                ]}
              />
            </div>
            <Reveal delay={0.15} className="grid grid-cols-1 content-end gap-5 text-lg leading-relaxed text-ink/70 lg:col-span-5">
              <p>
                Opened in 1976 by Her Majesty Queen Elizabeth, the Queen Mother, the reservoir covers 475 acres (1.92 km²): almost two
                kilometres long and over a kilometre wide.
              </p>
              <p>It&apos;s open to sailors, windsurfers, wing foilers and paddleboarders, and for e-foiling it&apos;s exclusively ours.</p>
            </Reveal>
          </div>

          <Reveal className="mt-16 md:mt-24">
            <figure className="relative overflow-hidden rounded-[2rem]">
              <Image
                src={london.image}
                alt="Panorama of the Queen Mother Reservoir and its sailing club on a clear day"
                width={2000}
                height={678}
                sizes="100vw"
                className="h-auto w-full"
              />
              <figcaption className="absolute bottom-5 left-5 rounded-full bg-ink/60 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-bone backdrop-blur-md">
                Queen Mother Reservoir · Datchet
              </figcaption>
            </figure>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-ink/15 pt-12 lg:grid-cols-4">
            {numbers.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.06}>
                <dt className="sr-only">{n.label}</dt>
                <dd>
                  <span className="display flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[clamp(2.6rem,5vw,4.8rem)]">
                    {n.unit ? <CountUp value={n.value} /> : <span>{n.value}</span>}
                    {n.unit ? <span className="font-mono text-sm font-normal tracking-[0.2em] text-ink/60">{n.unit}</span> : null}
                  </span>
                  <span className="mt-2 block max-w-[14rem] text-sm text-ink/60">{n.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ink py-24 text-bone md:py-32">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image src={london.aerial} alt="Satellite view of Queen Mother Reservoir" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden />
              <div className="absolute left-[34%] top-[46%] -translate-x-1/2 -translate-y-1/2" aria-hidden>
                <span className="relative flex size-4">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal opacity-70" />
                  <span className="relative inline-flex size-4 rounded-full border-2 border-white bg-teal" />
                </span>
              </div>
              <p className="eyebrow absolute bottom-6 left-6 text-bone/80">{site.reservoir.coords}</p>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:pl-8">
            <SectionIntro
              eyebrow="Why it works"
              title={
                <>
                  Made for <span className="serif text-[1.12em] text-teal">learning</span>
                </>
              }
            />
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {facilities.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <span className="grid size-11 place-items-center rounded-full border border-white/15 text-teal">
                    <Icon name={f.icon} className="size-5" />
                  </span>
                  <h3 className="display-tight mt-5 text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/60">{f.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Statement
        video={videos.sunsetSilhouette}
        eyebrow="No wind? No waves? No problem."
        lines={[
          "Glassy water,",
          <span key="m" className="serif text-[1.1em] text-teal">
            minutes from
          </span>,
          "the city",
        ]}
        body="No tides to check and no swell to wait for: just sheltered, flat water 15 minutes from London, whatever the weather."
      >
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/lessons" size="lg">
            Book your first flight
          </ButtonLink>
        </div>
      </Statement>

      <section id="hayling" className="scroll-mt-16 bg-bone py-24 text-ink md:py-32">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow className="mb-8 text-ink/65">Our coastal centre · {hayling.place}</Eyebrow>
              </Reveal>
              <RevealLines
                className="display text-[clamp(2.2rem,5vw,4.8rem)]"
                lines={[
                  "And when you're",
                  <span key="r">
                    ready for <span className="serif text-[1.12em] text-teal-deep">waves</span>
                  </span>,
                ]}
              />
            </div>
            <Reveal delay={0.1} className="text-lg leading-relaxed text-ink/70 lg:col-span-5">
              {hayling.summary} It&apos;s where Efoil London began, and where our Wave Rider lessons run.
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-ink">
                <BackgroundVideo video={videos.coastRide} sizes="(min-width: 1024px) 58vw, 100vw" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-ink lg:aspect-auto lg:h-full">
                <Image src={hayling.aerial} alt="The West Winner sandbar off Hayling Island from above" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>

          <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-5 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {hayling.facts.map((f) => (
              <li key={f} className="flex items-start gap-3 text-ink/75">
                <Icon name="check" className="mt-0.5 size-5 shrink-0 text-teal-deep" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/shop/wave-rider-lesson" variant="ink" size="lg">
              Wave Rider lesson
            </ButtonLink>
            <ExternalLink href={site.hayling.mapsUrl} variant="ghost-dark" size="lg">
              Hayling Island in Maps
            </ExternalLink>
          </div>
        </div>
      </section>
    </>
  );
}
