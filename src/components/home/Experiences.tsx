import Image from "next/image";
import Link from "next/link";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, Price } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { lessonIncludes } from "@/data/content";
import { videos, type VideoAsset } from "@/lib/media";
import type { Product } from "@/lib/types";

export const lessonMedia: Record<string, { video?: VideoAsset; image?: string }> = {
  "efoil-introduction-course": { video: videos.lessonFlight },
  "private-1-2-1-lesson": { image: "/images/photos/lesson-private.webp" },
  "advanced-efoil-lesson": { image: "/images/photos/advanced-flight.webp" },
  "wave-rider-lesson": { video: videos.actionMontage },
};

export function LessonCard({ lesson, index }: { lesson: Product; index: number }) {
  const m = lessonMedia[lesson.slug] ?? { image: lesson.images[0] };
  const locations = lesson.variants.map((v) => (v.name.startsWith("Queen") ? "London" : "Hayling"));
  return (
    <Link href={`/shop/${lesson.slug}`} className="group relative block overflow-hidden rounded-[1.75rem] bg-ink text-bone">
      <div className="relative aspect-[3/4]">
        {m.video ? (
          <BackgroundVideo video={m.video} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[1.4s] ease-(--ease-expo) group-hover:scale-105" />
        ) : (
          <Image
            src={m.image!}
            alt={lesson.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.4s] ease-(--ease-expo) group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" aria-hidden />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="font-mono text-xs text-bone/70">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex gap-1.5">
            {locations.map((l) => (
              <span key={l} className="rounded-full border border-white/30 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] backdrop-blur-md">
                {l}
              </span>
            ))}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="display-tight text-[1.6rem] leading-[1.02]">{lesson.name.replace("eFoil ", "")}</p>
          <p className="mt-3 line-clamp-2 text-sm text-bone/70">{lesson.tagline}</p>
          <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
            <Price pence={lesson.pricePence} className="text-lg font-medium" />
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
              Book
              <Icon name="arrowRight" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Experiences({ lessons }: { lessons: Product[] }) {
  return (
    <section className="bg-bone py-24 text-ink md:py-36">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow className="mb-6 text-ink/65">Experiences</Eyebrow>
            </Reveal>
            <RevealLines
              className="display text-[clamp(2.3rem,5.4vw,5.2rem)]"
              lines={[
                "Book your",
                <span key="line-0">
                  first <span className="serif text-[1.12em] text-teal-deep">flight</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.15} className="max-w-md">
            <p className="text-base leading-relaxed text-ink/65 md:text-lg">
              Lessons at Queen Mother Reservoir in London and on Hayling Island, for complete beginners through to owners chasing waves.
              You and your instructor talk the whole time through a helmet intercom.
            </p>
            <ButtonLink href="/lessons" variant="ghost-dark" className="mt-6">
              All lesson details
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {lessons.map((lesson, i) => (
            <Reveal key={lesson.slug} delay={i * 0.08}>
              <LessonCard lesson={lesson} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col gap-5 rounded-[1.75rem] border border-ink/10 bg-white/60 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="eyebrow shrink-0 text-ink/65">Every lesson includes</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {lessonIncludes.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-teal-deep" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
