"use client";

import { useState, useCallback, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface SliderMark {
  value: number;
  label?: string;
}

export type SliderSize = "sm" | "md" | "lg";
export type SliderColor = "primary" | "success" | "warning" | "error";

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  size?: SliderSize;
  color?: SliderColor;
  marks?: SliderMark[];
  onChange?: (value: number) => void;
  className?: string;
}

const trackHeights: Record<SliderSize, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

const thumbSizes: Record<SliderSize, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

const colorClasses: Record<SliderColor, string> = {
  primary: "bg-[var(--ck-primary)]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  size = "md",
  color = "primary",
  marks,
  onChange,
  className,
}: SliderProps) {
  const id = useId();
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;

  const fillPercent = ((currentValue - min) / (max - min)) * 100;
  const thumbSize = thumbSizes[size];
  const halfThumb = thumbSize / 2;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return (
    <div className={cn("flex flex-col gap-2 font-sans", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-[var(--ck-heading)]"
            >
              {label}
            </label>
          )}
          {showValue && (
            <span className="rounded-md bg-[var(--ck-surface)] px-2 py-0.5 text-xs font-semibold tabular-nums text-[var(--ck-heading)]">
              {currentValue}
            </span>
          )}
        </div>
      )}

      <div
        className="relative w-full"
        style={{ paddingBottom: marks && marks.length > 0 ? "20px" : undefined }}
      >
        {/* Track container */}
        <div className={cn("relative w-full rounded-full", trackHeights[size])}>
          {/* Track background */}
          <div className="absolute inset-0 rounded-full bg-[var(--ck-border)]" />

          {/* Filled portion */}
          <div
            className={cn(
              "absolute left-0 top-0 h-full rounded-full transition-all duration-100",
              colorClasses[color],
              disabled && "opacity-50",
            )}
            style={{ width: `${fillPercent}%` }}
          />

          {/* Native range input (invisible, handles interaction) */}
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            disabled={disabled}
            onChange={handleChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
          />

          {/* Custom thumb */}
          <motion.div
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md",
              colorClasses[color],
              disabled && "opacity-50",
            )}
            style={{
              width: thumbSize,
              height: thumbSize,
              left: `calc(${fillPercent}% - ${halfThumb}px)`,
            }}
            whileHover={disabled ? undefined : { scale: 1.2 }}
            whileTap={disabled ? undefined : { scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        </div>

        {/* Marks */}
        {marks && marks.length > 0 && (
          <div className="relative mt-2 w-full">
            {marks.map((mark) => {
              const markPercent = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${markPercent}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="h-1 w-0.5 rounded-full bg-[var(--ck-border)]" />
                  {mark.label && (
                    <span className="mt-0.5 text-[10px] text-[var(--ck-text-muted)]">
                      {mark.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

Slider.displayName = "Slider";
