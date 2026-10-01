import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/catalog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/lessons", "/london", "/lift5", "/liftx", "/shop", "/used", "/what-is-an-efoil", "/about", "/contact", "/terms", "/privacy"];
  const products = await getCatalog();
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : p === "/lessons" || p === "/london" ? 0.9 : 0.7,
    })),
    ...products.map((p) => ({ url: `${site.url}/shop/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
