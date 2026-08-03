"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Gallery } from "@/components/Gallery";
import { SpecTable } from "@/components/SpecTable";
import { ProductCard } from "@/components/ProductCard";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          {
            label: product.category,
            href: `/category/${product.categorySlug}`,
          },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Gallery images={product.images} alt={product.name} />

        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            {product.brand}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">
              {product.name}
            </h1>
            {product.badge && (
              <Badge tone={product.badge === "Limited" ? "accent" : "muted"}>
                {product.badge}
              </Badge>
            )}
          </div>
          <p className="mt-2 font-mono text-xs text-rw-muted">{product.sku}</p>
          <div className="mt-3">
            <RatingStars
              rating={product.rating}
              count={product.reviewCount}
              size="md"
            />
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl text-rw-text">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-rw-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <p
            className={cn(
              "mt-2 text-xs uppercase tracking-[0.12em]",
              product.stock <= 5 ? "text-rw-sale" : "text-rw-muted"
            )}
          >
            {product.stock <= 0
              ? "Sold out"
              : product.stock <= 5
                ? `Only ${product.stock} left`
                : "In stock"}
          </p>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
              Colorway
            </p>
            <div className="mt-3 flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={() => setColor(c.name)}
                  className={cn(
                    "h-8 w-8 border-2",
                    color === c.name ? "border-rw-accent" : "border-rw-border"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-rw-muted">{color}</p>
          </div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
              Size / Fit
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "h-10 min-w-12 border px-3 text-xs",
                    size === s
                      ? "border-rw-accent bg-rw-accent text-rw-accent-ink"
                      : "border-rw-border text-rw-muted hover:text-rw-text"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-rw-border">
              <button
                type="button"
                className="h-11 w-11 text-rw-muted"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                type="button"
                className="h-11 w-11 text-rw-muted"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1 sm:flex-none"
              disabled={product.stock <= 0}
              onClick={() => addItem(product, size, color, qty)}
            >
              Add to cart
            </Button>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-rw-muted">
            {product.description}
          </p>
          <ul className="mt-4 space-y-2">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="text-sm text-rw-text before:mr-2 before:text-rw-accent before:content-['—']"
              >
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h2 className="mb-4 font-display text-xl tracking-[0.08em]">
              Specs
            </h2>
            <SpecTable specs={product.specs} />
          </div>

          <p className="mt-8 text-xs leading-relaxed text-rw-muted">
            Free shipping on all orders · 30-day returns · Authenticity guaranteed
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-rw-border pt-12">
          <h2 className="font-display text-2xl tracking-[0.08em]">Related</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
