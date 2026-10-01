import type { Metadata } from "next";
import Image from "next/image";
import { Statement } from "@/components/home/Statement";
import { PageHero } from "@/components/layout/PageHero";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionIntro } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { tech } from "@/data/content";
import { videos } from "@/lib/media";

export const metadata: Metadata = {
  title: "What is an eFoil? How LIFT eFoils work",
  description:
    "An eFoil is a board on an electric hydrofoil that lifts you silently above the water. How LIFT eFoils work: batteries, Quiet Ride motors, the Lift Connect System and the Elite controller.",
  alternates: { canonical: "/what-is-an-efoil" },
};

const anatomy = [
  {
    image: "/images/products/elite-controller.webp",
    title: "The controller",
    body: "Waterproof to IP68 with Bluetooth 5 and a full-colour display. Squeeze the trigger to accelerate, and adjust your board's settings on the fly while tracking live speed and distance.",
  },
  {
    image: "/images/shop/full-range-battery/1.webp",
    title: "The battery",
    body: "An advanced lithium-ion battery powers the motor. The Full Range battery rides for up to two hours, the Light battery up to one, and they're interchangeable across every LIFT generation.",
  },
  {
    image: "/images/products/propeller-on-mast.webp",
    title: "The motor & propeller",
    body: "A silent electric motor mounted on an all-carbon hydrofoil, with enough power to pull two riders. Click-and-lock fixed, folding and Jet propellers swap in seconds.",
  },
];

export default function WhatIsAnEfoilPage() {
  return (
    <>
      <PageHero
        video={videos.underwaterFoil}
        eyebrow="eFoiling explained"
        lines={[
          "What is",
          <span key="a" className="serif text-[1.15em] text-teal">
            an eFoil?
          </span>,
        ]}
        intro={
          <p>
            An eFoil pairs a board with an electric hydrofoil. As you gain speed, the foil lifts you above the surface for a silent,
            weightless sensation of flight, on any flat water and with no waves or wind needed.
          </p>
        }
      >
        <ButtonLink href="/lessons" size="lg">
          Try it yourself
        </ButtonLink>
      </PageHero>

      <section className="bg-bone py-24 text-ink md:py-32">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionIntro
              eyebrow="How it works"
              title={
                <>
                  Silent, electric, <span className="serif text-[1.12em] text-teal-deep">airborne</span>
                </>
              }
              body="The rider stands on the board and controls speed with a wireless hand controller. At low speed you cruise on the surface; add a little power and the hydrofoil's wing generates lift, raising the board clear of the water. Drag drops away and the ride turns smooth, quiet and effortless."
            />
            <Reveal delay={0.2} className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
              Whether you&apos;re a complete beginner or an expert chasing new challenges, eFoiling transforms the way you experience lakes,
              rivers and the ocean.
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink">
              <BackgroundVideo video={videos.lessonFlight} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24 text-ink md:py-32">
        <div className="shell">
          <SectionIntro eyebrow="Anatomy of a LIFT" title="Three key parts" />
          <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
            {anatomy.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <article className="h-full rounded-[1.75rem] bg-bone p-6">
                  <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-white">
                    <Image src={a.image} alt={a.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain p-8 mix-blend-multiply" />
                  </div>
                  <h3 className="display-tight mt-6 text-2xl">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/65">{a.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-bone md:py-32">
        <div className="shell">
          <SectionIntro
            eyebrow="LIFT technology"
            title={
              <>
                Why riders choose <span className="serif text-[1.12em] text-teal">LIFT</span>
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
            {[videos.lcsLift5, videos.batteryXray, videos.underwaterFoil].map((v, i) => (
              <Reveal key={v.src} delay={i * 0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-3">
                  <BackgroundVideo video={v} sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {tech.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05}>
                <span className="font-mono text-sm text-teal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display-tight mt-4 text-2xl">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-bone/60">{t.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap gap-3">
            <ButtonLink href="/lift5" variant="light">
              Explore LIFT5
            </ButtonLink>
            <ButtonLink href="/liftx" variant="ghost">
              Explore LIFTX
            </ButtonLink>
          </div>
        </div>
      </section>

      <Statement
        video={videos.sunsetDuo}
        eyebrow="Start your eFoil journey"
        lines={[
          "Be warned:",
          <span key="w" className="serif text-[1.1em] text-teal">
            it&apos;s addictive
          </span>,
        ]}
        body="Curious about LIFT, or ready for your first lesson? We're here to help, at London's only e-foil destination."
      >
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/lessons" size="lg">
            Book a lesson
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="ghost">
            Get in touch
          </ButtonLink>
        </div>
        <Eyebrow className="mt-10 justify-center text-bone/60">You must be medically fit to take part</Eyebrow>
      </Statement>
    </>
  );
}
