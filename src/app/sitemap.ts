import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/repositories";
import { getSiteUrl } from "@/lib/site";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/wellness-kits", changeFrequency: "weekly", priority: 0.95 },
  { path: "/herbal-powders", changeFrequency: "weekly", priority: 0.84 },
  { path: "/herbal-oils", changeFrequency: "weekly", priority: 0.84 },
  { path: "/raw-herbs", changeFrequency: "weekly", priority: 0.78 },
  { path: "/combos", changeFrequency: "weekly", priority: 0.82 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.72 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.66 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  const products = await listProducts();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: product.type === "wellness-kit" ? 0.9 : 0.76,
    })),
  ];
}
