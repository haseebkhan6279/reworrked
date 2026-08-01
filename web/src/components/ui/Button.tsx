import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-rw-accent text-rw-accent-ink hover:bg-white active:bg-rw-accent/90",
  secondary:
    "border border-rw-border bg-transparent text-rw-text hover:border-rw-accent hover:text-rw-accent",
  ghost: "bg-transparent text-rw-muted hover:text-rw-text",
  danger: "bg-rw-sale/15 text-rw-sale hover:bg-rw-sale/25",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs tracking-wide",
  md: "h-11 px-6 text-sm tracking-wide",
  lg: "h-12 px-8 text-sm tracking-[0.08em] uppercase",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-sans font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
