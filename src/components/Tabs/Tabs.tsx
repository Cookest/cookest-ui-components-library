"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: string | number;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  value?: string;
  onChange?: (id: string) => void;
  variant?: "underline" | "pills" | "boxed";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export function Tabs({
  items,
  defaultTab,
  value,
  onChange,
  variant = "underline",
  size = "md",
  fullWidth = false,
  className,
}: TabsProps) {
  const [internalTab, setInternalTab] = useState<string>(
    defaultTab ?? items[0]?.id ?? "",
  );

  const activeTab = value ?? internalTab;

  function handleSelect(id: string) {
    if (!value) setInternalTab(id);
    onChange?.(id);
  }

  const activeItem = items.find((t) => t.id === activeTab);

  return (
    <div className={cn("font-sans", fullWidth && "w-full", className)}>
      {/* Tab list */}
      <div
        role="tablist"
        className={cn(
          variant === "underline" &&
            "flex border-b border-[var(--ck-border)] gap-1",
          variant === "pills" &&
            "flex gap-1 rounded-xl bg-[var(--ck-bg)] p-1",
          variant === "boxed" &&
            "flex border-b border-[var(--ck-border)]",
        )}
      >
        {items.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleSelect(tab.id)}
              className={cn(
                "relative flex items-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ck-primary)] disabled:cursor-not-allowed disabled:opacity-40",
                sizeStyles[size],
                fullWidth && "flex-1 justify-center",
                variant === "underline" && [
                  "text-[var(--ck-text-muted)] hover:text-[var(--ck-heading)]",
                  isActive && "text-[var(--ck-primary)]",
                ],
                variant === "pills" && [
                  "rounded-full z-10",
                  isActive
                    ? "text-white"
                    : "text-[var(--ck-text)] hover:text-[var(--ck-heading)]",
                ],
                variant === "boxed" && [
                  "border-b-2 -mb-px",
                  isActive
                    ? "border-[var(--ck-primary)] text-[var(--ck-primary)] bg-[var(--ck-bg-card)]"
                    : "border-transparent text-[var(--ck-text-muted)] hover:text-[var(--ck-heading)]",
                ],
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              {tab.label}
              {tab.badge != null && (
                <span
                  className={cn(
                    "min-w-[1.25rem] rounded-full px-1.5 py-0.5 text-xs font-semibold leading-none",
                    isActive && variant === "pills"
                      ? "bg-white/25 text-white"
                      : "bg-[var(--ck-primary)] text-white",
                  )}
                >
                  {tab.badge}
                </span>
              )}

              {/* Underline indicator */}
              {variant === "underline" && isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--ck-primary)]"
                />
              )}

              {/* Pills background */}
              {variant === "pills" && isActive && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-[var(--ck-primary)]"
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {activeItem?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
