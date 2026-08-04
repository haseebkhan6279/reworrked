import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Design System",
  description: "REWORRKED dark tokens, type, and components.",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
        Reworrked / DesignSystem / Desktop
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-[0.08em] md:text-5xl">
        Design system
      </h1>
      <p className="mt-3 max-w-xl text-sm text-rw-muted">
        Dark-black collector tokens. Accent: bone. Display: Bebas Neue. UI: DM Sans.
      </p>

      <section className="mt-14">
        <h2 className="font-display text-2xl tracking-[0.08em]">Color</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {[
            ["Canvas", "#050505", "bg-rw-canvas border"],
            ["Surface", "#111111", "bg-rw-surface"],
            ["Surface 2", "#161616", "bg-rw-surface-2"],
            ["Border", "#2A2A2A", "bg-rw-border"],
            ["Text", "#F5F5F5", "bg-rw-text"],
            ["Muted", "#9A9A9A", "bg-rw-muted"],
            ["Bone", "#E8E4DC", "bg-rw-accent"],
            ["Sale", "#B33A3A", "bg-rw-sale"],
          ].map(([name, hex, cls]) => (
            <div key={name}>
              <div className={`aspect-square border border-rw-border ${cls}`} />
              <p className="mt-2 text-xs text-rw-text">{name}</p>
              <p className="font-mono text-[10px] text-rw-muted">{hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl tracking-[0.08em]">Type</h2>
        <p className="mt-4 font-display text-5xl tracking-[0.12em]">
          REWORRKED
        </p>
        <p className="mt-2 text-base text-rw-text">
          Body — DM Sans. Confident, sparse, nocturnal.
        </p>
        <p className="mt-1 font-mono text-xs text-rw-muted">
          Mono — SKU RW-FIT-001
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl tracking-[0.08em]">Buttons</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button size="lg">Large CTA</Button>
          <Button size="sm">Small</Button>
        </div>
      </section>

      <section className="mt-14 max-w-md">
        <h2 className="font-display text-2xl tracking-[0.08em]">Forms</h2>
        <div className="mt-4 space-y-3">
          <Input label="Email" placeholder="you@email.com" />
          <Select label="Category">
            <option>Fitted</option>
            <option>Snapback</option>
          </Select>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl tracking-[0.08em]">Badges & rating</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge tone="accent">Limited</Badge>
          <Badge tone="sale">Sale</Badge>
          <Badge tone="muted">New</Badge>
          <RatingStars rating={4.8} count={128} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl tracking-[0.08em]">Product card</h2>
        <div className="mt-4 grid max-w-xs grid-cols-1">
          <ProductCard product={PRODUCTS[0]} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl tracking-[0.08em]">Skeleton</h2>
        <div className="mt-4 grid max-w-xs gap-3">
          <ProductCardSkeleton />
          <Skeleton className="h-10 w-full" />
        </div>
      </section>

      <section className="mt-14 border-t border-rw-border pt-10">
        <h2 className="font-display text-2xl tracking-[0.08em]">Motion</h2>
        <ul className="mt-4 space-y-2 text-sm text-rw-muted">
          <li>Hero fade — 800ms ease-out, staggered 0.1 / 0.25 / 0.4s</li>
          <li>Product hover — image scale 1.04 · 400ms; price → bone</li>
          <li>Sticky header — bg + border on scroll · 200ms</li>
        </ul>
      </section>
    </div>
  );
}
