import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  count,
  size = "sm",
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const full = Math.floor(rating);
  const text = size === "sm" ? "text-xs" : "text-sm";
  return (
    <div className={cn("flex items-center gap-1.5 text-rw-muted", text)}>
      <span className="flex gap-0.5 text-rw-accent" aria-label={`${rating} of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < full ? "opacity-100" : "opacity-25"}>
            ★
          </span>
        ))}
      </span>
      {count !== undefined && (
        <span>
          {rating.toFixed(1)} ({count})
        </span>
      )}
    </div>
  );
}
