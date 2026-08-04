import type { Product, BlogPost } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { storeProductPath } from "@/lib/paths";
import { SITE } from "./config";
import { absoluteUrl } from "./metadata";

export type BreadcrumbItem = { name: string; path?: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path
        ? { item: absoluteUrl(item.path) }
        : {}),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.png"),
      width: 192,
      height: 192,
    },
    image: absoluteUrl("/opengraph-image"),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.foundingDate,
    sameAs: SITE.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        email: SITE.email,
        areaServed: "PK",
        availableLanguage: ["English", "Urdu"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
  };
}

export function productJsonLd(product: Product) {
  const url = absoluteUrl(storeProductPath(product.slug));
  const images = (product.images ?? []).map((src) =>
    src.startsWith("http") ? src : absoluteUrl(src)
  );
  const availability =
    product.stock > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

  const offer = {
    "@type": "Offer",
    url,
    priceCurrency: SITE.currency,
    price: product.price,
    priceValidUntil: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 90
    )
      .toISOString()
      .slice(0, 10),
    availability,
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  const review =
    product.reviewCount > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description || product.seoDescription || "",
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand || SITE.name,
    },
    category: product.category,
    image: images.length ? images : [absoluteUrl("/opengraph-image")],
    url,
    offers: offer,
    ...(review ? { aggregateRating: review } : {}),
    ...(product.highlights?.length
      ? {
          additionalProperty: product.highlights.map((h) => ({
            "@type": "PropertyValue",
            name: "Highlight",
            value: h,
          })),
        }
      : {}),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
  products,
}: {
  name: string;
  description: string;
  path: string;
  products: Product[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 24).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(storeProductPath(p.slug)),
        name: p.name,
      })),
    },
  };
}

export function articleJsonLd(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.png"),
      },
    },
    image: post.image.startsWith("http")
      ? post.image
      : absoluteUrl(post.image),
    mainEntityOfPage: url,
    articleSection: post.category,
    inLanguage: SITE.language,
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": `${SITE.url}/#store`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: absoluteUrl("/opengraph-image"),
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: "₨₨",
    currenciesAccepted: SITE.currency,
    paymentAccepted: "Cash, Bank Transfer, Card",
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
    parentOrganization: { "@id": `${SITE.url}/#organization` },
  };
}

/** Human-readable price helper for FAQ copy (schema uses numeric). */
export function schemaPriceLabel(n: number) {
  return formatPrice(n);
}
