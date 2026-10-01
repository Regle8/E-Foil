import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductExperience } from "@/components/shop/ProductExperience";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Accordion, Eyebrow, SectionIntro } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { faqs, lessonRequirements } from "@/data/content";
import { getCatalog, getProduct } from "@/lib/catalog";
import { videos } from "@/lib/media";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

const categoryLabel: Record<Product["category"], string> = {
  efoils: "eFoils",
  wings: "Wings",
  accessories: "Accessories",
  lessons: "Lessons",
  used: "Used Not Abused",
};

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.collection && !product.name.includes(product.collection) ? `${product.name} · ${product.collection}` : product.name,
    description: product.summary ?? product.description[0],
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { images: product.images[0] ? [{ url: product.images[0] }] : undefined },
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const catalog = await getCatalog();
  const related = catalog
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .sort((a, b) => Number(b.collection === product.collection) - Number(a.collection === product.collection))
    .slice(0, 4);
  const lineVideo = product.collection === "LIFT5" ? videos.lift5Studio : product.collection === "LIFTX" ? videos.liftxStudio : null;
  const lineHref = product.collection === "LIFT5" ? "/lift5" : "/liftx";
  const listHref = product.category === "used" ? "/used" : `/shop?category=${product.category}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description.join(" "),
    image: product.images.map((i) => `${site.url}${i}`),
    brand: { "@type": "Brand", name: product.category === "lessons" ? site.name : "LIFT Foils" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: (product.pricePence / 100).toFixed(2),
      availability:
        product.purchaseMode === "sold"
          ? "https://schema.org/SoldOut"
          : product.badges.includes("Pre-order")
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
      url: `${site.url}/shop/${product.slug}`,
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-ink pb-20 pt-28 text-bone md:pb-28 md:pt-32">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-bone/60">
            <Link href="/shop" className="hover:text-bone">
              Shop
            </Link>
            <span aria-hidden>/</span>
            <Link href={listHref} className="hover:text-bone">
              {categoryLabel[product.category]}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-bone/80" aria-current="page">
              {product.name}
            </span>
          </nav>
          <ProductExperience product={product} />
        </div>
      </section>

      <section className="bg-bone py-20 text-ink md:py-28">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-6 text-ink/65">Details</Eyebrow>
            <div className="grid grid-cols-1 max-w-2xl gap-5 text-lg leading-relaxed text-ink/75">
              {product.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            {product.category === "lessons" ? (
              <ul className="mt-10 grid grid-cols-1 max-w-2xl gap-3 rounded-[1.5rem] border border-ink/10 bg-white/60 p-6 text-sm">
                {lessonRequirements.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <Icon name="shield" className="mt-0.5 size-4 shrink-0 text-teal-deep" />
                    {r}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="grid grid-cols-1 content-start gap-10 lg:col-span-5">
            {product.includes.length ? (
              <div>
                <p className="eyebrow mb-4 text-ink/65">
                  {product.category === "lessons" ? "Included" : product.category === "used" ? "The package" : "In the box"}
                </p>
                <ul className="divide-y divide-ink/10 border-y border-ink/10">
                  {product.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3 py-3 text-ink/80">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-teal-deep" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {product.specs.length ? (
              <div>
                <p className="eyebrow mb-4 text-ink/65">{product.purchaseMode === "enquire" ? "Build options" : "Specifications"}</p>
                <dl className="divide-y divide-ink/10 border-y border-ink/10">
                  {product.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm">
                      <dt className="text-ink/65">{s.label}</dt>
                      <dd className="text-ink/90">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
            {product.category === "efoils" || product.category === "accessories" ? (
              <a
                href={site.warrantyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 hover:text-ink"
              >
                LIFT Foils warranty information <Icon name="arrowUpRight" className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {lineVideo ? (
        <section className="grain relative flex min-h-[70svh] items-end overflow-hidden bg-black text-bone">
          <BackgroundVideo video={lineVideo} controls />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" aria-hidden />
          <div className="shell relative z-10 flex flex-col gap-6 pb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-teal">The {product.collection} platform</p>
              <p className="display mt-3 text-[clamp(3rem,9vw,8rem)] leading-[0.85]">{product.collection}</p>
            </div>
            <ButtonLink href={lineHref} variant="light" size="lg">
              Explore {product.collection}
            </ButtonLink>
          </div>
        </section>
      ) : null}

      {product.purchaseMode === "enquire" || product.purchaseMode === "sold" ? (
        <section id="enquire" className="scroll-mt-20 bg-sand py-20 text-ink md:py-28">
          <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionIntro
                size="sm"
                eyebrow={product.purchaseMode === "sold" ? "Looking for one like this?" : "Build your package"}
                title={
                  product.purchaseMode === "sold" ? (
                    <>
                      Be first in <span className="serif text-[1.12em] text-teal-deep">line</span>
                    </>
                  ) : (
                    <>
                      Let&apos;s spec <span className="serif text-[1.12em] text-teal-deep">yours</span>
                    </>
                  )
                }
                body={
                  product.purchaseMode === "sold"
                    ? "Used boards go quickly. Tell us what you're after and we'll let you know when something similar comes in."
                    : "Tell us about your weight, experience and where you'll ride. We'll recommend the right board, wings and battery, and send you a quote."
                }
              />
            </div>
            <div className="lg:col-span-7">
              <EnquiryForm
                defaultTopic={product.purchaseMode === "sold" ? "used" : "product"}
                product={product.slug}
                productName={product.name}
                tone="light"
              />
            </div>
          </div>
        </section>
      ) : null}

      {product.category === "lessons" ? (
        <section className="bg-ink py-20 text-bone md:py-28">
          <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionIntro size="sm" eyebrow="Questions" title="Before your lesson" />
              <ButtonLink href="/lessons" variant="ghost" className="mt-8">
                All lessons
              </ButtonLink>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={faqs.lessons.slice(0, 6)} />
            </div>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="border-t border-white/10 bg-ink py-20 text-bone md:py-28">
          <div className="shell">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="display text-[clamp(1.8rem,3.6vw,3.2rem)]">You might also like</h2>
              <Link href={listHref} className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal sm:inline-flex">
                View all <Icon name="arrowRight" className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-5 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
