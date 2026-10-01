import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { locations } from "@/data/content";

export function Locations() {
  const { london, hayling } = locations;
  return (
    <section className="bg-bone py-24 text-ink md:py-36">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow className="mb-6 text-ink/65">Where we fly</Eyebrow>
            </Reveal>
            <RevealLines
              className="display text-[clamp(2.3rem,5.4vw,5.2rem)]"
              lines={[
                "Two centres.",
                <span key="line-0">
                  One in <span className="serif text-[1.12em] text-teal-deep">London</span>.
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.15} className="max-w-md text-base leading-relaxed text-ink/65 md:text-lg">
            Learn on glassy, sheltered water on London&apos;s doorstep, then take your riding to the coast. Lessons and demos run at both.
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link href="/london" className="group relative block overflow-hidden rounded-[2rem] bg-ink text-bone">
              <div className="relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-[16/13]">
                <Image
                  src={london.image}
                  alt="Queen Mother Reservoir, Datchet, on a clear day"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1.6s] ease-(--ease-expo) group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden />
                <div className="absolute left-6 top-6 flex gap-2">
                  <span className="rounded-full bg-teal px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink">London</span>
                  <span className="rounded-full border border-white/30 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] backdrop-blur-md">
                    Exclusive access
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <p className="eyebrow text-bone/60">{london.place}</p>
                  <h3 className="display mt-3 text-[clamp(2rem,4.4vw,4rem)]">{london.name}</h3>
                  <p className="mt-4 max-w-lg text-bone/75">{london.summary}</p>
                  <ul className="mt-6 hidden gap-2 text-sm text-bone/70 sm:grid">
                    {london.facts.slice(1, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <Icon name="check" className="size-4 text-teal" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                    Discover the reservoir
                    <Icon name="arrowRight" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <Link href="/london#hayling" className="group relative block h-full overflow-hidden rounded-[2rem] bg-ink text-bone">
              <div className="relative aspect-[4/5] h-full lg:aspect-auto">
                <Image
                  src={hayling.image}
                  alt="E-foiling on the water at Hayling Island"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition-transform duration-[1.6s] ease-(--ease-expo) group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" aria-hidden />
                <div className="absolute left-6 top-6">
                  <span className="rounded-full border border-white/30 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] backdrop-blur-md">
                    South coast
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <p className="eyebrow text-bone/60">{hayling.place}</p>
                  <h3 className="display mt-3 text-[clamp(2rem,3.6vw,3.4rem)]">{hayling.name}</h3>
                  <p className="mt-4 max-w-md text-bone/75">{hayling.summary}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                    Explore Hayling
                    <Icon name="arrowRight" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
