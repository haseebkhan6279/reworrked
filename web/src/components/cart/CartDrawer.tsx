"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { storeProductPath } from "@/lib/paths";
import { Button } from "@/components/ui/Button";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { lines, isOpen, closeCart, subtotal, updateQty, removeItem, lineKey } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-rw-border bg-rw-canvas">
        <div className="flex items-center justify-between border-b border-rw-border px-5 py-4">
          <h2 className="font-display text-2xl tracking-[0.1em]">Cart</h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-rw-muted hover:text-rw-text"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-sm text-rw-muted">Your cart is empty.</p>
              <Link href="/products" onClick={closeCart}>
                <Button variant="secondary">Shop caps</Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => {
                const k = lineKey(line);
                return (
                  <li
                    key={k}
                    className="flex gap-4 border-b border-rw-border pb-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 bg-rw-surface">
                      <Image
                        src={line.product.images[0]}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <Link
                        href={storeProductPath(line.product.slug)}
                        onClick={closeCart}
                        className="text-sm hover:text-rw-accent"
                      >
                        {line.product.name}
                      </Link>
                      <p className="text-xs text-rw-muted">
                        {line.color} · {line.size}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-rw-border">
                          <button
                            type="button"
                            className="h-8 w-8 text-rw-muted hover:text-rw-text"
                            onClick={() => updateQty(k, line.qty - 1)}
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-xs">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            className="h-8 w-8 text-rw-muted hover:text-rw-text"
                            onClick={() => updateQty(k, line.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
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
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-rw-border px-5 py-5">
            <div className="mb-4 flex justify-between text-sm">
              <span className="text-rw-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="block">
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-3 block text-center text-xs uppercase tracking-[0.12em] text-rw-muted hover:text-rw-text"
            >
              View cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
