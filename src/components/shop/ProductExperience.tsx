"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge, badgeTone, Price } from "@/components/ui/Primitives";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/format";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

const isPhoto = (p: Product) => p.category === "lessons" || p.category === "used";

export function ProductExperience({ product }: { product: Product }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const variant = product.variants[variantIndex] ?? null;
  const photo = isPhoto(product);

  const gallery = useMemo(() => {
    const variantImages = new Set(product.variants.flatMap((v) => v.images));
    const shared = product.images.filter((i) => !variantImages.has(i));
    const own = variant?.images.length ? variant.images : product.images.filter((i) => !shared.includes(i));
    return [...own, ...shared];
  }, [product, variant]);
  const current = gallery[Math.min(imageIndex, gallery.length - 1)];

  const chooseVariant = (i: number) => {
    setVariantIndex(i);
    setImageIndex(0);
    setAdded(false);
  };

  const addToBag = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        category: product.category,
        image: variant?.images[0] ?? product.images[0] ?? null,
        variant: variant?.name ?? null,
        variantLabel: product.variantLabel,
        unitPence: product.pricePence,
      },
      qty
    );
    setAdded(true);
  };

  const isLesson = product.category === "lessons";

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <div className={cn("relative aspect-square overflow-hidden rounded-[2rem]", photo ? "bg-ink-3" : "bg-sand")}>
          {!photo ? (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#fff_0%,rgba(255,255,255,0)_65%)]" aria-hidden />
          ) : null}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {current ? (
                <Image
                  src={current}
                  alt={variant ? `${product.name} in ${variant.name}` : product.name}
                  fill
                  loading="eager"
                  fetchPriority={imageIndex === 0 ? "high" : "auto"}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className={photo ? "object-cover" : "object-contain p-[7%] mix-blend-multiply"}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-5 top-5 flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <Badge key={b} tone={badgeTone(b)}>
                {b}
              </Badge>
            ))}
          </div>
          {gallery.length > 1 ? (
            <div className="absolute bottom-5 right-5 flex gap-2">
              <button
                type="button"
                onClick={() => setImageIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                className="grid size-11 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white"
                aria-label="Previous image"
              >
                <Icon name="arrowLeft" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setImageIndex((i) => (i + 1) % gallery.length)}
                className="grid size-11 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white"
                aria-label="Next image"
              >
                <Icon name="arrowRight" className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
        {gallery.length > 1 ? (
          <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setImageIndex(i)}
                className={cn(
                  "relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition md:size-24",
                  photo ? "bg-ink-3" : "bg-sand",
                  i === imageIndex ? "border-teal" : "border-transparent opacity-70 hover:opacity-100"
                )}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === imageIndex}
              >
                <Image src={src} alt="" fill sizes="96px" className={photo ? "object-cover" : "object-contain p-1.5 mix-blend-multiply"} />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          {product.collection ? <p className="eyebrow text-teal">{product.collection}</p> : null}
          <h1 className="display mt-4 text-[clamp(2rem,3.4vw,3.4rem)] hyphens-auto [overflow-wrap:break-word]">{product.name}</h1>
          {product.tagline ? <p className="serif mt-3 text-2xl text-bone/80 md:text-3xl">{product.tagline}</p> : null}
          <div className="mt-6 flex items-baseline gap-3">
            <Price
              pence={product.pricePence}
              compareAt={product.compareAtPence}
              className={cn("text-3xl font-medium", product.purchaseMode === "sold" && "line-through opacity-60")}
            />
            {product.compareAtPence ? (
              <span className="rounded-full bg-ember/15 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ember">
                Save {Math.round(((product.compareAtPence - product.pricePence) / product.compareAtPence) * 100)}%
              </span>
            ) : null}
          </div>
          {product.summary ? <p className="mt-5 max-w-md leading-relaxed text-bone/65">{product.summary}</p> : null}

          {product.variants.length > 0 && product.purchaseMode !== "sold" ? (
            <fieldset className="mt-8">
              <legend className="mb-3 flex w-full items-baseline justify-between text-sm">
                <span className="text-bone/60">{product.variantLabel ?? "Option"}</span>
                <span className="font-medium">{variant?.name}</span>
              </legend>
              <div className={cn("flex flex-wrap gap-2", isLesson && "grid")}>
                {product.variants.map((v, i) =>
                  v.swatch ? (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => chooseVariant(i)}
                      aria-pressed={i === variantIndex}
                      aria-label={v.name}
                      title={v.name}
                      className={cn(
                        "grid size-12 place-items-center rounded-full border-2 transition",
                        i === variantIndex ? "border-teal" : "border-transparent hover:border-white/40"
                      )}
                    >
                      <span className="size-9 rounded-full ring-1 ring-white/20" style={{ backgroundColor: v.swatch }} />
                    </button>
                  ) : (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => chooseVariant(i)}
                      aria-pressed={i === variantIndex}
                      className={cn(
                        "flex items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left text-sm transition",
                        i === variantIndex ? "border-teal bg-teal/10" : "border-white/15 hover:border-white/40"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <Icon name="pin" className="size-4 text-teal" />
                        {v.name}
                      </span>
                      {i === variantIndex ? <Icon name="check" className="size-4 text-teal" /> : null}
                    </button>
                  )
                )}
              </div>
              {variant?.note ? <p className="mt-3 text-sm text-teal">{variant.note}</p> : null}
            </fieldset>
          ) : null}

          <div className="mt-8">
            {product.purchaseMode === "cart" ? (
              <div className="flex gap-3">
                <div className="flex h-14 items-center rounded-full border border-white/20">
                  <button
                    type="button"
                    className="grid size-12 place-items-center rounded-full hover:bg-white/10 disabled:opacity-30"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Icon name="minus" className="size-4" />
                  </button>
                  <span className="w-8 text-center tabular-nums" aria-live="polite" aria-label={`Quantity ${qty}`}>
                    {qty}
                  </span>
                  <button
                    type="button"
                    className="grid size-12 place-items-center rounded-full hover:bg-white/10"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                  >
                    <Icon name="plus" className="size-4" />
                  </button>
                </div>
                <Button size="lg" icon={added ? "check" : "bag"} onClick={addToBag} className="flex-1">
                  {added ? "Added to bag" : isLesson ? "Book this lesson" : "Add to bag"}
                </Button>
              </div>
            ) : null}
            {product.purchaseMode === "enquire" ? (
              <div className="grid grid-cols-1 gap-3 sm:flex">
                <ButtonLink href="#enquire" size="lg" className="flex-1">
                  Build my package
                </ButtonLink>
                <ButtonLink href={site.phone.href} size="lg" variant="ghost" icon="phone">
                  Call Oly
                </ButtonLink>
              </div>
            ) : null}
            {product.purchaseMode === "sold" ? (
              <div className="grid grid-cols-1 gap-3 sm:flex">
                <Button size="lg" disabled className="flex-1">
                  Sold
                </Button>
                <ButtonLink href="/used#register" size="lg" variant="ghost">
                  Register interest
                </ButtonLink>
              </div>
            ) : null}
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 text-sm text-bone/70">
            {(isLesson
              ? [
                  "Kit, tuition, safety equipment and insurance included",
                  "We'll call to confirm your date around the conditions",
                  "Riders must be 14+, under 100kg and medically fit",
                ]
              : [
                  "Authorised LIFT Foils retailer",
                  "Try before you buy at our demo centres",
                  "Expert advice and support from Oly and the team",
                ]
            ).map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 size-4 shrink-0 text-teal" />
                {t}
              </li>
            ))}
          </ul>
          {product.purchaseMode === "cart" && product.category === "efoils" ? (
            <p className="mt-5 text-xs leading-relaxed text-bone/60">
              eFoils are made to order: once placed, orders are final under our{" "}
              <Link href="/terms" className="underline underline-offset-2">
                terms
              </Link>
              . Pre-order prices are subject to change.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
