import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

//  Label ────────────────────────────────────────────────────────────────────

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className, children, ...props }: LabelProps) => (
  <label
    className={cn("block text-sm font-medium text-foreground mb-1.5", className)}
    {...props}
  >
    {children}
  </label>
);

// ─── Input ────────────────────────────────────────────────────────────────────

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-lg border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
        "outline-none transition-colors",
        "focus:ring-2 focus:ring-primary/25 focus:border-primary",
        hasError
          ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
          : "border-border hover:border-border/80",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

// ─── Select ───────────────────────────────────────────────────────────────────

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-lg border bg-card px-3.5 py-2.5 text-sm text-foreground",
          "outline-none transition-colors cursor-pointer",
          "focus:ring-2 focus:ring-primary/25 focus:border-primary",
          hasError
            ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
            : "border-border hover:border-border/80",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    </div>
  )
);
Select.displayName = "Select";

// ─── FieldError ───────────────────────────────────────────────────────────────

type FieldErrorProps = {
  message?: string;
};

export const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
};