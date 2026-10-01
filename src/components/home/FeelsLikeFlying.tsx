import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { benefits } from "@/data/content";
import { videos } from "@/lib/media";

export function FeelsLikeFlying() {
  return (
    <section className="relative bg-ink text-bone">
      <div className="lg:grid lg:grid-cols-2">
        <div className="relative h-[75svh] lg:sticky lg:top-0 lg:h-[100svh]">
          <div className="grain absolute inset-0 overflow-hidden lg:inset-4 lg:rounded-[2.25rem]">
            <BackgroundVideo video={videos.sunsetSilhouette} sizes="(min-width: 1024px) 50vw, 100vw" controls />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/30 lg:from-ink/70" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-12">
              <Eyebrow className="mb-5 text-bone/70">You must try e-foiling</Eyebrow>
              <RevealLines
                className="display text-[clamp(2.6rem,6vw,6rem)]"
                lines={[
                  "Feels like",
                  <span key="f" className="serif text-[1.15em] text-teal">
                    flying
                  </span>,
                ]}
              />
            </div>
          </div>
        </div>

        <ol className="shell lg:px-16 xl:px-24">
          {benefits.map((b, i) => (
            <li key={b.title} className="flex min-h-[38vh] flex-col justify-center border-b border-white/10 py-14 last:border-b-0 lg:min-h-[58vh]">
              <Reveal>
                <span className="font-mono text-sm text-teal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-5 text-[clamp(1.9rem,3.6vw,3.4rem)]">{b.title}</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-bone/65">{b.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
