import type { Metadata } from "next";
import { Suspense } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ClearCart } from "@/components/shop/ClearCart";
import { OrderNextSteps, OrderReference } from "@/components/shop/OrderConfirmation";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Primitives";
import { RevealLines } from "@/components/ui/Reveal";
import { videos } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-bone">
      <ClearCart />
      <BackgroundVideo video={videos.sunsetDuo} priority />
      <div className="absolute inset-0 bg-ink/60" aria-hidden />
      <div className="shell relative z-10 py-36">
        <Suspense
          fallback={
            <Eyebrow dot className="text-bone/80">
              Order received
            </Eyebrow>
          }
        >
          <OrderReference />
        </Suspense>
        <RevealLines
          as="h1"
          className="display mt-8 text-[clamp(2.6rem,8vw,8rem)]"
          lines={[
            "You're",
            <span key="b" className="serif text-[1.15em] text-teal">
              all set
            </span>,
          ]}
        />
        <Suspense fallback={<p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80">Thank you for choosing Efoil London.</p>}>
          <OrderNextSteps />
        </Suspense>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href={site.phone.href} size="lg" variant="ghost" icon="phone">
            {site.phone.display}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
