import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    wrapperClassName?: string;
  }
>(({ className, label, error, id, wrapperClassName, ...props }, ref) => (
  <label className={cn("flex w-full flex-col gap-1.5 sm:gap-2", wrapperClassName)}>
    {label && (
      <span className="text-[10px] uppercase tracking-[0.12em] text-rw-muted sm:text-[11px]">
        {label}
      </span>
    )}
    <input
      ref={ref}
      id={id}
      className={cn(
        "h-10 w-full border border-rw-border bg-rw-surface px-3 text-sm text-rw-text placeholder:text-rw-muted/60 transition-colors focus:border-rw-accent focus:outline-none sm:h-11 sm:px-4",
        error && "border-rw-sale",
        className
      )}
      {...props}
    />
    {error && <span className="text-xs text-rw-sale">{error}</span>}
  </label>
));
Input.displayName = "Input";
