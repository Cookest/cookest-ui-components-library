"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

export type CardVariant = "default" | "interactive" | "outlined";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  className?: string;
  children: ReactNode;
}

export interface CardBodyProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  className?: string;
  children: ReactNode;
}

export interface CardFooterProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-[var(--ck-surface)] border border-[var(--ck-border)] shadow-sm",
  interactive:
    "bg-[var(--ck-surface)] border border-[var(--ck-border)] shadow-sm cursor-pointer",
  outlined: "bg-transparent border border-[var(--ck-border)]",
};

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", padding = "md", className, children, ...props }, ref) => {
    if (variant === "interactive") {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.2 }}
          className={cn(
            "rounded-xl font-sans",
            variantStyles[variant],
            paddingStyles[padding],
            className,
          )}
          {...(props as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl font-sans",
          variantStyles[variant],
          paddingStyles[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("border-b border-[var(--ck-border)] px-5 py-3 font-semibold text-[var(--ck-heading)]", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div className={cn("px-5 py-4 text-[var(--ck-text)]", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("border-t border-[var(--ck-border)] px-5 py-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}
