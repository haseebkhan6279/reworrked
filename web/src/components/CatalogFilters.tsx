"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/data";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export function CatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if (q !== (params.get("q") ?? "")) update("q", q);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="grid grid-cols-2 gap-2 border border-rw-border bg-rw-surface p-2 sm:gap-3 sm:p-3 md:grid-cols-3 md:p-4">
      <Input
        wrapperClassName="col-span-2 md:col-span-1"
        label="Search"
        value={q}
        placeholder="Name or SKU"
        onChange={(e) => setQ(e.target.value)}
      />
      <Select
        label="Category"
        defaultValue={params.get("category") ?? ""}
        onChange={(e) => update("category", e.target.value)}
      >
        <option value="">All</option>
        {CATEGORIES.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </Select>
      <Select
        label="Sort"
        defaultValue={params.get("sort") ?? "newest"}
        onChange={(e) => update("sort", e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price · Low to high</option>
        <option value="price-desc">Price · High to low</option>
        <option value="name">Name</option>
      </Select>
    </div>
  );
}
