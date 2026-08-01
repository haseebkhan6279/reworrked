import type { Metadata } from "next";
import { Suspense } from "react";
import { getStoreProducts } from "@/lib/catalog";
import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { CatalogFilters } from "@/components/CatalogFilters";
import { Pagination } from "@/components/Pagination";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Shop Caps",
  description: "Browse REWORRKED fitted, snapback, dad cap, trucker, and limited drops.",
};

export const dynamic = "force-dynamic";

function sortProducts(list: Product[], sort: string | undefined) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").toLowerCase();
  const category = sp.category ?? "";
  const sort = sp.sort ?? "newest";
  const page = Math.max(1, Number(sp.page ?? 1));
  const perPage = 18;

  const products = await getStoreProducts();

  let filtered = products.filter((p) => {
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q);
    const matchCat = !category || p.categorySlug === category;
    return matchQ && matchCat;
  });
  filtered = sortProducts(filtered, sort);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-10 md:px-6 md:py-14">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-3xl tracking-[0.08em] sm:text-4xl md:text-5xl">
          Shop Caps
        </h1>
        <p className="mt-2 text-sm text-rw-muted">
          {filtered.length} products
        </p>
      </div>

      <Suspense fallback={<div className="h-24 border border-rw-border bg-rw-surface md:h-20" />}>
        <CatalogFilters />
      </Suspense>

      {slice.length === 0 ? (
        <p className="py-20 text-center text-sm text-rw-muted">
          No caps match these filters. Publish products from the admin dashboard to list them here.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:mt-8 md:grid-cols-3 lg:grid-cols-4">
          {slice.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        basePath={`/products?q=${q}&category=${category}&sort=${sort}`}
      />
    </div>
  );
}

export function ProductsLoading() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-14 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
