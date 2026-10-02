import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/our-story", "/support", "/faq", "/shipping-returns", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${site.url}/shop/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
