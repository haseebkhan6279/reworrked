import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-rw-surface-2",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
