import Image from "next/image";
import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { Eyebrow } from "@/components/ui/Primitives";
import { HeroIn, HeroLines } from "@/components/ui/HeroLines";
import { cn } from "@/lib/format";
import type { VideoAsset } from "@/lib/media";

/** Full-bleed page header with a video (or image) background. */
export function PageHero({
  eyebrow,
  lines,
  intro,
  video,
  image,
  imageAlt = "",
  children,
  size = "lg",
  align = "bottom",
}: {
  eyebrow: ReactNode;
  lines: ReactNode[];
  intro?: ReactNode;
  video?: VideoAsset;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  size?: "lg" | "md" | "sm";
  align?: "bottom" | "center";
}) {
  return (
    <section
      className={cn(
        "grain relative flex flex-col overflow-hidden bg-ink text-bone",
        size === "lg" && "min-h-[100svh]",
        size === "md" && "min-h-[78svh]",
        size === "sm" && "min-h-[60svh]",
        align === "center" ? "justify-center" : "justify-end"
      )}
    >
      {video ? <BackgroundVideo video={video} priority controls /> : null}
      {!video && image ? (
        <Image src={image} alt={imageAlt} fill preload sizes="100vw" className="object-cover" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/15 to-ink/90" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" aria-hidden />
      <div className={cn("shell relative z-10 pt-36", align === "center" ? "pb-24 text-center" : "pb-16 md:pb-24")}>
        <HeroIn delay={0.05}>
          <Eyebrow dot className={cn("mb-7 text-bone/80", align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        </HeroIn>
        <HeroLines
          delay={0.12}
          className={cn("display text-[clamp(2.4rem,7.4vw,8rem)] leading-[0.88]", align === "center" && "mx-auto")}
          lines={lines}
        />
        {intro || children ? (
          <div className={cn("mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between", align === "center" && "items-center lg:justify-center")}>
            {intro ? (
              <HeroIn delay={0.3} mode="lift" className="max-w-xl">
                <div className="text-base leading-relaxed text-bone/80 md:text-lg">{intro}</div>
              </HeroIn>
            ) : null}
            {children ? (
              <HeroIn delay={0.45} className="flex flex-wrap gap-3">
                {children}
              </HeroIn>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
