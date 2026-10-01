import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import type { VideoAsset } from "@/lib/media";

/** Full-bleed cinematic video with a centred statement. */
export function Statement({
  video,
  eyebrow,
  lines,
  body,
  children,
}: {
  video: VideoAsset;
  eyebrow: string;
  lines: ReactNode[];
  body?: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative flex min-h-[92svh] items-center overflow-hidden bg-ink text-bone">
      <BackgroundVideo video={video} controls />
      <div className="absolute inset-0 bg-ink/45" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/80" aria-hidden />
      <div className="shell relative z-10 py-28 text-center">
        <Reveal>
          <Eyebrow className="mb-8 justify-center text-bone/75">{eyebrow}</Eyebrow>
        </Reveal>
        <RevealLines className="display mx-auto max-w-6xl text-[clamp(2.6rem,7.4vw,7.6rem)]" lines={lines} />
        {body ? (
          <Reveal delay={0.25}>
            <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-bone/75 md:text-lg">{body}</p>
          </Reveal>
        ) : null}
        {children ? <Reveal delay={0.35}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
