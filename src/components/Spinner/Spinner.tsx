"use client";

import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerColor = "primary" | "white" | "current";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  className?: string;
}

const sizePx: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

const colorValues: Record<SpinnerColor, string> = {
  primary: "var(--ck-primary)",
  white: "#ffffff",
  current: "currentColor",
};

export function Spinner({
  size = "md",
  color = "primary",
  label = "Loading…",
  className,
}: SpinnerProps) {
  const px = sizePx[size];
  const stroke = colorValues[color];

  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <motion.svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        aria-hidden="true"
      >
        {/* Track circle (low opacity) */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={stroke}
          strokeWidth="3"
          strokeOpacity="0.2"
          fill="none"
        />
        {/* Spinning arc */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="62.83"
          strokeDashoffset="40"
        />
      </motion.svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

Spinner.displayName = "Spinner";
