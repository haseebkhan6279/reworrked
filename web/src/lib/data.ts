import { MEDIA, MODELS } from "./media";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: "New" | "Limited";
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  sku: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  product: string;
};

export const CATEGORIES = [
  { name: "Fitted", slug: "fitted", count: 0 },
  { name: "Snapback", slug: "snapback", count: 0 },
  { name: "Dad Cap", slug: "dad-cap", count: 15 },
  { name: "Trucker", slug: "trucker", count: 1 },
  { name: "Limited Drops", slug: "limited-drops", count: 2 },
  { name: "Accessories", slug: "accessories", count: 0 },
] as const;

const dadSpecs = {
  Material: "Cotton twill",
  Crown: "Unstructured dad",
  Brim: "Pre-curved",
  Closure: "Metal buckle",
  Care: "Spot clean",
} as const;

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "fifty-years-dad-cap",
    name: "Fifty Years Dad Cap",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 48,
    compareAtPrice: 58,
    rating: 4.9,
    reviewCount: 64,
    stock: 18,
    badge: "Limited",
    colors: [{ name: "Void Black", hex: "#0A0A0A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[8], MEDIA.caps[15]],
    description:
      "Black dad silhouette with raised embroidery. Soft crown, pre-curved brim — built to age in.",
    highlights: ["Heavyweight cotton", "Raised multi-color embroidery", "Adjustable buckle"],
    specs: { ...dadSpecs, Embroidery: "Raised stitch" },
    sku: "RW-DAD-050",
  },
  {
    id: "2",
    slug: "harbor-navy-dad",
    name: "Gig Harbor Fly Shop",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 52,
    compareAtPrice: 62,
    rating: 4.8,
    reviewCount: 41,
    stock: 22,
    badge: "New",
    colors: [{ name: "Navy", hex: "#1B2A4A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[0], MEDIA.caps[12]],
    description:
      "Deep navy dad cap with white script embroidery and fly detail. Soft velvet-stage photography, collector finish.",
    highlights: ["Navy twill", "Script embroidery", "Fly graphic"],
    specs: { ...dadSpecs, Embroidery: "White script" },
    sku: "RW-DAD-012",
  },
  {
    id: "3",
    slug: "dads-club-est",
    name: "Dad's Club EST.",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 46,
    compareAtPrice: 54,
    rating: 4.7,
    reviewCount: 88,
    stock: 30,
    colors: [{ name: "Void Black", hex: "#0A0A0A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[19], MODELS.dadsClub, MEDIA.caps[24]],
    description: "Gold serif mark on black. Everyday club silhouette.",
    highlights: ["Gold embroidery", "Side patch detail", "Soft crown"],
    specs: { ...dadSpecs, Embroidery: "Gold serif" },
    sku: "RW-DAD-023",
  },
  {
    id: "4",
    slug: "wife-of-the-party",
    name: "Wife of the Party",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 46,
    compareAtPrice: 54,
    rating: 4.8,
    reviewCount: 37,
    stock: 20,
    badge: "New",
    colors: [{ name: "Sky Blue", hex: "#7BA3C4" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[10], MODELS.wifeOfTheParty, MEDIA.caps[28]],
    description:
      "Light blue dad with soft white script. Party energy, elevated cut.",
    highlights: ["Sky blue twill", "White script embroidery", "Soft crown"],
    specs: { ...dadSpecs, Embroidery: "White script" },
    sku: "RW-DAD-028",
  },
  {
    id: "5",
    slug: "adventure-awaits",
    name: "Adventure Awaits",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 50,
    compareAtPrice: 60,
    rating: 4.9,
    reviewCount: 55,
    stock: 12,
    badge: "Limited",
    colors: [{ name: "Forest", hex: "#1F3A2A" }],
    sizes: ["OSFA"],
    images: [MODELS.adventureAwaits],
    description: "Forest green with gold serif. Built for the road.",
    highlights: ["Forest twill", "Gold embroidery"],
    specs: { ...dadSpecs, Embroidery: "Gold" },
    sku: "RW-DAD-041",
  },
  {
    id: "6",
    slug: "dna-intact",
    name: "DNA Intact",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 42,
    rating: 4.5,
    reviewCount: 19,
    stock: 40,
    colors: [{ name: "Bone White", hex: "#F5F5F5" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[2], MODELS.dnaIntact, MEDIA.caps[26]],
    description: "White field, black mark. Minimal and sharp.",
    highlights: ["White cotton", "Black sans embroidery"],
    specs: { ...dadSpecs, Embroidery: "Black" },
    sku: "RW-DAD-019",
  },
  {
    id: "7",
    slug: "gravely-trucker",
    name: "Gravely Trucker",
    brand: "REWORRKED",
    category: "Trucker",
    categorySlug: "trucker",
    price: 54,
    compareAtPrice: 64,
    rating: 4.7,
    reviewCount: 33,
    stock: 15,
    badge: "New",
    colors: [{ name: "Black / Mesh", hex: "#111111" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[14], MEDIA.caps[25]],
    description: "Foam front, mesh back. Night trucker energy.",
    highlights: ["Mesh back", "Foam front panel"],
    specs: {
      Material: "Foam + mesh",
      Crown: "Mid",
      Brim: "Pre-curved",
      Closure: "Snap",
      Embroidery: "Front graphic",
      Care: "Spot clean",
    },
    sku: "RW-TRK-007",
  },
  {
    id: "8",
    slug: "vegas-script-drop",
    name: "Las Vegas Script",
    brand: "REWORRKED",
    category: "Limited Drops",
    categorySlug: "limited-drops",
    price: 68,
    compareAtPrice: 78,
    rating: 5,
    reviewCount: 21,
    stock: 6,
    badge: "Limited",
    colors: [{ name: "Void Black", hex: "#0A0A0A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[5], MEDIA.caps[22]],
    description: "Neon green script embroidery on black. Limited run.",
    highlights: ["3D script", "Clover brim detail", "Limited stock"],
    specs: { ...dadSpecs, Embroidery: "Neon green script" },
    sku: "RW-LTD-009",
  },
  {
    id: "9",
    slug: "actor-cap",
    name: "Actor Cap",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 44,
    rating: 4.6,
    reviewCount: 29,
    stock: 26,
    colors: [{ name: "Void Black", hex: "#0A0A0A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[17], MEDIA.caps[27]],
    description: "Bold tan ACTOR mark. Clean black field.",
    highlights: ["Bold sans mark", "Matte black twill"],
    specs: { ...dadSpecs, Embroidery: "Tan block" },
    sku: "RW-DAD-031",
  },
  {
    id: "10",
    slug: "far-from-alive",
    name: "Far From Alive",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 46,
    rating: 4.6,
    reviewCount: 18,
    stock: 24,
    badge: "New",
    colors: [{ name: "Void Black", hex: "#0A0A0A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[1]],
    description: "Jagged silver mark with stick-figure graphic. Night energy.",
    highlights: ["Jagged embroidery", "Graphic detail"],
    specs: { ...dadSpecs, Embroidery: "Silver / red" },
    sku: "RW-DAD-033",
  },
  {
    id: "11",
    slug: "yukon-dad",
    name: "Yukon",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 44,
    rating: 4.7,
    reviewCount: 22,
    stock: 28,
    colors: [{ name: "Void Black", hex: "#0A0A0A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[3], MEDIA.caps[16]],
    description: "Bold white Yukon mark on black. Clean and heavy.",
    highlights: ["Raised white embroidery", "Soft crown"],
    specs: { ...dadSpecs, Embroidery: "White block" },
    sku: "RW-DAD-034",
  },
  {
    id: "12",
    slug: "lemon-dad",
    name: "Lemon Dad Cap",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 42,
    rating: 4.8,
    reviewCount: 31,
    stock: 34,
    badge: "New",
    colors: [{ name: "Blush Pink", hex: "#E8B4B8" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[4], MEDIA.caps[21]],
    description: "Blush pink field with a small embroidered lemon. Soft and bright.",
    highlights: ["Pastel pink twill", "Lemon embroidery"],
    specs: { ...dadSpecs, Embroidery: "Yellow lemon" },
    sku: "RW-DAD-035",
  },
  {
    id: "13",
    slug: "armed-citizens",
    name: "Armed Citizens",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 52,
    compareAtPrice: 60,
    rating: 4.5,
    reviewCount: 14,
    stock: 16,
    colors: [{ name: "Navy Suede", hex: "#1A2744" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[6], MEDIA.caps[29]],
    description: "Navy suede-feel with red script and gold legal mark.",
    highlights: ["Suede-feel fabric", "Multi-color embroidery"],
    specs: {
      Material: "Suede-feel twill",
      Crown: "Structured dad",
      Brim: "Pre-curved",
      Closure: "Buckle",
      Embroidery: "Red / gold",
      Care: "Spot clean",
    },
    sku: "RW-DAD-036",
  },
  {
    id: "14",
    slug: "rip-city",
    name: "Rip City",
    brand: "REWORRKED",
    category: "Limited Drops",
    categorySlug: "limited-drops",
    price: 56,
    compareAtPrice: 66,
    rating: 4.9,
    reviewCount: 27,
    stock: 10,
    badge: "Limited",
    colors: [{ name: "Void Black", hex: "#0A0A0A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[7], MEDIA.caps[23]],
    description: "Holographic ripcity patch on black. Iridescent finish.",
    highlights: ["Holo patch", "Limited stock"],
    specs: { ...dadSpecs, Embroidery: "Holographic patch" },
    sku: "RW-LTD-014",
  },
  {
    id: "15",
    slug: "white-claw",
    name: "White Claw",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 48,
    rating: 4.6,
    reviewCount: 35,
    stock: 20,
    colors: [{ name: "Bone White", hex: "#F5F5F5" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[9], MEDIA.caps[13]],
    description: "White field with circular wave mark. Clean coastal energy.",
    highlights: ["White cotton", "Circular logo embroidery"],
    specs: { ...dadSpecs, Embroidery: "Black circular" },
    sku: "RW-DAD-037",
  },
  {
    id: "16",
    slug: "infortmature",
    name: "Infortmature",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 46,
    rating: 4.5,
    reviewCount: 12,
    stock: 18,
    badge: "New",
    colors: [{ name: "Void Black", hex: "#0A0A0A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[11]],
    description: "Five-panel black with white motion mark and stick-figure graphic.",
    highlights: ["Five-panel crown", "White graphic embroidery"],
    specs: {
      Material: "Cotton twill",
      Crown: "Five-panel",
      Brim: "Pre-curved",
      Closure: "Buckle",
      Embroidery: "White / red",
      Care: "Spot clean",
    },
    sku: "RW-DAD-038",
  },
  {
    id: "17",
    slug: "dutchie-dad",
    name: "Dutchie",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 44,
    rating: 4.7,
    reviewCount: 24,
    stock: 26,
    colors: [{ name: "Navy", hex: "#1B2A4A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[18], MEDIA.caps[20]],
    description: "Navy dad with cream dutchie mark. Minimal and sharp.",
    highlights: ["Navy twill", "Cream sans embroidery"],
    specs: { ...dadSpecs, Embroidery: "Cream sans" },
    sku: "RW-DAD-039",
  },
  {
    id: "18",
    slug: "navy-statement",
    name: "Navy Statement Cap",
    brand: "REWORRKED",
    category: "Dad Cap",
    categorySlug: "dad-cap",
    price: 48,
    rating: 4.4,
    reviewCount: 9,
    stock: 14,
    colors: [{ name: "Navy", hex: "#1B2A4A" }],
    sizes: ["OSFA"],
    images: [MEDIA.caps[30]],
    description: "Navy dad with bold white block embroidery. Loud and clear.",
    highlights: ["Navy twill", "Bold white block"],
    specs: { ...dadSpecs, Embroidery: "White slab" },
    sku: "RW-DAD-040",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "fit-guide-crown-and-brim",
    title: "Fit Guide: Crown Height & Brim Curve",
    excerpt: "How silhouette changes the face. Measure once, wear forever.",
    date: "2026-06-12",
    readTime: "6 min",
    category: "Fit",
    image: MODELS.dadsClub,
  },
  {
    slug: "care-and-cleaning",
    title: "Care & Cleaning for Structured Caps",
    excerpt: "Spot clean. Air dry. Never machine-wash embroidery.",
    date: "2026-05-28",
    readTime: "4 min",
    category: "Care",
    image: MEDIA.caps[8],
  },
  {
    slug: "snapback-vs-fitted",
    title: "Snapback vs Fitted",
    excerpt: "Two closures. Two cultures. One wardrobe.",
    date: "2026-05-02",
    readTime: "5 min",
    category: "Guides",
    image: MODELS.dnaIntact,
  },
  {
    slug: "embroidery-quality",
    title: "Reading Embroidery Quality",
    excerpt: "Density, underlay, and why cheap thread shows at night.",
    date: "2026-04-18",
    readTime: "7 min",
    category: "Craft",
    image: MEDIA.caps[5],
  },
  {
    slug: "limited-drop-etiquette",
    title: "Limited Drop Etiquette",
    excerpt: "No bots. No resale theater. Wear what you buy.",
    date: "2026-03-30",
    readTime: "3 min",
    category: "Culture",
    image: MEDIA.caps[22],
  },
  {
    slug: "city-night-style-edit",
    title: "City Night Style Edit",
    excerpt: "Black-on-black caps under sodium and LED.",
    date: "2026-03-08",
    readTime: "5 min",
    category: "Edit",
    image: MODELS.adventureAwaits,
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Marcus T.",
    rating: 5,
    text: "Embroidery is dense — no cheap shine. The Fifty Years sits perfect.",
    product: "Fifty Years Dad Cap",
  },
  {
    id: "r2",
    author: "Aya K.",
    rating: 5,
    text: "Harbor Navy feels premium out of the box. Soft crown, solid stitch.",
    product: "Gig Harbor Fly Shop",
  },
  {
    id: "r3",
    author: "Jordan L.",
    rating: 4,
    text: "Vegas Script is a statement piece. Worth the limited drop.",
    product: "Las Vegas Script",
  },
];

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return PRODUCTS.filter((p) => p.categorySlug === slug);
}

export function getRelated(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, limit);
}

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
