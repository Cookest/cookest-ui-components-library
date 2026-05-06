"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "className"> {
  label?: string;
  description?: string;
  toggleSize?: ToggleSize;
  className?: string;
}

const trackSizes: Record<ToggleSize, string> = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-[52px]",
};

const thumbSizes: Record<ToggleSize, { size: number; travel: number }> = {
  sm: { size: 14, travel: 16 },
  md: { size: 18, travel: 20 },
  lg: { size: 22, travel: 24 },
};

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, toggleSize = "md", className, checked, disabled, id: externalId, ...props }, ref) => {
    const autoId = useId();
    const inputId = externalId ?? autoId;
    const thumb = thumbSizes[toggleSize];

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer items-center gap-3 font-sans",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <span className="relative inline-flex items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            aria-checked={!!checked}
            className="sr-only"
            checked={checked}
            disabled={disabled}
            {...props}
          />
          <span
            className={cn(
              "rounded-full transition-colors",
              trackSizes[toggleSize],
              checked ? "bg-[var(--ck-primary)]" : "bg-[var(--ck-border)]",
            )}
          />
          <motion.span
            className="absolute left-1 rounded-full bg-white shadow-sm"
            style={{ width: thumb.size, height: thumb.size }}
            animate={{ x: checked ? thumb.travel : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </span>
        {(label || description) && (
          <span className="flex flex-col">
            {label && <span className="text-sm font-medium text-[var(--ck-heading)]">{label}</span>}
            {description && <span className="text-xs text-[var(--ck-text-muted)]">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
