/** Unique SEO copy per category (live + future expansion). */

export type CategorySeo = {
  name: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
};

export const CATEGORY_SEO: Record<string, CategorySeo> = {
  fitted: {
    name: "Fitted Caps",
    slug: "fitted",
    title: "Fitted Caps | Structured Luxury Headwear",
    description:
      "Shop fitted caps engineered for a locked silhouette. Structured crowns, premium embroidery, collector-grade finish — only at REWORRKED.",
    keywords: ["fitted caps", "structured caps", "luxury fitted", "REWORRKED fitted"],
  },
  snapback: {
    name: "Snapbacks",
    slug: "snapback",
    title: "Snapback Caps | Adjustable Streetwear Caps",
    description:
      "Discover REWORRKED snapbacks — adjustable streetwear caps with bold marks, clean build, and night-ready contrast.",
    keywords: ["snapback caps", "adjustable caps", "streetwear snapback"],
  },
  "dad-cap": {
    name: "Dad Caps",
    slug: "dad-cap",
    title: "Dad Caps | Elevated Soft-Crown Caps",
    description:
      "Elevated dad caps with soft crowns, pre-curved brims, and limited embroidery. Premium everyday headwear from REWORRKED.",
    keywords: ["dad caps", "unstructured caps", "premium dad cap Pakistan"],
  },
  trucker: {
    name: "Trucker Caps",
    slug: "trucker",
    title: "Trucker Caps | Mesh Back Luxury Caps",
    description:
      "Trucker caps with breathable mesh, solid fronts, and sharp REWORRKED embroidery — built for motion and silhouette.",
    keywords: ["trucker caps", "mesh caps", "premium trucker"],
  },
  "limited-drops": {
    name: "Limited Drops",
    slug: "limited-drops",
    title: "Limited Drops | Collector Caps",
    description:
      "Limited REWORRKED drops — short-run embroidery and exclusive silhouettes. When they're gone, they're gone.",
    keywords: ["limited caps", "drop culture", "collector caps", "exclusive headwear"],
  },
  accessories: {
    name: "Accessories",
    slug: "accessories",
    title: "Cap Accessories | Coming Soon",
    description:
      "REWORRKED accessories for premium headwear — clean essentials matching the collector wardrobe. Coming soon.",
    keywords: ["cap accessories", "headwear accessories"],
  },
  caps: {
    name: "Caps",
    slug: "caps",
    title: "Premium Caps | Luxury Headwear",
    description:
      "Shop all REWORRKED premium caps — fitted, snapback, dad, trucker, and limited drops. Luxury streetwear headwear.",
    keywords: ["premium caps", "luxury headwear", "buy caps online"],
  },
  "luxury-caps": {
    name: "Luxury Caps",
    slug: "luxury-caps",
    title: "Luxury Caps | Collector-Grade Headwear",
    description:
      "Luxury caps with dense embroidery and precise silhouette. Collector-grade headwear from REWORRKED.",
    keywords: ["luxury caps", "premium headwear", "designer caps"],
  },
  "baseball-caps": {
    name: "Baseball Caps",
    slug: "baseball-caps",
    title: "Baseball Caps | Classic Elevated Cuts",
    description:
      "Baseball caps reworked for modern streetwear — clean crowning, premium materials, REWORRKED mark.",
    keywords: ["baseball caps", "classic caps"],
  },
  beanies: {
    name: "Beanies",
    slug: "beanies",
    title: "Beanies | Coming Soon",
    description:
      "Premium beanies joining the REWORRKED lineup — soft structure, sharp branding. Coming soon.",
    keywords: ["beanies", "knit caps"],
  },
  shoes: {
    name: "Shoes",
    slug: "shoes",
    title: "Shoes | Coming Soon",
    description:
      "REWORRKED footwear — elevated silhouettes arriving soon. Stay locked for the drop.",
    keywords: ["streetwear shoes", "REWORRKED shoes"],
  },
  clothing: {
    name: "Clothing",
    slug: "clothing",
    title: "Clothing | Coming Soon",
    description:
      "Streetwear clothing from REWORRKED — hoodies, oversized tees, and lifestyle pieces. Coming soon.",
    keywords: ["streetwear clothing", "REWORRKED apparel"],
  },
  hoodies: {
    name: "Hoodies",
    slug: "hoodies",
    title: "Hoodies | Coming Soon",
    description:
      "Heavyweight hoodies engineered for the REWORRKED wardrobe. Coming soon.",
    keywords: ["premium hoodies", "streetwear hoodies"],
  },
  "oversized-t-shirts": {
    name: "Oversized T-Shirts",
    slug: "oversized-t-shirts",
    title: "Oversized T-Shirts | Coming Soon",
    description:
      "Oversized tees with clean drape and nocturnal branding. Coming soon from REWORRKED.",
    keywords: ["oversized t-shirts", "streetwear tees"],
  },
};

export function getCategorySeo(
  slug: string,
  fallbackName?: string
): CategorySeo {
  const known = CATEGORY_SEO[slug];
  if (known) return known;
  const name = fallbackName ?? slug.replace(/-/g, " ");
  const titleName = name.replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    name: titleName,
    slug,
    title: `${titleName} | Premium Headwear`,
    description: `Shop ${titleName} at REWORRKED — premium caps and luxury streetwear headwear with collector-grade craft.`,
    keywords: [titleName.toLowerCase(), "REWORRKED", "premium caps"],
  };
}
