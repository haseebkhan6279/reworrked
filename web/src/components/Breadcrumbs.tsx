import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-rw-muted">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-rw-border">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-rw-text">
              {item.label}
            </Link>
          ) : (
            <span className="text-rw-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
