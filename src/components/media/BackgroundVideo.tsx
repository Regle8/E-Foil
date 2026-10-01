"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";
import type { VideoAsset } from "@/lib/media";
import { Icon } from "@/components/ui/Icon";

type Props = {
  video: VideoAsset;
  className?: string;
  /** Load straight away (above-the-fold hero). */
  priority?: boolean;
  /** `sizes` for the poster image. */
  sizes?: string;
  objectPosition?: string;
  /** Show a pause/play control (needed for long, prominent loops). */
  controls?: boolean;
  controlsClassName?: string;
};

/**
 * Muted looping background video. The optimised poster renders first; the video file is only
 * requested when the element nears the viewport, plays while visible, and pauses off-screen.
 * Reduced-motion and data-saver users get the poster (and can still press play).
 */
export function BackgroundVideo({
  video,
  className,
  priority = false,
  sizes = "100vw",
  objectPosition = "center",
  controls = false,
  controlsClassName,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [src, setSrc] = useState<string>();
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  const pickSource = useCallback(
    () => (video.srcHd && window.matchMedia("(min-width: 1024px)").matches ? video.srcHd : video.src),
    [video]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) {
      userPaused.current = true;
      queueMicrotask(() => setPaused(true));
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc((current) => current ?? pickSource());
          if (!userPaused.current) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: priority ? "0px" : "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pickSource, priority]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      setPaused(false);
      if (!src) setSrc(pickSource());
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      setPaused(true);
      el.pause();
    }
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={video.poster}
          alt=""
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="object-cover"
          style={{ objectPosition }}
        />
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload={priority ? "auto" : "metadata"}
          onPlaying={() => setReady(true)}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-[1200ms] ease-out",
            ready ? "opacity-100" : "opacity-0"
          )}
          style={{ objectPosition }}
        />
      </div>
      {controls ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? `Play video: ${video.label}` : `Pause video: ${video.label}`}
          className={cn(
            "absolute z-20 grid size-11 place-items-center rounded-full border border-white/25 bg-ink/30 text-white backdrop-blur-md transition hover:bg-white hover:text-ink",
            controlsClassName ?? "bottom-6 right-6"
          )}
        >
          <Icon name={paused ? "play" : "pause"} className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
