"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/** Props for the {@link Button} component. */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  /** Visual style variant. Defaults to `'primary'`. */
  variant?: ButtonVariant;
  /** Control size. Defaults to `'md'`. */
  size?: ButtonSize;
  /** Shows a loading spinner and disables the button when `true`. */
  loading?: boolean;
  /** Icon rendered to the left of the label. */
  iconLeft?: ReactNode;
  /** Icon rendered to the right of the label. */
  iconRight?: ReactNode;
  /** Expands the button to 100% container width. */
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--ck-primary)] text-white hover:bg-[var(--ck-primary-dark)] shadow-[0_4px_16px_rgba(122,154,101,0.35)] hover:shadow-[0_8px_28px_rgba(122,154,101,0.5)]",
  secondary:
    "bg-[var(--ck-surface)] text-[var(--ck-heading)] border border-[var(--ck-border)] hover:bg-[var(--ck-bg-card)] hover:border-[var(--ck-primary)]",
  ghost:
    "bg-transparent text-[var(--ck-heading)] hover:bg-[var(--ck-bg-card)]",
  danger:
    "bg-[var(--ck-error)] text-white hover:bg-red-700 shadow-[0_4px_16px_rgba(244,67,54,0.3)]",
};

export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5 rounded-lg",
  md: "px-5 py-2.5 text-sm gap-2 rounded-xl",
  lg: "px-7 py-3.5 text-base gap-2.5 rounded-xl",
};

export const buttonBaseStyles =
  "relative inline-flex flex-row cursor-pointer items-center justify-center font-sans font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ck-primary)] disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden whitespace-nowrap";

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin shrink-0", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Primary interactive button. Supports 4 variants (`primary`, `secondary`, `ghost`, `danger`)
 * and 3 sizes. Includes a built-in loading state with spinner.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? undefined : { y: -1 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={cn(
          buttonBaseStyles,
          buttonVariantStyles[variant],
          buttonSizeStyles[size],
          fullWidth && "w-full",
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading}
        {...(props as HTMLMotionProps<"button">)}
      >
        {loading && <LoadingSpinner />}
        {!loading && iconLeft}
        {loading ? <span className="opacity-70">{children}</span> : children}
        {!loading && iconRight}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
