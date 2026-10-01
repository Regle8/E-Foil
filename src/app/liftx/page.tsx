import type { Metadata } from "next";
import { ProductLine } from "@/components/line/ProductLine";
import { getProducts } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "LIFTX hybrid eFoil: where surf meets powered foil",
  description:
    "The LIFTX hybrid eFoil from London's authorised LIFT dealer. 4'3, 4'8 and 5'2 packages, with 2026 boards in stock for immediate dispatch. Try it first at Queen Mother Reservoir.",
  alternates: { canonical: "/liftx" },
};

export default async function LiftXPage() {
  const products = await getProducts({ collection: "LIFTX" });
  return <ProductLine lineKey="liftx" products={products} />;
}
