import type { Metadata } from "next";
import { ProductLine } from "@/components/line/ProductLine";
import { getProducts } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "LIFT5 eFoil: the ride, redefined",
  description:
    "Order the LIFT5 eFoil from London's authorised LIFT dealer. 4'4 Pro, 4'9 Sport and 5'4 Cruiser packages with the Lift Connect System, Quiet Ride Technology and the Gen5 Full Range battery. Try it first at Queen Mother Reservoir.",
  alternates: { canonical: "/lift5" },
};

export default async function Lift5Page() {
  const products = await getProducts({ collection: "LIFT5" });
  return <ProductLine lineKey="lift5" products={products} />;
}
