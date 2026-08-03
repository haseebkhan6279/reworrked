"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/components/cart/CartProvider";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, clearCart } = useCart();
  const shipping = 0;
  const total = subtotal + shipping;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Nothing to checkout"
        description="Add a cap before checkout."
        actionLabel="Shop Caps"
        onAction={() => {
          window.location.href = "/products";
        }}
      />
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const fd = new FormData(e.currentTarget);

    const payload = {
      customer: {
        fullName: String(fd.get("fullName") ?? "").trim(),
        phone: String(fd.get("phone") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        address: String(fd.get("address") ?? "").trim(),
        city: String(fd.get("city") ?? "").trim(),
        province: String(fd.get("province") ?? "").trim(),
        postalCode: String(fd.get("postalCode") ?? "").trim(),
        country: "Pakistan",
        notes: String(fd.get("notes") ?? "").trim(),
      },
      items: lines.map((l) => ({
        productId: l.product.id,
        name: l.product.name,
        slug: l.product.slug,
        price: l.product.price,
        qty: l.qty,
        size: l.size,
        color: l.color,
        image: l.product.images[0] ?? "",
      })),
    };

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message ?? "Order failed");
      }
      clearCart();
      router.push(
        `/order/confirmation?order=${encodeURIComponent(data.orderNumber)}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-display text-4xl tracking-[0.08em]">Checkout</h1>
      <p className="mt-2 text-sm text-rw-muted">
        Cash on delivery · Prices in PKR
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form className="space-y-8" onSubmit={onSubmit}>
          <section>
            <h2 className="font-display text-xl tracking-[0.08em]">
              Customer details
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input label="Full name" name="fullName" required />
              </div>
              <Input
                label="Phone"
                name="phone"
                type="tel"
                placeholder="03XX XXXXXXX"
                required
              />
              <Input label="Email (optional)" name="email" type="email" />
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl tracking-[0.08em]">
              Delivery address
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input label="Street address" name="address" required />
              </div>
              <Input label="City" name="city" required />
              <Select label="Province" name="province" defaultValue="Punjab" required>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
              <Input label="Postal code" name="postalCode" />
              <Input
                label="Country"
                name="country"
                defaultValue="Pakistan"
                disabled
              />
              <div className="sm:col-span-2">
                <label className="flex w-full flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-rw-muted sm:text-[11px]">
                    Order notes (optional)
                  </span>
                  <textarea
                    name="notes"
                    rows={3}
                    className="w-full border border-rw-border bg-rw-surface px-3 py-2 text-sm text-rw-text focus:border-rw-accent focus:outline-none"
                    placeholder="Landmark, preferred delivery time…"
                  />
                </label>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl tracking-[0.08em]">Payment</h2>
            <div className="mt-4 border border-rw-border bg-rw-surface p-4">
              <p className="text-sm font-medium text-rw-text">
                Cash on Delivery (COD)
              </p>
              <p className="mt-1 text-xs text-rw-muted">
                Pay in cash when your order arrives. No card payment required.
              </p>
            </div>
          </section>

          {error && <p className="text-sm text-rw-sale">{error}</p>}

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={submitting}
          >
            {submitting
              ? "Placing order…"
              : `Place COD order · ${formatPrice(total)}`}
          </Button>
        </form>

        <aside className="h-fit border border-rw-border bg-rw-surface p-6 lg:sticky lg:top-24">
          <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            Order summary
          </p>
          <ul className="mt-4 space-y-3 border-b border-rw-border pb-4">
            {lines.map((l) => (
              <li
                key={`${l.product.id}-${l.size}-${l.color}`}
                className="flex justify-between gap-3 text-sm"
              >
                <span className="text-rw-muted">
                  {l.product.name} × {l.qty}
                </span>
                <span>{formatPrice(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-rw-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rw-muted">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t border-rw-border pt-3 text-base">
              <span>Total (COD)</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link
            href="/cart"
            className="mt-4 block text-center text-xs uppercase tracking-[0.12em] text-rw-muted hover:text-rw-text"
          >
            Edit cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
