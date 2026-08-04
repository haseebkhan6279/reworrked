import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStoreProduct, getStoreRelated } from "@/lib/catalog";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  productSeoTitle,
  productSeoDescription,
  productJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import { storeProductPath } from "@/lib/paths";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStoreProduct(slug);
  if (!product) {
    return buildMetadata({
      title: "Product not found",
      description: "This REWORRKED product is unavailable.",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  const title = productSeoTitle(product.name, product.seoTitle);
  const description = productSeoDescription(
    product.name,
    product.description,
    product.seoDescription
  );
  const path = storeProductPath(product.slug);
  const image = product.images[0] ?? null;

  const meta = buildMetadata({
    title,
    description,
    path,
    image,
    keywords: [
      product.name,
      product.category,
      "REWORRKED",
      "premium caps",
      "luxury headwear",
      product.brand,
    ],
  });

  // Avoid "Brand · Brand" when admin SEO title already includes REWORRKED
  if (product.seoTitle?.trim()) {
    return { ...meta, title: { absolute: product.seoTitle.trim() } };
  }
  return meta;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getStoreProduct(slug);
  if (!product) notFound();
  const related = await getStoreRelated(product);

  const faqs = [
    {
      question: `What is the ${product.name}?`,
      answer:
        product.description ||
        `${product.name} is a premium ${product.category.toLowerCase()} from REWORRKED — collector-grade headwear with elevated embroidery.`,
    },
    {
      question: "Do you ship across Pakistan?",
      answer:
        "Yes. REWORRKED ships nationwide in Pakistan with Cash on Delivery available on eligible orders.",
    },
    {
      question: "Is this in stock?",
      answer:
        product.stock > 0
          ? `Yes — limited stock available (${product.stock} remaining).`
          : "Currently out of stock. Check back for restocks or limited drops.",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/products" },
            {
              name: product.category,
              path: `/category/${product.categorySlug}`,
            },
            { name: product.name },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
