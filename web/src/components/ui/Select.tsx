import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    wrapperClassName?: string;
  }
>(({ className, label, children, wrapperClassName, ...props }, ref) => (
  <label className={cn("flex w-full flex-col gap-1.5 sm:gap-2", wrapperClassName)}>
    {label && (
      <span className="text-[10px] uppercase tracking-[0.12em] text-rw-muted sm:text-[11px]">
        {label}
      </span>
    )}
    <select
      ref={ref}
      className={cn(
        "h-10 w-full appearance-none border border-rw-border bg-rw-surface px-3 text-sm text-rw-text focus:border-rw-accent focus:outline-none sm:h-11 sm:px-4",
        className
      )}
      {...props}
    >
      {children}
    </select>
  </label>
));
Select.displayName = "Select";
