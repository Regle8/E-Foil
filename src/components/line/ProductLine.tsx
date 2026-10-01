import Image from "next/image";
import Link from "next/link";
import { Statement } from "@/components/home/Statement";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { YouTube } from "@/components/media/YouTube";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge, badgeTone, Eyebrow, Marquee, Price, SectionIntro } from "@/components/ui/Primitives";
import { HeroIn, HeroLines } from "@/components/ui/HeroLines";
import { Reveal } from "@/components/ui/Reveal";
import { lines, type LineKey } from "@/data/lines";
import type { Product } from "@/lib/types";
import { ColourExplorer } from "./ColourExplorer";

export function ProductLine({ lineKey, products }: { lineKey: LineKey; products: Product[] }) {
  const line = lines[lineKey];
  const explorer = products.find((p) => p.slug === line.explorerSlug) ?? products[0];
  const from = products.length ? Math.min(...products.map((p) => p.pricePence)) : 0;
  const compare = products.find((p) => p.pricePence === from)?.compareAtPence ?? null;

  return (
    <>
      <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-black text-bone">
        <BackgroundVideo video={line.heroVideo} priority controls controlsClassName="right-[clamp(1.25rem,4vw,4rem)] top-28" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" aria-hidden />
        <div className="shell relative z-10 pb-14 pt-40 md:pb-20">
          <HeroIn delay={0.05}>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow dot className="text-bone/80">
                LIFT Foils · Authorised dealer
              </Eyebrow>
              <Badge tone={lineKey === "liftx" ? "teal" : "light"}>{line.badge}</Badge>
            </div>
          </HeroIn>
          <HeroLines delay={0.12} className="display mt-6 text-[clamp(4.5rem,19vw,19rem)] leading-[0.8]" lines={[line.name]} />
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <HeroIn delay={0.3} mode="lift" className="max-w-xl">
              <p className="serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight text-teal">{line.kicker}.</p>
              <p className="mt-4 leading-relaxed text-bone/75 md:text-lg">{line.intro}</p>
            </HeroIn>
            <HeroIn delay={0.45} className="flex flex-col items-start gap-5 lg:items-end">
              <Price pence={from} compareAt={compare} from className="text-2xl font-medium" />
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="#packages" size="lg">
                  Order {line.name}
                </ButtonLink>
                <ButtonLink href="/shop/private-1-2-1-lesson" size="lg" variant="ghost">
                  Try it first
                </ButtonLink>
              </div>
            </HeroIn>
          </div>
        </div>
      </section>

      {line.stockNote ? (
        <div className="bg-teal py-4 text-ink">
          <Marquee duration={40}>
            {[0, 1].map((k) => (
              <span key={k} className="flex items-center gap-6 px-6 text-sm font-semibold uppercase tracking-[0.12em]">
                {line.stockNote}
                <Icon name="sparkle" className="size-4" />
              </span>
            ))}
          </Marquee>
        </div>
      ) : null}

      <section className="bg-bone py-24 text-ink md:py-36">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow className="mb-8 text-ink/65">The future of watersports is here</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="serif text-[clamp(1.9rem,3.6vw,3.6rem)] leading-[1.12]">{line.statement}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:pt-16">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {line.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 py-4 text-ink/75">
                  <Icon name="check" className="mt-0.5 size-5 shrink-0 text-teal-deep" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-black py-24 text-bone md:py-32">
        <div className="shell">
          <SectionIntro
            eyebrow={`Inside ${line.name}`}
            title={
              <>
                Every detail, <span className="serif text-[1.12em] text-teal">re-engineered</span>
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
            {line.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-3">
                    <BackgroundVideo video={f.video} sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                  <h3 className="display-tight mt-6 text-2xl">{f.title}</h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-bone/60">{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {explorer ? <ColourExplorer product={explorer} lineName={line.name} /> : null}

      <section id="packages" className="scroll-mt-16 bg-ink py-24 text-bone md:py-32">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionIntro
              eyebrow={`${line.name} packages`}
              title={
                <>
                  Choose your <span className="serif text-[1.12em] text-teal">board</span>
                </>
              }
              body="Every package comes ready to ride, with the battery, charger, controller, bags and LIFT's warranty."
            />
            <ButtonLink href="/contact" variant="ghost">
              Ask Oly which size
            </ButtonLink>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <PackageCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-bone md:py-32">
        <div className="shell">
          <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <SectionIntro eyebrow="Watch it in action" title={<>The film</>} />
          </div>
          <Reveal>
            <YouTube id={line.film.id} title={line.film.title} />
          </Reveal>
        </div>
      </section>

      <Statement
        video={line.rideVideo}
        eyebrow="Try before you buy"
        lines={[
          "Ride it first",
          <span key="r" className="serif text-[1.1em] text-teal">
            at the reservoir
          </span>,
        ]}
        body="Book a Private 1-2-1 at London's only e-foil destination: try different boards and wings, get expert advice, and we'll deduct the session if you buy on the day."
      >
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop/private-1-2-1-lesson" size="lg">
            Book a Private 1-2-1
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="ghost">
            Talk to us
          </ButtonLink>
        </div>
      </Statement>
    </>
  );
}

function PackageCard({ product }: { product: Product }) {
  const image = product.images[0];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-sand">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#fff_0%,rgba(255,255,255,0)_65%)]" aria-hidden />
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-contain p-8 mix-blend-multiply transition-transform duration-700 ease-(--ease-expo) group-hover:scale-105"
          />
        ) : null}
        <div className="absolute left-5 top-5 flex gap-1.5">
          {product.badges.map((b) => (
            <Badge key={b} tone={badgeTone(b)}>
              {b}
            </Badge>
          ))}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="display-tight text-3xl">{product.name}</h3>
        <p className="serif mt-2 text-xl text-teal">{product.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-bone/60">{product.summary}</p>
        <details className="group/inc mt-6 border-t border-white/10 pt-5">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
            What&apos;s in the package
            <Icon name="chevronDown" className="size-4 transition-transform group-open/inc:rotate-180" />
          </summary>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-bone/65">
            {product.includes.map((inc) => (
              <li key={inc} className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 size-4 shrink-0 text-teal" />
                {inc}
              </li>
            ))}
          </ul>
        </details>
        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <Price pence={product.pricePence} compareAt={product.compareAtPence} className="text-xl font-medium" />
          <ButtonLink href={`/shop/${product.slug}`} variant="light">
            Choose colour
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
