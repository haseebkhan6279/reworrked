import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/data";
import {
  getStoreCategories,
  getStoreProductsByCategory,
} from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apiCats = await getStoreCategories();
  const cat =
    apiCats.find((c) => c.slug === slug) ??
    CATEGORIES.find((c) => c.slug === slug);
  return { title: cat?.name ?? "Category" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const apiCats = await getStoreCategories();
  const cat =
    apiCats.find((c) => c.slug === slug) ??
    CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();
  const products = await getStoreProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          { label: cat.name },
        ]}
      />
      <h1 className="mt-6 font-display text-4xl tracking-[0.08em] md:text-5xl">
        {cat.name}
      </h1>
      <p className="mt-2 text-sm text-rw-muted">
        {products.length} styles · Reworked silhouette
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="py-20 text-center text-sm text-rw-muted">
          New pieces landing soon.
        </p>
      )}
    </div>
  );
}
