import type { Metadata } from "next";
import Image from "next/image";
import { Statement } from "@/components/home/Statement";
import { Testimonials } from "@/components/home/Testimonials";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink, ExternalLink } from "@/components/ui/Button";
import { Eyebrow, SectionIntro } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { community, story, team, testimonials } from "@/data/content";
import { videos } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Efoil London: our story, team and community",
  description:
    "Born from the lowest wind in 70 years. Meet Oly, Steve and Nikki, the team behind London's only e-foil destination and the UK's largest authorised LIFT eFoil retailer.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/photos/sunset-trio.webp"
        imageAlt="Three riders on eFoils at sunset"
        eyebrow="About Efoil London"
        lines={[
          "Born from",
          <span key="l" className="serif text-[1.15em] text-teal">
            a lack
          </span>,
          "of wind",
        ]}
        intro={
          <p>
            Windsurfers, kite foilers, wing foilers and surfers who got tired of waiting for the wind, and found the remarkable versatility of
            the LIFT eFoil.
          </p>
        }
      />

      <section className="bg-bone py-24 text-ink md:py-36">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="mb-8 text-ink/65">Our story</Eyebrow>
            </Reveal>
            <RevealLines
              className="display text-[clamp(2.2rem,4.6vw,4.4rem)]"
              lines={[
                "From Hayling",
                <span key="l">
                  to <span className="serif text-[1.12em] text-teal-deep">London</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.15} className="grid grid-cols-1 gap-6 text-lg leading-relaxed text-ink/75 lg:col-span-7">
            {story.origin.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <Statement video={videos.darkOcean} eyebrow={story.friday.title} lines={["That Friday", <span key="f" className="serif text-[1.1em] text-teal">feeling</span>]} body={story.friday.body} />

      <section className="bg-ink py-24 text-bone md:py-36">
        <div className="shell">
          <SectionIntro
            eyebrow="Meet the team"
            title={
              <>
                The people who&apos;ll get you <span className="serif text-[1.12em] text-teal">flying</span>
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <article>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-ink-3">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover grayscale-[35%] transition duration-[1.2s] ease-(--ease-expo) group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
                    <p className="eyebrow absolute bottom-5 left-5 text-bone/80">{m.role}</p>
                  </div>
                  <h3 className="display-tight mt-6 text-3xl">{m.name}</h3>
                  <div className="mt-4 grid grid-cols-1 gap-3 leading-relaxed text-bone/65">
                    {m.bio.map((b) => (
                      <p key={b}>{b}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      <section className="bg-bone py-24 text-ink md:py-32">
        <div className="shell grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Reveal className="rounded-[1.75rem] bg-ink p-8 text-bone md:p-10">
            <Eyebrow className="mb-6 text-teal">Distribution HQ</Eyebrow>
            <p className="display-tight text-2xl">London&apos;s LIFT eFoil distribution centre</p>
            <p className="mt-4 leading-relaxed text-bone/65">
              The distribution centre and online shop for Efoil London and Efoil Hayling Island: London&apos;s authorised LIFT Foils retailer
              for every LIFT eFoil and the LIFT Classic range.
            </p>
            <address className="mt-6 not-italic text-bone/80">
              {site.hq.line1}, {site.hq.town}, {site.hq.postcode}
            </address>
            <dl className="mt-6 grid grid-cols-1 gap-1.5 text-sm text-bone/70">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-1.5">
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[1.75rem] border border-ink/10 bg-white/70 p-8 md:p-10">
            <Eyebrow className="mb-6 text-ink/65">The community</Eyebrow>
            <p className="display-tight text-2xl">The UK&apos;s largest e-foil community</p>
            <p className="mt-4 leading-relaxed text-ink/65">{community.facebook}</p>
            <p className="mt-4 leading-relaxed text-ink/65">{community.whatsapp}</p>
            <ExternalLink href={site.socials.facebook} variant="ghost-dark" className="mt-8">
              Join the Facebook group
            </ExternalLink>
          </Reveal>
          <Reveal delay={0.16} className="flex flex-col rounded-[1.75rem] border border-ink/10 bg-white/70 p-8 md:p-10">
            <Eyebrow className="mb-6 text-ink/65">Protecting our playground</Eyebrow>
            <p className="display-tight text-2xl">Part of the Ocean Network</p>
            <p className="mt-4 leading-relaxed text-ink/65">
              eFoils are among the most versatile and environmentally friendly powered watercraft, and we&apos;re proud to be part of Surfers
              Against Sewage&apos;s Ocean Network.
            </p>
            <Image
              src="/brand/ocean-network.webp"
              alt="Surfers Against Sewage Ocean Network"
              width={900}
              height={291}
              className="mt-auto w-48 pt-8"
            />
          </Reveal>
        </div>
        <div className="shell mt-16 flex flex-wrap gap-3">
          <ButtonLink href="/lessons" variant="ink" size="lg">
            Book a lesson
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost-dark" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
