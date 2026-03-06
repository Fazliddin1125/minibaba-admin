import React from "react";
import { cn } from "@/lib/utils";

// Output: +998 XX XXX XX XX
const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  const local = digits.startsWith("998") ? digits.slice(3) : digits;
  const d = local.slice(0, 9);

  let result = "+998";
  if (d.length > 0) result += " " + d.slice(0, 2);
  if (d.length > 2) result += " " + d.slice(2, 5);
  if (d.length > 5) result += " " + d.slice(5, 7);
  if (d.length > 7) result += " " + d.slice(7, 9);
  return result;
};

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
};

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, onBlur, hasError }, ref) => {
    return (
      <input
        ref={ref}
        type="tel"
        value={value}
        onChange={(e) => onChange(formatPhone(e.target.value))}
        onBlur={onBlur}
        placeholder="+998 00 000 00 00"
        className={cn(
          "w-full rounded-lg border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
          "outline-none transition-colors",
          "focus:ring-2 focus:ring-primary/25 focus:border-primary",
          hasError
            ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
            : "border-border hover:border-border/80"
        )}
      />
    );
  }
);
PhoneInput.displayName = "PhoneInput";