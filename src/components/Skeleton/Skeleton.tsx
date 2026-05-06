import { cn } from "../../utils/cn";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "rounded-md",
  circular: "rounded-full",
  rectangular: "rounded-xl",
};

function SkeletonLine({
  variant = "text",
  width,
  height,
  className,
}: Omit<SkeletonProps, "lines">) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-pulse bg-[var(--ck-border)]",
        variantStyles[variant],
        className,
      )}
      style={{
        width: width ?? (variant === "circular" ? 40 : "100%"),
        height: height ?? (variant === "text" ? 16 : variant === "circular" ? 40 : 80),
      }}
    />
  );
}

export function Skeleton({ variant = "text", width, height, lines, className }: SkeletonProps) {
  if (lines && lines > 1 && variant === "text") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonLine
            key={i}
            variant="text"
            width={i === lines - 1 ? "75%" : width}
            height={height}
          />
        ))}
      </div>
    );
  }

  return <SkeletonLine variant={variant} width={width} height={height} className={className} />;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-[var(--ck-border)] bg-[var(--ck-surface)] p-5", className)}>
      <Skeleton variant="rectangular" height={160} className="mb-4" />
      <Skeleton variant="text" width="60%" className="mb-2" />
      <Skeleton variant="text" lines={2} />
    </div>
  );
}
