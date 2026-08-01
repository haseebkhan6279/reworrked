"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Client-only countdown to avoid SSR/client time mismatch */
export function Countdown({
  endAt,
  variant = "inline",
}: {
  endAt: string;
  variant?: "inline" | "blocks";
}) {
  const [parts, setParts] = useState<{
    d: string;
    h: string;
    m: string;
    s: string;
  } | null>(null);

  useEffect(() => {
    const target = new Date(endAt).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setParts({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endAt]);

  const values = parts ?? { d: "--", h: "--", m: "--", s: "--" };
  const units = [
    { label: "Days", value: values.d },
    { label: "Hours", value: values.h },
    { label: "Mins", value: values.m },
    { label: "Secs", value: values.s },
  ];

  if (variant === "blocks") {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex flex-col items-center border border-white/25 bg-black/50 px-2 py-4 backdrop-blur-sm sm:py-5 md:px-4 md:py-6"
          >
            <span className="font-display text-2xl tracking-[0.1em] text-white sm:text-4xl md:text-6xl">
              {u.value}
            </span>
            <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/55 md:text-[10px]">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-5 font-display text-4xl tracking-[0.2em] text-white md:gap-8 md:text-5xl"
      )}
    >
      {units.map((u) => (
        <span key={u.label}>{u.value}</span>
      ))}
    </div>
  );
}
