"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { MODELS } from "@/lib/media";
import { ProductCard } from "@/components/ProductCard";

export function CollectionRail({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const amount =
      typeof window !== "undefined" && window.innerWidth < 640 ? 280 : 320;
    ref.current?.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative bg-rw-canvas">
      <div className="flex items-center justify-between px-4 py-5 md:px-6 md:py-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-rw-muted">
          Explore collections
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rw-border text-rw-text hover:border-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rw-border text-rw-text hover:border-white"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex h-[min(68svh,560px)] snap-x snap-mandatory items-stretch overflow-x-auto overscroll-x-contain scrollbar-none sm:h-[min(75svh,680px)] md:h-[min(85vh,820px)]"
      >
        <div className="relative h-full w-[82vw] shrink-0 snap-start border-r border-rw-border sm:w-[380px] md:w-[380px]">
          <Image
            src={MODELS.dadsClub}
            alt="Dad's Club worn"
            fill
            className="object-cover"
            sizes="(max-width:640px) 82vw, 380px"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-8">
            <h2 className="font-display text-3xl tracking-[0.1em] text-white sm:text-4xl md:text-5xl">
              Night
              <br />
              Collection
            </h2>
            <p className="mt-3 max-w-xs text-[10px] uppercase leading-relaxed tracking-[0.14em] text-white/80 sm:mt-4 sm:text-[11px]">
              Elevated dad caps & limited embroidery — cut for the dark hours.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex h-11 items-center bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-black hover:bg-rw-accent sm:mt-8 sm:px-8"
            >
              View all
            </Link>
          </div>
        </div>

        {products.map((p) => (
          <div
            key={p.id}
            className="h-full w-[72vw] shrink-0 snap-start sm:w-[260px] md:w-[300px]"
          >
            <ProductCard product={p} fillHeight />
          </div>
        ))}
      </div>
    </section>
  );
}
