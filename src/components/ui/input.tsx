import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-border",
        "placeholder:text-subtle",
        "transition-[box-shadow] duration-150 ease-[var(--ease-out)]",
        "focus-visible:outline-none focus-visible:shadow-border-hover focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
