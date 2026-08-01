import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AccountOverviewPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-[0.08em]">Overview</h1>
      <p className="mt-2 text-sm text-rw-muted">
        Welcome back. Account shell — wire to Nest users module.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-rw-border bg-rw-surface p-5">
          <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            Recent order
          </p>
          <p className="mt-2 text-sm">RW-ORD-0001 · In transit</p>
          <Link href="/account/orders" className="mt-4 inline-block">
            <Button variant="secondary" size="sm">
              View orders
            </Button>
          </Link>
        </div>
        <div className="border border-rw-border bg-rw-surface p-5">
          <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            Default address
          </p>
          <p className="mt-2 text-sm text-rw-muted">
            None saved yet.
          </p>
          <Link href="/account/addresses" className="mt-4 inline-block">
            <Button variant="secondary" size="sm">
              Manage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
