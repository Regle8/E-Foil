"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cartCount, cartSubtotal, useCart, type CartLine } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

const ease = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const { lines, open, setOpen } = useCart();
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = cartCount(lines);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            type="button"
            aria-label="Close bag"
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            className="absolute inset-y-0 right-0 flex w-full max-w-[30rem] flex-col bg-bone text-ink shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <p className="display-tight text-xl">
                Your bag <span className="ml-1 font-mono text-sm opacity-50">({count})</span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-bone"
                aria-label="Close bag"
              >
                <Icon name="close" className="size-4" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <p className="display text-3xl">Your bag is empty</p>
                <p className="max-w-xs text-sm text-ink/60">
                  Book your first flight at London&apos;s only e-foil destination, or explore the LIFT range.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/lessons" onClick={() => setOpen(false)}>
                    Book a lesson
                  </ButtonLink>
                  <ButtonLink href="/shop" variant="ghost-dark" onClick={() => setOpen(false)}>
                    Shop
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6" data-lenis-prevent>
                  {lines.map((line) => (
                    <CartRow key={line.key} line={line} onNavigate={() => setOpen(false)} />
                  ))}
                </ul>
                <div className="border-t border-ink/10 px-6 pb-6 pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-ink/60">Subtotal</span>
                    <span className="display-tight text-2xl tabular-nums">{formatPrice(cartSubtotal(lines))}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-ink/60">Delivery and lesson dates confirmed after you order.</p>
                  <ButtonLink href="/checkout" size="lg" className="mt-5 w-full" onClick={() => setOpen(false)}>
                    Checkout
                  </ButtonLink>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 w-full py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink/60 hover:text-ink"
                  >
                    Continue browsing
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function CartRow({ line, onNavigate }: { line: CartLine; onNavigate: () => void }) {
  const { setQty, remove } = useCart();
  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/shop/${line.slug}`}
        onClick={onNavigate}
        className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-sand"
      >
        {line.image ? (
          <Image src={line.image} alt="" fill sizes="96px" className="object-contain p-2 mix-blend-multiply" />
        ) : null}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/shop/${line.slug}`} onClick={onNavigate} className="font-medium leading-snug hover:underline">
              {line.name}
            </Link>
            {line.variant ? (
              <p className="mt-0.5 text-xs text-ink/65">
                {line.variantLabel}: {line.variant}
              </p>
            ) : null}
          </div>
          <span className="shrink-0 text-sm font-medium tabular-nums">{formatPrice(line.unitPence * line.qty)}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-full border border-ink/15">
            <button
              type="button"
              className="grid size-8 place-items-center rounded-full hover:bg-ink/5 disabled:opacity-30"
              onClick={() => setQty(line.key, line.qty - 1)}
              disabled={line.qty <= 1}
              aria-label={`Decrease quantity of ${line.name}`}
            >
              <Icon name="minus" className="size-3.5" />
            </button>
            <span className="w-7 text-center text-sm tabular-nums" aria-live="polite">
              {line.qty}
            </span>
            <button
              type="button"
              className="grid size-8 place-items-center rounded-full hover:bg-ink/5"
              onClick={() => setQty(line.key, line.qty + 1)}
              aria-label={`Increase quantity of ${line.name}`}
            >
              <Icon name="plus" className="size-3.5" />
            </button>
          </div>
          <button type="button" onClick={() => remove(line.key)} className="text-xs text-ink/60 underline-offset-4 hover:text-ink hover:underline">
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
