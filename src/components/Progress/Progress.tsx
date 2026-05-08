"use client";

import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export type ProgressSize = "xs" | "sm" | "md" | "lg";
export type ProgressColor = "primary" | "success" | "warning" | "error";

export interface ProgressProps {
  value?: number;
  label?: string;
  showValue?: boolean;
  size?: ProgressSize;
  color?: ProgressColor;
  striped?: boolean;
  animated?: boolean;
  rounded?: boolean;
  className?: string;
}

const trackHeights: Record<ProgressSize, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const colorClasses: Record<ProgressColor, string> = {
  primary: "bg-[var(--ck-primary)]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

const stripedOverlay =
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 8px, transparent 8px, transparent 16px)";

export function Progress({
  value,
  label,
  showValue = false,
  size = "md",
  color = "primary",
  striped = false,
  animated = false,
  rounded = true,
  className,
}: ProgressProps) {
  const isIndeterminate = value === undefined;
  const clampedValue = isIndeterminate ? 0 : Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex flex-col gap-1.5 font-sans", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-[var(--ck-heading)]">
              {label}
            </span>
          )}
          {showValue && !isIndeterminate && (
            <span className="text-xs font-semibold tabular-nums text-[var(--ck-text-muted)]">
              {clampedValue}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[var(--ck-border)]",
          trackHeights[size],
          rounded ? "rounded-full" : "rounded-none",
        )}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        {isIndeterminate ? (
          /* Indeterminate: sliding bar */
          <motion.div
            className={cn(
              "absolute top-0 h-full w-1/3",
              colorClasses[color],
              rounded ? "rounded-full" : "rounded-none",
            )}
            animate={{ x: ["calc(-100%)", "calc(300%)"] }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "easeInOut",
            }}
          />
        ) : (
          /* Determinate bar */
          <motion.div
            className={cn(
              "absolute left-0 top-0 h-full",
              colorClasses[color],
              rounded ? "rounded-full" : "rounded-none",
              animated && "animate-pulse",
            )}
            style={{
              backgroundImage: striped ? stripedOverlay : undefined,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </div>
    </div>
  );
}

Progress.displayName = "Progress";
