"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/data";
import { savePercent } from "@/lib/media";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  fillHeight = false,
}: {
  product: Product;
  fillHeight?: boolean;
}) {
  const save = savePercent(product.price, product.compareAtPrice);

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col border-b border-r border-rw-border bg-rw-surface",
        fillHeight && "h-full"
      )}
    >
      <div className="flex shrink-0 items-start justify-between gap-2 p-2.5 sm:gap-3 sm:p-3 md:p-4">
        <div className="min-w-0">
          <h3 className="truncate text-[10px] font-medium uppercase tracking-[0.1em] text-rw-text sm:text-[11px] md:text-xs">
            {product.name}
          </h3>
          <div className="mt-1 flex flex-wrap items-baseline gap-1.5 sm:mt-1.5 sm:gap-2">
            <span className="text-xs font-medium text-rw-sale sm:text-sm">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[10px] text-rw-muted line-through sm:text-xs">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "relative overflow-hidden bg-[#0d0d0d]",
          fillHeight ? "min-h-0 flex-1" : "aspect-[3/4]"
        )}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-card-img object-cover"
        />
        {save !== null && (
          <span className="absolute right-0 top-0 z-10 flex h-12 w-6 items-center justify-center bg-rw-sale text-[8px] font-semibold uppercase tracking-wider text-white [writing-mode:vertical-rl] rotate-180 sm:h-16 sm:w-7 sm:text-[9px]">
            Save {save}%
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-0 border-t border-rw-border bg-white md:translate-y-full md:transition-transform md:duration-300 md:group-hover:translate-y-0">
          <span className="flex h-9 items-center justify-center text-[10px] font-semibold uppercase tracking-[0.12em] text-black sm:h-11 sm:text-[11px] sm:tracking-[0.14em]">
            Choose options
          </span>
        </div>
      </div>
    </Link>
  );
}
