import type { Product } from "./data";
import { PRODUCTS } from "./data";

export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  status: "draft" | "published";
  tags: string[];
  description: string;
  highlights: string[];
  specifications: { key: string; value: string }[];
  images: string[];
  seoTitle: string;
  seoDescription: string;
  thumb?: string;
};

export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

function slugifyCategory(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function mapCatalogProduct(p: CatalogProduct): Product {
  const specs: Record<string, string> = {};
  for (const row of p.specifications ?? []) {
    if (row.key) specs[row.key] = row.value;
  }
  const tags = (p.tags ?? []).map((t) => t.toLowerCase());
  let badge: Product["badge"];
  if (tags.includes("limited")) badge = "Limited";
  else if (tags.includes("new")) badge = "New";

  const images =
    p.images?.length > 0
      ? p.images
      : p.thumb
        ? [p.thumb]
        : ["/media/WhatsApp_Image_2026-07-29_at_3.30.03_202607301426.jpeg"];

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand || "REWORRKED",
    category: p.category,
    categorySlug: slugifyCategory(p.category),
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    rating: 4.8,
    reviewCount: 0,
    stock: p.stock,
    badge,
    colors: [{ name: "Default", hex: "#0A0A0A" }],
    sizes: ["OSFA"],
    images,
    description: p.description || "",
    highlights: p.highlights ?? [],
    specs,
    sku: `RW-${p.slug.slice(0, 12).toUpperCase()}`,
  };
}

async function fetchJson<T>(path: string): Promise<{ ok: true; data: T } | { ok: false }> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 10 },
      cache: "no-store",
    });
    if (!res.ok) return { ok: false };
    return { ok: true, data: (await res.json()) as T };
  } catch {
    return { ok: false };
  }
}

/** Published products from API, falling back to static catalog if API is down. */
export async function getStoreProducts(): Promise<Product[]> {
  const remote = await fetchJson<CatalogProduct[]>("/catalog/products");
  if (remote.ok) {
    return remote.data.map(mapCatalogProduct);
  }
  return PRODUCTS;
}

export async function getStoreProduct(slug: string): Promise<Product | null> {
  const remote = await fetchJson<CatalogProduct>(
    `/catalog/products/by-slug/${encodeURIComponent(slug)}`
  );
  if (remote.ok) return mapCatalogProduct(remote.data);

  const local = PRODUCTS.find((p) => p.slug === slug);
  return local ?? null;
}

export async function getStoreCategories(): Promise<CatalogCategory[]> {
  const remote = await fetchJson<CatalogCategory[]>("/catalog/categories");
  if (remote.ok) return remote.data;
  return [];
}

export async function getStoreProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const all = await getStoreProducts();
  return all.filter((p) => p.categorySlug === categorySlug);
}

export async function getStoreRelated(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const all = await getStoreProducts();
  return all
    .filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id
    )
    .slice(0, limit);
}
