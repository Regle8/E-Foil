import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/shop/ProductCard";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, SectionIntro } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getCatalog } from "@/lib/catalog";
import { videos } from "@/lib/media";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Used Not Abused: pre-owned LIFT eFoils",
  description:
    "Pre-owned LIFT eFoils and kit, inspected by Efoil London and sold with warranty where described. Register interest in used boards, or sell yours with us.",
  alternates: { canonical: "/used" },
};

const promises = [
  { title: "Expert-checked", body: "Every board is carefully inspected by our team for proper operation and any damage." },
  { title: "Warranty where described", body: "Equipment is sold with warranty wherever it's described in the listing." },
  { title: "We'll sell yours", body: "List your kit with us. Sales on behalf of clients carry a 10% commission, deducted from the final sale price." },
];

export default async function UsedPage() {
  const catalog = await getCatalog();
  const used = catalog.filter((p) => p.category === "used");
  const available = used.filter((p) => p.purchaseMode !== "sold");
  const sold = used.filter((p) => p.purchaseMode === "sold");

  return (
    <>
      <PageHero
        size="md"
        video={videos.beachWalk}
        eyebrow="Used Not Abused"
        lines={[
          "Pre-loved,",
          <span key="p" className="serif text-[1.15em] text-teal">
            properly
          </span>,
          "checked",
        ]}
        intro={<p>Our second-hand shop for riders buying and selling LIFT eFoils, with every board inspected by the people who teach on them.</p>}
      />

      <section className="bg-bone py-24 text-ink md:py-32">
        <div className="shell">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="rounded-[1.75rem] border border-ink/10 bg-white/70 p-8">
                <span className="grid size-11 place-items-center rounded-full bg-ink text-teal">
                  <Icon name={i === 2 ? "sparkle" : "shield"} className="size-5" />
                </span>
                <h2 className="display-tight mt-6 text-2xl">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-ink/65">{p.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-24">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionIntro
                eyebrow={available.length ? "Available now" : "Recently sold"}
                title={
                  available.length ? (
                    "In stock"
                  ) : (
                    <>
                      Gone in a <span className="serif text-[1.12em] text-teal-deep">flash</span>
                    </>
                  )
                }
                body={
                  available.length
                    ? undefined
                    : "Our used boards don't hang around. Here's what's sold recently: register below and we'll tell you first when the next one lands."
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {[...available, ...sold].map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <ProductCard product={p} tone="light" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="scroll-mt-20 bg-ink py-24 text-bone md:py-32">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro
              size="sm"
              eyebrow="Buy or sell"
              title={
                <>
                  Register your <span className="serif text-[1.12em] text-teal">interest</span>
                </>
              }
              body="Looking for a particular board, or want us to sell yours? Tell us what you have in mind. It's at Efoil London's discretion which equipment we list."
            />
            <Eyebrow className="mt-10 text-bone/60">Choose &ldquo;Selling my eFoil&rdquo; to list your kit</Eyebrow>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm defaultTopic="used" />
          </div>
        </div>
      </section>
    </>
  );
}
