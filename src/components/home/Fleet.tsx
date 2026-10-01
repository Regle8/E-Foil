import Link from "next/link";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, Eyebrow, Price } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { videos } from "@/lib/media";

const boards = [
  {
    name: "LIFT5",
    href: "/lift5",
    video: videos.lift5Studio,
    kicker: "The ride, redefined",
    body: "Built to disappear beneath you. Lift Connect System, Quiet Ride Technology and high-modulus carbon. Effortless set-up, seamless performance.",
    from: 1350000,
    compare: null,
    badge: "Pre-order",
  },
  {
    name: "LIFTX",
    href: "/liftx",
    video: videos.liftxStudio,
    kicker: "Where surf meets powered foil",
    body: "The first hybrid eFoil. Harness natural forces, then switch seamlessly to powered propulsion. For riders who refuse to be limited.",
    from: 1150000,
    compare: 1200000,
    badge: "2026 boards in stock",
  },
];

export function Fleet() {
  return (
    <section className="bg-black py-24 text-bone md:py-36">
      <div className="shell">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow className="mb-6 justify-center text-bone/65">The fleet</Eyebrow>
          </Reveal>
          <RevealLines
            className="display text-[clamp(2.3rem,5.6vw,5.4rem)]"
            lines={[
              "Two ways",
              <span key="line-0">
                to <span className="serif text-[1.12em] text-teal">fly</span>
              </span>,
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-bone/60 md:text-lg">
              As London&apos;s authorised LIFT Foils retailer, we ride, teach on and sell the full range. Try them at the reservoir before
              you buy.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:mt-20 lg:grid-cols-2">
          {boards.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.1}>
              <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                <Link href={b.href} className="relative block aspect-[4/3]" aria-label={`Explore ${b.name}`}>
                  <BackgroundVideo video={b.video} sizes="(min-width: 1024px) 50vw, 100vw" className="scale-[1.02] transition-transform duration-[1.6s] ease-(--ease-expo) group-hover:scale-[1.07]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" aria-hidden />
                  <div className="absolute left-6 top-6">
                    <Badge tone={i === 1 ? "teal" : "light"}>{b.badge}</Badge>
                  </div>
                </Link>
                <div className="relative -mt-20 px-6 pb-8 md:px-10 md:pb-10">
                  <p className="eyebrow text-teal">{b.kicker}</p>
                  <h3 className="display mt-3 text-[clamp(3.2rem,7vw,6.5rem)]">{b.name}</h3>
                  <p className="mt-4 max-w-md text-bone/65">{b.body}</p>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
                    <Price pence={b.from} compareAt={b.compare} from className="text-xl font-medium" />
                    <div className="flex gap-3">
                      <ButtonLink href={b.href} variant="light">
                        Explore {b.name}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
