export type Category = "efoils" | "wings" | "accessories" | "lessons" | "used";

export type PurchaseMode = "cart" | "enquire" | "sold";

export type Variant = {
  name: string;
  swatch: string | null;
  images: string[];
  note: string | null;
};

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  collection: string | null;
  tagline: string | null;
  summary: string | null;
  description: string[];
  pricePence: number;
  compareAtPence: number | null;
  images: string[];
  variantLabel: string | null;
  variants: Variant[];
  specs: Spec[];
  includes: string[];
  badges: string[];
  purchaseMode: PurchaseMode;
  featured: boolean;
  sortOrder: number;
};

export type FormState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<string, string>>;
} | null;
