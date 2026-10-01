import type { Metadata } from "next";
import { CheckoutForm } from "@/components/shop/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default async function CheckoutPage({ searchParams }: PageProps<"/checkout">) {
  const { cancelled } = await searchParams;
  return (
    <div className="bg-ink pb-24 pt-28 text-bone md:pb-32 md:pt-36">
      <div className="shell">
        <p className="eyebrow text-teal">Secure checkout</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,6vw,5.4rem)]">Checkout</h1>
        {cancelled ? (
          <p className="mt-6 max-w-xl rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-bone/75" role="status">
            Card payment was cancelled and you haven&apos;t been charged. Your bag is saved below.
          </p>
        ) : null}
        <div className="mt-12 md:mt-16">
          <CheckoutForm cardPayments={Boolean(process.env.STRIPE_SECRET_KEY)} />
        </div>
      </div>
    </div>
  );
}
