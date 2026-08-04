import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGE } from "./config";

export function absoluteUrl(path = "/"): string {
  const base = SITE.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
};

/** Unified Metadata builder — titles, canonical, OG, Twitter, robots. */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
  keywords,
  publishedTime,
  modifiedTime,
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    keywords: keywords?.length ? keywords : [...SITE.keywords],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    category: SITE.category,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: type === "article" ? "article" : "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: SITE.twitterHandle,
      site: SITE.twitterHandle,
    },
  };
}

export function rootMetadata(): Metadata {
  const titleDefault = `${SITE.name} — ${SITE.tagline}`;
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: titleDefault,
      template: `%s · ${SITE.name}`,
    },
    description: SITE.description,
    applicationName: SITE.name,
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    category: SITE.category,
    alternates: { canonical: SITE.url },
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: SITE.url,
      siteName: SITE.name,
      title: titleDefault,
      description: SITE.description,
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: `${SITE.name} — Premium Caps`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description: SITE.description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
      creator: SITE.twitterHandle,
      site: SITE.twitterHandle,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/manifest.webmanifest",
    other: {
      "theme-color": SITE.themeColor,
      "msapplication-TileColor": SITE.themeColor,
    },
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? {
            other: {
              "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
            },
          }
        : {}),
    },
  };
}

export function productSeoTitle(name: string, seoTitle?: string) {
  if (seoTitle?.trim()) return seoTitle.trim();
  return `${name} | Premium Cap`;
}

export function productSeoDescription(
  name: string,
  description?: string,
  seoDescription?: string
) {
  if (seoDescription?.trim()) return seoDescription.trim();
  const base =
    description?.trim() ||
    `Shop the ${name} — premium headwear crafted for silhouette, embroidery, and night-ready wear.`;
  return `${base} Cash on Delivery across Pakistan. Only at ${SITE.name}.`.slice(
    0,
    320
  );
}
