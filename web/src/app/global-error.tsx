"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#050505] text-[#F5F5F5]">
        <div className="mx-auto flex min-h-[100svh] max-w-lg flex-col items-center justify-center px-4 text-center">
          <p className="text-7xl tracking-[0.12em] text-[#2A2A2A]">500</p>
          <h1 className="mt-4 text-3xl tracking-[0.08em]">Something broke</h1>
          <p className="mt-3 text-sm text-[#9A9A9A]">
            Refresh and try again. If it keeps happening, contact support.
          </p>
          <div className="mt-8 flex gap-3">
            <Button type="button" onClick={reset}>
              Try again
            </Button>
            <Link href="/">
              <Button variant="ghost">Back home</Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
