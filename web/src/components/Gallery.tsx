"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden bg-rw-surface">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden border bg-rw-surface",
              i === active ? "border-rw-accent" : "border-rw-border"
            )}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}
