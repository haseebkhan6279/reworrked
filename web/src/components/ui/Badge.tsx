import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "sale" | "muted";
  className?: string;
}) {
  const tones = {
    default: "border-rw-border text-rw-muted",
    accent: "border-rw-accent/40 text-rw-accent",
    sale: "border-rw-sale/40 text-rw-sale",
    muted: "border-transparent bg-rw-surface-3 text-rw-muted",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
