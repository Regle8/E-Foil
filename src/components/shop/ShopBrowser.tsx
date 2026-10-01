"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/format";
import { shopCategories } from "@/lib/site";
import type { Category, Product } from "@/lib/types";

type CategoryKey = (typeof shopCategories)[number]["key"];
type Sort = "featured" | "price-asc" | "price-desc";

const categoryTitles: Record<Exclude<Category, "used">, string> = {
  efoils: "eFoils",
  lessons: "Lessons",
  wings: "Wings",
  accessories: "Accessories",
};
const order: Exclude<Category, "used">[] = ["efoils", "lessons", "wings", "accessories"];

export function ShopBrowser({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [sort, setSort] = useState<Sort>("featured");

  const raw = params.get("category") ?? "all";
  const category: CategoryKey = shopCategories.some((c) => c.key === raw) ? (raw as CategoryKey) : "all";

  const setCategory = (key: CategoryKey) => {
    const next = new URLSearchParams(params.toString());
    if (key === "all") next.delete("category");
    else next.set("category", key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const groups = useMemo(() => {
    const sorted = (list: Product[]) =>
      sort === "featured"
        ? list
        : [...list].sort((a, b) => (sort === "price-asc" ? a.pricePence - b.pricePence : b.pricePence - a.pricePence));
    const shoppable = products.filter((p) => p.category !== "used");
    if (category === "all") {
      return order
        .map((cat) => ({ key: cat, title: categoryTitles[cat], items: sorted(shoppable.filter((p) => p.category === cat)) }))
        .filter((g) => g.items.length);
    }
    const inCategory = shoppable.filter((p) => p.category === category);
    if (sort !== "featured") return [{ key: category, title: categoryTitles[category as keyof typeof categoryTitles], items: sorted(inCategory) }];
    const byCollection = new Map<string, Product[]>();
    for (const p of inCategory) {
      const k = p.collection ?? "More";
      byCollection.set(k, [...(byCollection.get(k) ?? []), p]);
    }
    return [...byCollection.entries()].map(([k, items]) => ({ key: k, title: k, items }));
  }, [products, category, sort]);

  const count = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      <div className="sticky top-[4.5rem] z-30 border-y border-white/10 bg-ink/85 backdrop-blur-xl md:top-20">
        <div className="shell flex items-center justify-between gap-4 py-3">
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1" role="group" aria-label="Shop categories">
            {shopCategories.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-pressed={category === c.key}
                onClick={() => setCategory(c.key)}
                className={cn(
                  "h-10 shrink-0 rounded-full px-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] transition",
                  category === c.key ? "bg-bone text-ink" : "text-bone/70 hover:bg-white/10 hover:text-bone"
                )}
              >
                {c.label}
              </button>
            ))}
            <Link
              href="/used"
              className="flex h-10 shrink-0 items-center rounded-full px-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-bone/70 transition hover:bg-white/10 hover:text-bone"
            >
              Used
            </Link>
          </div>
          <label className="hidden shrink-0 items-center gap-3 text-xs text-bone/60 md:flex">
            <span>{count} products</span>
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="field h-10 w-44 rounded-full py-0 text-xs"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="shell py-14 md:py-20">
        {groups.map((g) => (
          <section key={g.key} className="mb-20 last:mb-0 md:mb-28" aria-labelledby={`group-${g.key}`}>
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-5 md:mb-10">
              <h2 id={`group-${g.key}`} className="display text-[clamp(1.8rem,3.6vw,3.2rem)]">
                {g.title}
              </h2>
              <span className="font-mono text-xs text-bone/60">{String(g.items.length).padStart(2, "0")}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
              {g.items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        ))}
        {count === 0 ? (
          <p className="py-20 text-center text-bone/60">
            Nothing here yet.{" "}
            <button type="button" className="underline" onClick={() => setCategory("all")}>
              View everything
            </button>
          </p>
        ) : null}
        <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-white/10 bg-ink-2 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="display-tight text-2xl">Can&apos;t see what you need?</p>
            <p className="mt-2 max-w-xl text-sm text-bone/60">
              We supply the full LIFT Foils range of eFoils, spares and accessories. Tell us what you&apos;re after and we&apos;ll source it.
            </p>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
            Ask the team <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
