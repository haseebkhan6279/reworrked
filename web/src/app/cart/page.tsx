"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CartPage() {
  const { lines, subtotal, updateQty, removeItem, lineKey } = useCart();

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Cart empty"
        description="No caps yet. Start with the current cut."
        actionLabel="Shop Caps"
        onAction={() => {
          window.location.href = "/products";
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-display text-4xl tracking-[0.08em]">Cart</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-4">
          {lines.map((line) => {
            const k = lineKey(line);
            return (
              <li
                key={k}
                className="flex gap-4 border border-rw-border bg-rw-surface p-4"
              >
                <div className="relative h-24 w-24 shrink-0 bg-rw-canvas">
                  <Image
                    src={line.product.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/products/${line.product.slug}`}
                    className="text-sm hover:text-rw-accent"
                  >
                    {line.product.name}
                  </Link>
                  <p className="text-xs text-rw-muted">
                    {line.color} · {line.size}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex border border-rw-border">
                      <button
                        type="button"
                        className="h-8 w-8"
                        onClick={() => updateQty(k, line.qty - 1)}
                      >
                        −
                      </button>
                      <span className="flex w-8 items-center justify-center text-xs">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        className="h-8 w-8"
                        onClick={() => updateQty(k, line.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">
                        {formatPrice(line.product.price * line.qty)}
                      </span>
                      <button
                        type="button"
                        className="text-xs text-rw-muted hover:text-rw-sale"
                        onClick={() => removeItem(k)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit border border-rw-border bg-rw-surface p-6 lg:sticky lg:top-24">
          <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            Summary
          </p>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-rw-muted">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-rw-muted">
            Free shipping on all orders.
          </p>
          <Link href="/checkout" className="mt-6 block">
            <Button className="w-full" size="lg">
              Checkout
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
