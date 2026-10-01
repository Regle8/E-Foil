"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

/** Lightweight YouTube facade: shows the thumbnail, loads the player only on click. */
export function YouTube({ id, title, className }: { id: string; title: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-[2rem] bg-ink-3", className)}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 text-left" aria-label={`Play video: ${title}`}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover transition-transform duration-[1.4s] ease-(--ease-expo) group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-20 place-items-center rounded-full bg-white/90 text-ink shadow-2xl transition-transform duration-500 ease-(--ease-expo) group-hover:scale-110 md:size-24">
              <Icon name="play" className="ml-1 size-7" />
            </span>
          </span>
          <span className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white">
            <span className="display-tight text-lg md:text-2xl">{title}</span>
            <span className="eyebrow hidden opacity-70 sm:block">Watch film</span>
          </span>
        </button>
      )}
    </div>
  );
}
