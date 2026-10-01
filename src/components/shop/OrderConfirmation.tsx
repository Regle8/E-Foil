"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPaymentStatus } from "@/app/actions";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Primitives";

/** Reads the order reference (and Stripe session, if any) from the URL on the confirmation page. */
export function OrderReference() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const reference = ref && /^EFL-[A-Z0-9]{6}$/.test(ref) ? ref : null;
  return (
    <Eyebrow dot className="text-bone/80">
      {reference ? `Order ${reference}` : "Order received"}
    </Eyebrow>
  );
}

export function OrderNextSteps() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const reference = ref && /^EFL-[A-Z0-9]{6}$/.test(ref) ? ref : null;
  const sessionId = params.get("session_id");
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    getPaymentStatus(sessionId).then((ok) => {
      if (!cancelled) setPaid(ok);
    });
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const steps = [
    paid ? "Payment received. A receipt is on its way from our payment provider." : "We'll be in touch to confirm your order and arrange payment.",
    "Booked a lesson? We'll call to agree a date that suits you and the conditions.",
    "Ordered kit? Nikki will confirm availability, delivery or collection.",
  ];

  return (
    <>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80">
        Thank you for choosing Efoil London.{reference ? ` Your reference is ${reference}; keep it handy if you get in touch.` : ""}
      </p>
      <ul className="mt-10 grid max-w-xl grid-cols-1 gap-4">
        {steps.map((s) => (
          <li key={s} className="flex items-start gap-3 text-bone/80">
            <Icon name="check" className="mt-0.5 size-5 shrink-0 text-teal" />
            {s}
          </li>
        ))}
      </ul>
    </>
  );
}

export function CancelledNotice() {
  const params = useSearchParams();
  if (!params.get("cancelled")) return null;
  return (
    <p className="mt-6 max-w-xl rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-bone/75" role="status">
      Card payment was cancelled and you haven&apos;t been charged. Your bag is saved below.
    </p>
  );
}
