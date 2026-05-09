"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--ck-surface)] group-[.toaster]:text-[var(--ck-heading)] group-[.toaster]:border-[var(--ck-border)] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[var(--ck-text-muted)]",
          actionButton:
            "group-[.toast]:bg-[var(--ck-primary)] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-[var(--ck-bg-card)] group-[.toast]:text-[var(--ck-text-muted)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
