import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl tracking-[0.12em] text-rw-border">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl tracking-[0.08em]">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-rw-muted">
        This cut does not exist. Return to the shop.
      </p>
      <Link href="/" className="mt-8">
        <Button>Back home</Button>
      </Link>
    </div>
  );
}
