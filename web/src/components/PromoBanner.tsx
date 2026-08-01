"use client";

import { useState } from "react";

export function PromoBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative z-[51] bg-transparent px-3 py-2 text-center sm:px-4">
      <p className="pr-8 text-[9px] uppercase leading-snug tracking-[0.14em] text-white/80 sm:text-[10px] sm:tracking-[0.18em]">
        Free shipping over Rs 5,000 · Night collection live
      </p>
      <button
        type="button"
        aria-label="Dismiss promo"
        onClick={() => setOpen(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
