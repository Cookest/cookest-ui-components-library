"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "../../utils/cn";

export type InputSize = "sm" | "md" | "lg";

/** Props for the {@link Input} component. */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "className"> {
  /** Accessible label rendered above the input. */
  label?: string;
  /** Hint text shown below the input when there is no error. */
  helperText?: string;
  /** Error message — sets `aria-invalid` and styles the border red. */
  error?: string;
  /** Icon rendered inside the left edge of the input. */
  iconLeft?: ReactNode;
  /** Icon rendered inside the right edge of the input. */
  iconRight?: ReactNode;
  /** Visual size of the input field. Defaults to `'md'`. */
  inputSize?: InputSize;
  /** Expands the wrapper to 100% container width. */
  fullWidth?: boolean;
  className?: string;
}

const sizeStyles: Record<InputSize, { wrapper: string; input: string; label: string }> = {
  sm: {
    wrapper: "text-sm",
    input: "px-3 py-1.5 text-sm rounded-lg",
    label: "text-xs mb-1",
  },
  md: {
    wrapper: "text-sm",
    input: "px-4 py-2.5 text-sm rounded-xl",
    label: "text-sm mb-1.5",
  },
  lg: {
    wrapper: "text-base",
    input: "px-5 py-3.5 text-base rounded-xl",
    label: "text-base mb-2",
  },
};

/**
 * Accessible text input field with optional label, helper text, error state, and icon slots.
 * Generates a stable `id` automatically when none is provided.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      iconLeft,
      iconRight,
      inputSize = "md",
      fullWidth = false,
      className,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = externalId ?? autoId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText && !error ? `${inputId}-helper` : undefined;
    const sizes = sizeStyles[inputSize];

    return (
      <div className={cn("flex flex-col font-sans", fullWidth && "w-full", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "font-medium text-[var(--ck-heading)]",
              sizes.label,
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ck-text-muted)]">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={errorId ?? helperId}
            className={cn(
              "w-full border bg-[var(--ck-surface)] font-sans text-[var(--ck-heading)] transition-all",
              "placeholder:text-[var(--ck-text-muted)]",
              "focus:outline-2 focus:outline-offset-0 focus:outline-[var(--ck-primary)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-[var(--ck-error)] focus:outline-[var(--ck-error)]"
                : "border-[var(--ck-border)] hover:border-[var(--ck-primary)]",
              sizes.input,
              iconLeft && "pl-10",
              iconRight && "pr-10",
            )}
            {...props}
          />
          {iconRight && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ck-text-muted)]">
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <p id={errorId} role="alert" className="mt-1 text-xs text-[var(--ck-error)]">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="mt-1 text-xs text-[var(--ck-text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
