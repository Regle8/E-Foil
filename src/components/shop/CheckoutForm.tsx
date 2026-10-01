"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { placeOrder } from "@/app/actions";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cartSubtotal, useCart, useCartHydrated } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { useActionForm } from "@/lib/use-action-form";

export function CheckoutForm({ cardPayments }: { cardPayments: boolean }) {
  const lines = useCart((s) => s.lines);
  const hydrated = useCartHydrated();
  const [state, onSubmit, pending] = useActionForm(placeOrder, null);
  const [fulfilment, setFulfilment] = useState<"collection" | "delivery">("collection");
  const [payment, setPayment] = useState<"card" | "bank_transfer">(cardPayments ? "card" : "bank_transfer");

  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-[2rem] bg-white/[0.03]" aria-label="Loading your bag" />;
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-ink-2 p-10 text-center md:p-16">
        <p className="display text-3xl">Your bag is empty</p>
        <p className="mx-auto mt-4 max-w-md text-bone/60">Add a lesson or some kit, then come back here to check out.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/lessons">Book a lesson</ButtonLink>
          <ButtonLink href="/shop" variant="ghost">
            Visit the shop
          </ButtonLink>
        </div>
      </div>
    );
  }

  const hasLessons = lines.some((l) => l.category === "lessons");
  const hasPhysical = lines.some((l) => l.category !== "lessons");
  const subtotal = cartSubtotal(lines);
  const items = JSON.stringify(lines.map((l) => ({ slug: l.slug, variant: l.variant, qty: l.qty })));
  const err = (k: string) => state?.errors?.[k];
  let step = 0;
  const next = () => ++step;

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14" noValidate>
      <input type="hidden" name="items" value={items} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid grid-cols-1 content-start gap-12 lg:col-span-7">
        <Section n={next()} title="Your details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name" error={err("name")} className="sm:col-span-2">
              <input name="name" autoComplete="name" className="field" aria-invalid={Boolean(err("name"))} required />
            </Field>
            <Field label="Email" error={err("email")}>
              <input name="email" type="email" autoComplete="email" className="field" aria-invalid={Boolean(err("email"))} required />
            </Field>
            <Field label="Phone" error={err("phone")}>
              <input name="phone" type="tel" autoComplete="tel" className="field" aria-invalid={Boolean(err("phone"))} required />
            </Field>
          </div>
        </Section>

        {hasLessons ? (
          <Section n={next()} title="Your lesson">
            <p className="-mt-2 mb-5 text-sm text-bone/60">
              Sessions run around the conditions, so we&apos;ll call to agree a date. Let us know what suits you.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Preferred centre">
                <select name="preferred_location" className="field" defaultValue="">
                  <option value="">As chosen for each lesson</option>
                  <option>Queen Mother Reservoir, London</option>
                  <option>Hayling Island</option>
                </select>
              </Field>
              <Field label="Preferred dates or days (optional)">
                <input name="preferred_dates" className="field" placeholder="e.g. weekends in June, or any weekday morning" />
              </Field>
              <label className="flex items-start gap-3 text-sm text-bone/75">
                <input type="checkbox" name="riders" className="mt-0.5 size-4 shrink-0 accent-teal" required />
                <span>
                  I confirm every rider is 14 or over, weighs less than 100kg and is medically fit to take part.
                  {err("riders") ? <span className="mt-1 block text-ember">{err("riders")}</span> : null}
                </span>
              </label>
            </div>
          </Section>
        ) : null}

        {hasPhysical ? (
          <Section n={next()} title="Delivery or collection">
            <input type="hidden" name="fulfilment" value={fulfilment} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Choice
                selected={fulfilment === "collection"}
                onSelect={() => setFulfilment("collection")}
                title="Collect"
                body={`From our HQ in ${site.hq.town}, or at a lesson`}
              />
              <Choice selected={fulfilment === "delivery"} onSelect={() => setFulfilment("delivery")} title="Deliver" body="UK delivery, cost confirmed before dispatch" />
            </div>
            {fulfilment === "delivery" ? (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Address" error={err("address1")} className="sm:col-span-2">
                  <input name="address1" autoComplete="address-line1" className="field" aria-invalid={Boolean(err("address1"))} />
                </Field>
                <Field label="Address line 2 (optional)" className="sm:col-span-2">
                  <input name="address2" autoComplete="address-line2" className="field" />
                </Field>
                <Field label="Town or city" error={err("city")}>
                  <input name="city" autoComplete="address-level2" className="field" aria-invalid={Boolean(err("city"))} />
                </Field>
                <Field label="Postcode" error={err("postcode")}>
                  <input name="postcode" autoComplete="postal-code" className="field uppercase" aria-invalid={Boolean(err("postcode"))} />
                </Field>
              </div>
            ) : null}
          </Section>
        ) : null}

        <Section n={next()} title="Payment">
          <input type="hidden" name="payment" value={payment} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cardPayments ? (
              <Choice selected={payment === "card"} onSelect={() => setPayment("card")} title="Pay by card" body="Secure checkout powered by Stripe" />
            ) : null}
            <Choice
              selected={payment === "bank_transfer"}
              onSelect={() => setPayment("bank_transfer")}
              title={cardPayments ? "Reserve, pay later" : "Reserve now, pay on confirmation"}
              body="We'll confirm everything with you, then send payment details"
            />
          </div>
        </Section>

        <div className="grid grid-cols-1 gap-5">
          <Field label="Anything we should know? (optional)">
            <textarea name="notes" rows={3} className="field resize-y" placeholder="Rider weight and experience, kit questions, delivery notes…" />
          </Field>
          <label className="flex items-start gap-3 text-sm text-bone/75">
            <input type="checkbox" name="terms" className="mt-0.5 size-4 shrink-0 accent-teal" required />
            <span>
              I agree to the{" "}
              <Link href="/terms" target="_blank" className="underline underline-offset-2 hover:text-bone">
                terms & conditions
              </Link>
              , including that eFoil and foil purchases are made to order and final.
              {err("terms") ? <span className="mt-1 block text-ember">{err("terms")}</span> : null}
            </span>
          </label>
          {state && !state.ok ? (
            <p role="alert" className="rounded-2xl border border-ember/40 bg-ember/10 px-5 py-4 text-sm text-ember">
              {state.message}
            </p>
          ) : null}
          <Button type="submit" size="lg" icon="arrowRight" disabled={pending} className="w-full sm:w-auto">
            {pending ? "Placing order…" : payment === "card" ? `Continue to payment · ${formatPrice(subtotal)}` : `Place order · ${formatPrice(subtotal)}`}
          </Button>
        </div>
      </div>

      <aside className="lg:col-span-5">
        <div className="rounded-[2rem] bg-bone p-6 text-ink md:p-8 lg:sticky lg:top-28">
          <p className="display-tight text-xl">Order summary</p>
          <ul className="mt-6 divide-y divide-ink/10">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-4 py-4">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-sand">
                  {l.image ? <Image src={l.image} alt="" fill sizes="64px" className="object-contain p-1.5 mix-blend-multiply" /> : null}
                  <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-ink text-[0.65rem] font-semibold text-bone">
                    {l.qty}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium leading-snug">{l.name}</span>
                  {l.variant ? <span className="mt-0.5 block text-xs text-ink/65">{l.variant}</span> : null}
                </span>
                <span className="text-sm font-medium tabular-nums">{formatPrice(l.unitPence * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 grid grid-cols-1 gap-2 border-t border-ink/10 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/60">Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            {hasPhysical ? (
              <div className="flex justify-between">
                <dt className="text-ink/60">Delivery</dt>
                <dd className="text-ink/60">{fulfilment === "collection" ? "Free collection" : "Confirmed before dispatch"}</dd>
              </div>
            ) : null}
            <div className="mt-2 flex items-baseline justify-between border-t border-ink/10 pt-4">
              <dt className="font-medium">Total</dt>
              <dd className="display-tight text-2xl tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <ul className="mt-6 grid grid-cols-1 gap-2.5 text-xs text-ink/60">
            <li className="flex items-center gap-2">
              <Icon name="shield" className="size-4 text-teal-deep" /> Authorised LIFT Foils retailer
            </li>
            <li className="flex items-center gap-2">
              <Icon name="phone" className="size-4 text-teal-deep" /> Questions? Call {site.phone.display}
            </li>
          </ul>
        </div>
      </aside>
    </form>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-6 flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-teal font-mono text-xs font-semibold text-ink">{n}</span>
        <span className="display-tight text-2xl">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({ label, error, className, children }: { label: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <label className={cn("grid grid-cols-1 gap-2", className)}>
      <span className="text-xs font-medium tracking-wide text-bone/65">{label}</span>
      {children}
      {error ? <span className="text-xs text-ember">{error}</span> : null}
    </label>
  );
}

function Choice({ selected, onSelect, title, body }: { selected: boolean; onSelect: () => void; title: string; body: string }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-5 text-left transition",
        selected ? "border-teal bg-teal/10" : "border-white/15 hover:border-white/35"
      )}
    >
      <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border", selected ? "border-teal bg-teal" : "border-white/30")}>
        {selected ? <span className="size-2 rounded-full bg-ink" /> : null}
      </span>
      <span>
        <span className="block font-medium">{title}</span>
        <span className="mt-1 block text-sm text-bone/65">{body}</span>
      </span>
    </button>
  );
}
