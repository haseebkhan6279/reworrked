/** Canonical site identity for REWORRKED SEO / social / AI search. */

export const SITE = {
  name: "REWORRKED",
  legalName: "Reworrked",
  tagline: "Premium Caps & Luxury Headwear",
  description:
    "Reworked classics. Elevated fitted, snapback, dad cap, trucker, and limited drops — collector-grade headwear shipped across Pakistan.",
  url: "https://reworrked.com",
  locale: "en_PK",
  language: "en",
  currency: "PKR",
  themeColor: "#050505",
  backgroundColor: "#050505",
  accent: "#E8E4DC",
  email: "meermustafa@gmail.com",
  phone: "+923160770535",
  phoneDisplay: "+92 316 0770535",
  twitterHandle: "@reworrked",
  sameAs: [
    "https://instagram.com/reworrked",
    "https://www.facebook.com/reworrked",
    "https://www.tiktok.com/@reworrked",
  ] as string[],
  foundingDate: "2024",
  category: "Fashion & Apparel",
  keywords: [
    "REWORRKED",
    "premium caps",
    "luxury headwear",
    "dad caps Pakistan",
    "fitted caps",
    "snapback",
    "trucker caps",
    "streetwear caps",
    "limited embroidery",
    "collector grade caps",
    "buy caps online Pakistan",
  ],
} as const;

export const DEFAULT_OG_IMAGE = "/opengraph-image";

/** Routes that must never be indexed. */
export const NOINDEX_PATHS = [
  "/cart",
  "/checkout",
  "/account",
  "/auth",
  "/order",
  "/design-system",
] as const;
