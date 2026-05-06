"use client";

import { type ImgHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "className" | "alt"> {
  src?: string;
  alt: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ src, alt, initials, size = "md", className, ...props }: AvatarProps) {
  const displayInitials = initials ?? getInitials(alt);

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "inline-block rounded-full object-cover ring-2 ring-[var(--ck-surface)]",
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={alt}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[var(--ck-primary)] font-sans font-semibold text-white ring-2 ring-[var(--ck-surface)]",
        sizeStyles[size],
        className,
      )}
    >
      {displayInitials}
    </span>
  );
}

export interface AvatarGroupProps {
  max?: number;
  children: React.ReactNode;
  className?: string;
}

export function AvatarGroup({ max, children, className }: AvatarGroupProps) {
  const childArray = Array.isArray(children) ? children : [children];
  const visible = max ? childArray.slice(0, max) : childArray;
  const overflow = max ? childArray.length - max : 0;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visible}
      {overflow > 0 && (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ck-bg-card)] text-sm font-semibold text-[var(--ck-heading)] ring-2 ring-[var(--ck-surface)]">
          +{overflow}
        </span>
      )}
    </div>
  );
}
