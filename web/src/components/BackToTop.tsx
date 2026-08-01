"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-4 z-40 border border-rw-border bg-rw-surface px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-rw-muted hover:border-rw-accent hover:text-rw-accent md:bottom-6"
    >
      Top
    </button>
  );
}
