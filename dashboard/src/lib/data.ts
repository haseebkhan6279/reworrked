export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  status: "draft" | "published";
  thumb: string;
  tags: string[];
  description: string;
  highlights: string[];
  specifications: { key: string; value: string }[];
  images: string[];
  seoTitle: string;
  seoDescription: string;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
};

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}
