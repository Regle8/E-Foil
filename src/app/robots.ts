import type { MetadataRoute } from "next";
import { isDemo } from "@/lib/base-path";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (isDemo) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/checkout"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
