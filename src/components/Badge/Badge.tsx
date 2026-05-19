"use client";

import * as React from "react";
import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md" | "lg";

/** Props for the {@link Badge} component. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour variant conveying semantic meaning. Defaults to `'default'`. */
  variant?: BadgeVariant;
  /** Badge size. Defaults to `'md'`. */
  size?: BadgeSize;
  /** Renders a small coloured dot before the label. */
  dot?: boolean;
  /** Shows a remove (×) button when `true`. */
  removable?: boolean;
  /** Called when the remove button is clicked. */
  onRemove?: () => void;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--ck-bg-card)] text-[var(--ck-heading)] border border-[var(--ck-border)]",
  success: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300",
  error: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300",
  info: "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300",
};

const dotColorStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--ck-text-muted)]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

/**
 * Inline label badge for status, category, or count display.
 * Supports 5 semantic colour variants and an optional removable affordance.
 */
export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  removable = false,
  onRemove,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-sans font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("inline-block h-1.5 w-1.5 rounded-full", dotColorStyles[variant])}
          aria-hidden="true"
        />
      )}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 inline-flex items-center rounded-full p-0.5 hover:opacity-70 focus:outline-none"
          aria-label="Remove"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
}
