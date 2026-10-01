import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import type { Product } from "@/lib/types";

export function ShopTeaser({ products }: { products: Product[] }) {
  return (
    <section className="bg-bone py-24 text-ink md:py-36">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow className="mb-6 text-ink/65">The LIFT shop</Eyebrow>
            </Reveal>
            <RevealLines
              className="display text-[clamp(2.3rem,5.4vw,5.2rem)]"
              lines={[
                "The UK's largest",
                <span key="line-0">
                  <span className="serif text-[1.12em] text-teal-deep">LIFT</span> retailer
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.15} className="flex flex-col items-start gap-6 lg:items-end">
            <p className="max-w-md text-base leading-relaxed text-ink/65 lg:text-right">
              Boards, wings, propulsion and power, with expert advice, demos at the reservoir and support long after you buy.
            </p>
            <ButtonLink href="/shop" variant="ink">
              Shop everything
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-20 lg:grid-cols-4 lg:gap-x-5">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProductCard product={p} tone="light" />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal>
            <Link href="/used" className="group relative flex min-h-[20rem] overflow-hidden rounded-[2rem] bg-ink p-8 text-bone md:p-10">
              <Image
                src="/images/photos/boards-hayling-beach.webp"
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover opacity-60 transition-transform duration-[1.6s] ease-(--ease-expo) group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent" aria-hidden />
              <div className="relative mt-auto max-w-sm">
                <p className="eyebrow text-teal">Used Not Abused</p>
                <p className="display mt-3 text-[clamp(1.8rem,3vw,2.6rem)]">Pre-loved, expert-checked</p>
                <p className="mt-3 text-sm text-bone/70">Inspected by our team and sold with warranty where described. Or let us sell yours.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                  Browse used gear <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/lessons" className="group relative flex min-h-[20rem] overflow-hidden rounded-[2rem] bg-teal p-8 text-ink md:p-10">
              <Image
                src="/images/products/lift5-5-4-steelblue.webp"
                alt=""
                width={700}
                height={700}
                className="absolute -right-16 -top-10 w-[70%] max-w-[26rem] rotate-[18deg] transition-transform duration-[1.6s] ease-(--ease-expo) group-hover:rotate-[10deg] group-hover:scale-105"
              />
              <div className="relative mt-auto max-w-sm">
                <p className="eyebrow text-ink/60">Try before you buy</p>
                <p className="display mt-3 text-[clamp(1.8rem,3vw,2.6rem)]">Ride it first</p>
                <p className="mt-3 text-sm text-ink/70">
                  Book a Private 1-2-1, try different boards and wings, and we&apos;ll deduct the session if you buy on the day.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                  Book a demo session <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
