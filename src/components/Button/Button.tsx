"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
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
  "relative inline-flex cursor-pointer items-center justify-center font-sans font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ck-primary)] disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden";

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
