"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Error({
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
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl tracking-[0.12em] text-rw-border">
        500
      </p>
      <h1 className="mt-4 font-display text-3xl tracking-[0.08em]">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm text-rw-muted">
        We could not load this page. Try again or return home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Link href="/">
          <Button variant="ghost">Back home</Button>
        </Link>
      </div>
    </div>
  );
}
