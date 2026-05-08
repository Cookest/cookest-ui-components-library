"use client";

import { forwardRef, useEffect, useId, useRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label?: string;
  helperText?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  autoResize?: boolean;
  inputSize?: TextareaSize;
  fullWidth?: boolean;
  className?: string;
}

const sizeStyles: Record<TextareaSize, { textarea: string; label: string }> = {
  sm: {
    textarea: "px-3 py-1.5 text-sm rounded-lg min-h-[60px]",
    label: "text-xs mb-1",
  },
  md: {
    textarea: "px-4 py-2.5 text-sm rounded-xl min-h-[80px]",
    label: "text-sm mb-1.5",
  },
  lg: {
    textarea: "px-5 py-3.5 text-base rounded-xl min-h-[100px]",
    label: "text-base mb-2",
  },
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      maxLength,
      showCount = false,
      resize = "vertical",
      autoResize = false,
      inputSize = "md",
      fullWidth = false,
      className,
      id: externalId,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const textareaId = externalId ?? autoId;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText && !error ? `${textareaId}-helper` : undefined;
    const sizes = sizeStyles[inputSize];

    // Internal ref for autoResize (merged with forwarded ref)
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? internalRef;

    // Track character count from controlled or uncontrolled value
    const currentLength =
      value != null
        ? String(value).length
        : (defaultValue != null ? String(defaultValue).length : 0);

    function adjustHeight() {
      const el = resolvedRef.current;
      if (!el || !autoResize) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }

    useEffect(() => {
      adjustHeight();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, autoResize]);

    const resizeStyle = autoResize ? "none" : resize;

    return (
      <div className={cn("flex flex-col font-sans", fullWidth && "w-full", className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn("font-medium text-[var(--ck-heading)]", sizes.label)}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={resolvedRef}
            id={textareaId}
            aria-invalid={!!error}
            aria-describedby={errorId ?? helperId}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => {
              adjustHeight();
              onChange?.(e);
            }}
            style={{ resize: resizeStyle }}
            className={cn(
              "w-full border bg-[var(--ck-surface)] font-sans text-[var(--ck-heading)] transition-all",
              "placeholder:text-[var(--ck-text-muted)]",
              "focus:outline-2 focus:outline-offset-0 focus:outline-[var(--ck-primary)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-[var(--ck-error)] focus:outline-[var(--ck-error)]"
                : "border-[var(--ck-border)] hover:border-[var(--ck-primary)]",
              sizes.textarea,
              showCount && "pb-6",
            )}
            {...props}
          />

          {showCount && (
            <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-[var(--ck-text-muted)]">
              {currentLength}
              {maxLength != null && `/${maxLength}`}
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

Textarea.displayName = "Textarea";
