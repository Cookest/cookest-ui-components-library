"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  visible?: boolean;
  className?: string;
  children: ReactNode;
}

const variantConfig: Record<
  AlertVariant,
  { accent: string; glass: string; iconColor: string; titleColor: string; bodyColor: string; shadow: string }
> = {
  info: {
    accent: "bg-blue-500",
    glass:
      "bg-blue-500/10 border-blue-400/30 dark:bg-blue-400/10 dark:border-blue-400/25",
    iconColor: "text-blue-500 dark:text-blue-400",
    titleColor: "text-blue-900 dark:text-blue-200",
    bodyColor: "text-blue-800/80 dark:text-blue-300/90",
    shadow: "shadow-blue-500/15",
  },
  success: {
    accent: "bg-emerald-500",
    glass:
      "bg-emerald-500/10 border-emerald-400/30 dark:bg-emerald-400/10 dark:border-emerald-400/25",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    titleColor: "text-emerald-900 dark:text-emerald-200",
    bodyColor: "text-emerald-800/80 dark:text-emerald-300/90",
    shadow: "shadow-emerald-500/15",
  },
  warning: {
    accent: "bg-amber-500",
    glass:
      "bg-amber-500/10 border-amber-400/30 dark:bg-amber-400/10 dark:border-amber-400/25",
    iconColor: "text-amber-500 dark:text-amber-400",
    titleColor: "text-amber-900 dark:text-amber-200",
    bodyColor: "text-amber-800/80 dark:text-amber-300/90",
    shadow: "shadow-amber-500/15",
  },
  error: {
    accent: "bg-red-500",
    glass:
      "bg-red-500/10 border-red-400/30 dark:bg-red-400/10 dark:border-red-400/25",
    iconColor: "text-red-500 dark:text-red-400",
    titleColor: "text-red-900 dark:text-red-200",
    bodyColor: "text-red-800/80 dark:text-red-300/90",
    shadow: "shadow-red-500/15",
  },
};

const sizeConfig: Record<AlertSize, { padding: string; text: string; iconSize: number; gap: string }> = {
  sm: { padding: "pl-5 pr-3 py-3", text: "text-xs", iconSize: 16, gap: "gap-2.5" },
  md: { padding: "pl-6 pr-4 py-4", text: "text-sm", iconSize: 20, gap: "gap-3" },
  lg: { padding: "pl-7 pr-5 py-5", text: "text-base", iconSize: 24, gap: "gap-4" },
};

const iconMap: Record<AlertVariant, (size: number) => ReactNode> = {
  info: (size) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (size) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (size) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (size) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
};

export function Alert({
  variant = "info",
  size = "md",
  title,
  dismissible = false,
  onDismiss,
  icon,
  visible = true,
  className,
  children,
}: AlertProps) {
  const cfg = variantConfig[variant];
  const sz = sizeConfig[size];
  const displayIcon = icon ?? iconMap[variant](sz.iconSize);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "relative flex items-start overflow-hidden rounded-xl border font-sans",
            "backdrop-blur-sm shadow-lg",
            cfg.glass,
            cfg.shadow,
            sz.gap,
            sz.padding,
            className,
          )}
        >
          {/* Left accent bar */}
          <div
            className={cn("absolute left-0 top-0 bottom-0 w-1", cfg.accent)}
            aria-hidden="true"
          />

          {/* Icon */}
          <span className={cn("mt-0.5 shrink-0", cfg.iconColor)}>{displayIcon}</span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <p className={cn("mb-0.5 font-semibold leading-snug", cfg.titleColor, sz.text)}>
                {title}
              </p>
            )}
            <div className={cn("leading-relaxed", cfg.bodyColor, sz.text)}>{children}</div>
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className={cn(
                "shrink-0 rounded-lg p-1 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-1",
                cfg.iconColor,
              )}
              aria-label="Dismiss alert"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
