import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStoreProduct, getStoreRelated } from "@/lib/catalog";
import { ProductDetailClient } from "@/components/ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStoreProduct(slug);
  return {
    title: product?.name || "Product",
    description: product?.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getStoreProduct(slug);
  if (!product) notFound();
  const related = await getStoreRelated(product);

  return <ProductDetailClient product={product} related={related} />;
}
