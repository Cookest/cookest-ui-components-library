import { cn } from "../../utils/cn";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  orientation?: DividerOrientation;
  label?: string;
  className?: string;
}

export function Divider({ orientation = "horizontal", label, className }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("mx-2 inline-block h-full w-px self-stretch bg-[var(--ck-border)]", className)}
      />
    );
  }

  if (label) {
    return (
      <div role="separator" className={cn("flex items-center gap-3", className)}>
        <div className="h-px flex-1 bg-[var(--ck-border)]" />
        <span className="font-sans text-xs font-medium text-[var(--ck-text-muted)]">{label}</span>
        <div className="h-px flex-1 bg-[var(--ck-border)]" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={cn("border-none h-px w-full bg-[var(--ck-border)]", className)}
    />
  );
}
