"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Primitives";
import { cn } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ColourExplorer({ product, lineName }: { product: Product; lineName: string }) {
  const [active, setActive] = useState(0);
  const variant = product.variants[active];
  if (!variant) return null;

  return (
    <section className="relative overflow-hidden bg-sand py-24 text-ink md:py-32" aria-label={`${lineName} colourways`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={variant.name}
          className="display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[16vw] leading-none text-ink/[0.045]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          aria-hidden
        >
          {variant.name}
        </motion.p>
      </AnimatePresence>

      <div className="shell relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow className="mb-6 text-ink/65">Colourways</Eyebrow>
          <h2 className="display text-[clamp(2.2rem,4.6vw,4.4rem)]">
            Make it <span className="serif text-[1.12em] text-teal-deep">yours</span>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-ink/65">
            Every {lineName} board comes in {product.variants.length} finishes. Pick yours when you order.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-2" role="radiogroup" aria-label="Colour">
            {product.variants.map((v, i) => (
              <button
                key={v.name}
                type="button"
                role="radio"
                aria-checked={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-full border px-4 py-3 text-left transition",
                  i === active ? "border-ink bg-ink text-bone" : "border-ink/15 hover:border-ink/40"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="size-6 rounded-full ring-1 ring-black/15" style={{ backgroundColor: v.swatch ?? undefined }} />
                  <span className="text-sm font-medium">{v.name}</span>
                </span>
                {v.note ? <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-teal">In stock</span> : null}
              </button>
            ))}
          </div>
          {variant.note ? <p className="mt-5 max-w-sm text-sm text-teal-deep">{variant.note}</p> : null}
          <Link
            href={`/shop/${product.slug}`}
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] hover:text-teal-deep"
          >
            Order the {product.name} <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>

        <div className="relative aspect-square lg:col-span-8 lg:aspect-[5/4]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={variant.name}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 60, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -60, rotate: -3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={variant.images[0]}
                alt={`${product.name} in ${variant.name}`}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-contain mix-blend-multiply"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
