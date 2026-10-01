import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Primitives";
import { videos } from "@/lib/media";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-bone">
      <BackgroundVideo video={videos.darkOcean} priority />
      <div className="absolute inset-0 bg-ink/55" aria-hidden />
      <div className="shell relative z-10 py-36">
        <Eyebrow dot className="text-bone/80">
          Error 404
        </Eyebrow>
        <h1 className="display mt-8 text-[clamp(3rem,10vw,10rem)]">
          Wiped <span className="serif text-[1.15em] text-teal">out</span>
        </h1>
        <p className="mt-8 max-w-lg text-lg text-bone/75">This page has sunk without a trace. Let&apos;s get you back up on the foil.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Home
          </ButtonLink>
          <ButtonLink href="/lessons" size="lg" variant="ghost">
            Lessons
          </ButtonLink>
          <ButtonLink href="/shop" size="lg" variant="ghost">
            Shop
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
