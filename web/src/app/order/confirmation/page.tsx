"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";

function ConfirmationBody() {
  const params = useSearchParams();
  const order = params.get("order") ?? "RW-ORDER";

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
        Confirmed
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-[0.08em]">
        Order placed
      </h1>
      <p className="mt-4 text-sm text-rw-muted">
        Cash on delivery. We will call to confirm, then ship your order.
      </p>
      <p className="mt-2 font-mono text-xs text-rw-accent">{order}</p>
      <Link href="/products" className="mt-8">
        <Button>Continue shopping</Button>
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sm text-rw-muted">Loading…</div>
      }
    >
      <ConfirmationBody />
    </Suspense>
  );
}
