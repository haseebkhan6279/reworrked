import { renderBrandOgImage } from "@/lib/seo/og-image";

export const alt = "REWORRKED — Premium Caps & Luxury Headwear";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderBrandOgImage(size);
}
