import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { seedCatalog } from "@/data/catalog";
import { getSupabase } from "./supabase";
import type { Category, Product, PurchaseMode, Spec, Variant } from "./types";

type ProductRow = {
  slug: string;
  name: string;
  category: Category;
  collection: string | null;
  tagline: string | null;
  summary: string | null;
  description: string[] | null;
  price_pence: number;
  compare_at_pence: number | null;
  images: string[] | null;
  variant_label: string | null;
  variants: Variant[] | null;
  specs: Spec[] | null;
  includes: string[] | null;
  badges: string[] | null;
  purchase_mode: PurchaseMode;
  featured: boolean;
  sort_order: number;
};

const COLUMNS =
  "slug,name,category,collection,tagline,summary,description,price_pence,compare_at_pence,images,variant_label,variants,specs,includes,badges,purchase_mode,featured,sort_order";

const toProduct = (r: ProductRow): Product => ({
  slug: r.slug,
  name: r.name,
  category: r.category,
  collection: r.collection,
  tagline: r.tagline,
  summary: r.summary,
  description: r.description ?? [],
  pricePence: r.price_pence,
  compareAtPence: r.compare_at_pence,
  images: r.images ?? [],
  variantLabel: r.variant_label,
  variants: r.variants ?? [],
  specs: r.specs ?? [],
  includes: r.includes ?? [],
  badges: r.badges ?? [],
  purchaseMode: r.purchase_mode,
  featured: r.featured,
  sortOrder: r.sort_order,
});

// The catalogue lives in e_foil.products (editable in Supabase). If the database is unreachable,
// the bundled seed keeps the shop online.
const loadCatalog = unstable_cache(
  async (): Promise<Product[]> => {
    const supabase = getSupabase();
    if (!supabase) return seedCatalog;
    const { data, error } = await supabase.from("products").select(COLUMNS).eq("active", true).order("sort_order");
    if (error || !data?.length) {
      console.warn("[catalog] falling back to bundled catalogue:", error?.message ?? "no rows");
      return seedCatalog;
    }
    return (data as ProductRow[]).map(toProduct);
  },
  ["catalog-v1"],
  { revalidate: 300, tags: ["catalog"] }
);

export const getCatalog = cache(loadCatalog);

export async function getProduct(slug: string) {
  const products = await getCatalog();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProducts(filter: { category?: Category; featured?: boolean; collection?: string } = {}) {
  const products = await getCatalog();
  return products.filter(
    (p) =>
      (!filter.category || p.category === filter.category) &&
      (filter.featured === undefined || p.featured === filter.featured) &&
      (!filter.collection || p.collection === filter.collection)
  );
}
