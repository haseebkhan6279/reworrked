import Link from "next/link";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  basePath,
}: {
  page: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="flex items-center justify-center gap-2 pt-10" aria-label="Pagination">
      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}${basePath.includes("?") ? "&" : "?"}page=${p}`}
          className={cn(
            "flex h-10 w-10 items-center justify-center border text-sm",
            p === page
              ? "border-rw-accent bg-rw-accent text-rw-accent-ink"
              : "border-rw-border text-rw-muted hover:text-rw-text"
          )}
        >
          {p}
        </Link>
      ))}
    </nav>
  );
}
