import type { MetadataRoute } from "next";
import { BLOG_POSTS, CATEGORIES, PRODUCTS } from "@/lib/data";
import { getStoreProducts, getStoreCategories } from "@/lib/catalog";
import { storeProductPath } from "@/lib/paths";
import { SITE } from "@/lib/seo/config";
import { CATEGORY_SEO } from "@/lib/seo/categories";

const LOCAL_HUBS = [
  { topic: "fitted-caps", location: "los-angeles" },
  { topic: "snapback", location: "new-york" },
  { topic: "dad-cap", location: "chicago" },
  { topic: "limited-drops", location: "miami" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/local`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  let products = PRODUCTS;
  try {
    products = await getStoreProducts();
  } catch {
    /* static fallback */
  }

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}${storeProductPath(p.slug)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const catSlugs = new Set<string>([
    ...CATEGORIES.map((c) => c.slug),
    ...Object.keys(CATEGORY_SEO),
  ]);
  try {
    const apiCats = await getStoreCategories();
    for (const c of apiCats) catSlugs.add(c.slug);
  } catch {
    /* ignore */
  }

  const categoryRoutes: MetadataRoute.Sitemap = [...catSlugs].map((slug) => ({
    url: `${base}/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const localRoutes: MetadataRoute.Sitemap = LOCAL_HUBS.map((h) => ({
    url: `${base}/local/${h.topic}/${h.location}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.45,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...blogRoutes,
    ...localRoutes,
  ];
}
