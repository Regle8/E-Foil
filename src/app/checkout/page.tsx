import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { CancelledNotice } from "@/components/shop/OrderConfirmation";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="bg-ink pb-24 pt-28 text-bone md:pb-32 md:pt-36">
      <div className="shell">
        <p className="eyebrow text-teal">Secure checkout</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,6vw,5.4rem)]">Checkout</h1>
        <Suspense fallback={null}>
          <CancelledNotice />
        </Suspense>
        <div className="mt-12 md:mt-16">
          <CheckoutForm cardPayments={Boolean(process.env.STRIPE_SECRET_KEY)} />
        </div>
      </div>
    </div>
  );
}
