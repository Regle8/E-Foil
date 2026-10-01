import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { Accordion, SectionIntro } from "@/components/ui/Primitives";
import { faqs } from "@/data/content";
import { getCatalog } from "@/lib/catalog";
import { videos } from "@/lib/media";

export const metadata: Metadata = {
  title: "Shop LIFT eFoils, wings & accessories",
  description:
    "Shop LIFT5 and LIFTX eFoils, LIFT front and rear wings, batteries, propellers and lessons from the UK's largest authorised LIFT eFoil retailer.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getCatalog();
  return (
    <>
      <PageHero
        size="md"
        video={videos.liftxOcean}
        eyebrow="The LIFT shop · Authorised dealer"
        lines={[
          "Gear for",
          <span key="f" className="serif text-[1.15em] text-teal">
            flight
          </span>,
        ]}
        intro={
          <p>
            eFoils, wings, propulsion and power from the UK&apos;s largest authorised LIFT eFoil retailer, with expert set-up advice and
            demos at the reservoir.
          </p>
        }
      />
      <section className="bg-ink text-bone">
        <Suspense
          fallback={
            <div className="shell grid grid-cols-2 gap-x-4 gap-y-10 py-20 md:grid-cols-3 xl:grid-cols-4">
              {products
                .filter((p) => p.category !== "used")
                .map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
            </div>
          }
        >
          <ShopBrowser products={products} />
        </Suspense>
      </section>
      <section className="border-t border-white/10 bg-ink py-24 text-bone md:py-32">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIntro size="sm" eyebrow="Buying with us" title="Shop with confidence" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs.shop} />
          </div>
        </div>
      </section>
    </>
  );
}
