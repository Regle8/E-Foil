import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { lessonMedia } from "@/components/home/Experiences";
import { Locations } from "@/components/home/Locations";
import { PageHero } from "@/components/layout/PageHero";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Accordion, Badge, Eyebrow, Price, SectionIntro } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { faqs, lessonIncludes, lessonRequirements } from "@/data/content";
import { getProducts } from "@/lib/catalog";
import { videos } from "@/lib/media";
import { site } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "eFoil Lessons in London & Hayling Island",
  description:
    "Learn to e-foil at Queen Mother Reservoir, London's only e-foil destination, or on Hayling Island. Kit, tuition, insurance and a two-way helmet intercom included. Lessons from £150.",
  alternates: { canonical: "/lessons" },
};

const steps = [
  { title: "Book online", body: "Choose your lesson and preferred centre, then place your booking in a couple of minutes. No experience needed." },
  {
    title: "We confirm your date",
    body: "We'll be in touch to lock in a session. Every session is pre-booked, and we'll move it if the conditions aren't right.",
  },
  {
    title: "Brief, kit up, fly",
    body: "A safety briefing and short on-land drills, then out on the water with your instructor coaching you live through your helmet.",
  },
];

export default async function LessonsPage() {
  const lessons = await getProducts({ category: "lessons" });

  return (
    <>
      <PageHero
        video={videos.lessonFlight}
        eyebrow="Lessons · Queen Mother Reservoir & Hayling Island"
        lines={[
          "Learn to",
          <span key="fly" className="serif text-[1.15em] text-teal">
            fly
          </span>,
          "on water",
        ]}
        intro={
          <p>
            No experience needed. eFoil kit, expert tuition, safety equipment, insurance and a two-way helmet intercom are all included.
            Lessons start from £150, at London&apos;s only e-foil destination.
          </p>
        }
      >
        <ButtonLink href="#lessons" size="lg">
          Choose your lesson
        </ButtonLink>
        <ButtonLink href={site.phone.href} size="lg" variant="ghost" icon="phone">
          {site.phone.display}
        </ButtonLink>
      </PageHero>

      <section id="lessons" className="scroll-mt-16 bg-bone py-24 text-ink md:py-32">
        <div className="shell">
          <SectionIntro
            eyebrow="Four ways to ride"
            title={
              <>
                Pick your <span className="serif text-[1.12em] text-teal-deep">session</span>
              </>
            }
            body="From your very first flight to riding the Hayling sandbar wave unpowered. Every lesson is coached 1-2-1 over a helmet intercom."
          />
          <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:gap-8">
            {lessons.map((lesson, i) => {
              const m = lessonMedia[lesson.slug] ?? { image: lesson.images[0] };
              return (
                <Reveal key={lesson.slug}>
                  <article
                    id={lesson.slug}
                    className="grid grid-cols-1 scroll-mt-24 overflow-hidden rounded-[2rem] border border-ink/10 bg-white/70 lg:grid-cols-2"
                  >
                    <div className={`relative min-h-[22rem] bg-ink lg:min-h-[34rem] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                      {m.video ? (
                        <BackgroundVideo video={m.video} sizes="(min-width: 1024px) 50vw, 100vw" />
                      ) : (
                        <Image src={m.image!} alt={lesson.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                      )}
                      <span className="absolute left-6 top-6 font-mono text-xs text-bone/80">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex flex-col p-8 md:p-12">
                      <div className="flex flex-wrap gap-2">
                        {lesson.variants.map((v) => (
                          <Badge key={v.name} tone={v.name.startsWith("Queen") ? "teal" : "light"}>
                            {v.name.startsWith("Queen") ? "London · Datchet" : "Hayling Island"}
                          </Badge>
                        ))}
                        {lesson.badges.filter((b) => !/hayling/i.test(b)).map((b) => (
                          <Badge key={b} tone="dark">
                            {b}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="display mt-6 text-[clamp(1.65rem,3.6vw,3.4rem)] hyphens-auto">{lesson.name}</h2>
                      <p className="serif mt-3 text-2xl text-teal-deep">{lesson.tagline}</p>
                      <div className="mt-6 grid grid-cols-1 gap-4 leading-relaxed text-ink/70">
                        {lesson.description.map((d) => (
                          <p key={d}>{d}</p>
                        ))}
                      </div>
                      <ul className="mt-6 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                        {lesson.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-2">
                            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-teal-deep" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
                        <Price pence={lesson.pricePence} className="display-tight text-3xl" />
                        <ButtonLink href={`/shop/${lesson.slug}`} variant="ink" size="lg">
                          Book this lesson
                        </ButtonLink>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-bone md:py-32">
        <div className="shell">
          <SectionIntro
            eyebrow="How it works"
            title={
              <>
                Three steps to <span className="serif text-[1.12em] text-teal">flight</span>
              </>
            }
          />
          <ol className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} as="li" className="rounded-[1.75rem] border border-white/10 bg-ink-2 p-8 md:p-10">
                <span className="display text-6xl text-teal">0{i + 1}</span>
                <h3 className="display-tight mt-8 text-2xl">{s.title}</h3>
                <p className="mt-4 leading-relaxed text-bone/65">{s.body}</p>
              </Reveal>
            ))}
          </ol>

          <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal className="rounded-[1.75rem] border border-white/10 p-8 md:p-10">
              <Eyebrow className="mb-6 text-teal">Every lesson includes</Eyebrow>
              <ul className="grid grid-cols-1 gap-4">
                {lessonIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg">
                    <Icon name="check" className="size-5 text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[1.75rem] border border-white/10 p-8 md:p-10">
              <Eyebrow className="mb-6 text-teal">Before you book</Eyebrow>
              <ul className="grid grid-cols-1 gap-4">
                {lessonRequirements.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg">
                    <Icon name="shield" className="mt-1 size-5 shrink-0 text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <Locations />

      <section className="bg-ink py-24 text-bone md:py-32">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIntro size="sm" eyebrow="Questions" title="Good to know" body="Anything else? Call us on the number below or send a message." />
            <div className="mt-8 grid grid-cols-1 gap-2 text-sm text-bone/75">
              <a href={site.phone.href} className="link-underline w-fit">
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="link-underline w-fit">
                {site.email}
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs.lessons} />
          </div>
        </div>
      </section>

      <section className="bg-sand py-24 text-ink md:py-32">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro
              size="sm"
              eyebrow="Special requests"
              title={
                <>
                  Prefer to <span className="serif text-[1.12em] text-teal-deep">talk</span> it through?
                </>
              }
              body="Tell us what you have in mind, whether that's a group session, a particular date or a question about riding. We'll come back to you to make it happen."
            />
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm defaultTopic="lesson" lockTopic tone="light" />
          </div>
        </div>
      </section>
    </>
  );
}
