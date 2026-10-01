import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { tech } from "@/data/content";
import { videos } from "@/lib/media";

const tiles = [
  { video: videos.lcsLift5, ...tech[2] },
  { video: videos.batteryXray, ...tech[1] },
  { video: videos.underwaterFoil, ...tech[0] },
];

export function Tech() {
  return (
    <section className="bg-ink py-24 text-bone md:py-36">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow className="mb-6 text-bone/65">Inside the LIFT</Eyebrow>
            </Reveal>
            <RevealLines
              className="display text-[clamp(2.3rem,5.4vw,5.2rem)]"
              lines={[
                "Engineered to",
                <span key="line-0">
                  <span className="serif text-[1.12em] text-teal">disappear</span> beneath you
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.15}>
            <ButtonLink href="/what-is-an-efoil" variant="ghost">
              How an eFoil works
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.1}>
              <article>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black">
                  <BackgroundVideo video={t.video} sizes="(min-width: 768px) 33vw, 100vw" />
                  <span className="absolute left-5 top-5 z-10 font-mono text-xs text-bone/70">0{i + 1}</span>
                </div>
                <h3 className="display-tight mt-6 text-2xl">{t.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-bone/60">{t.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
