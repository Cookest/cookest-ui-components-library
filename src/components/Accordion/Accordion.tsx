"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | string[];
  multiple?: boolean;
  variant?: "default" | "bordered" | "separated";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: { button: "px-3 py-2.5 text-sm", content: "px-3 pb-3 pt-1 text-sm" },
  md: { button: "px-4 py-3 text-sm", content: "px-4 pb-4 pt-2 text-sm" },
  lg: { button: "px-5 py-4 text-base", content: "px-5 pb-5 pt-2 text-base" },
};

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" strokeLinecap="round" />
    </svg>
  );
}

interface AccordionItemViewProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  size: "sm" | "md" | "lg";
}

function AccordionItemView({ item, isOpen, onToggle, size }: AccordionItemViewProps) {
  const styles = sizeStyles[size];

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${item.id}`}
        id={`accordion-trigger-${item.id}`}
        disabled={item.disabled}
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-3 text-left font-medium transition-colors",
          "text-[var(--ck-heading)] hover:text-[var(--ck-primary)]",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ck-primary)]",
          styles.button,
        )}
      >
        {item.icon && (
          <span className="shrink-0 text-[var(--ck-primary)]">{item.icon}</span>
        )}
        <span className="flex-1">
          <span className="block">{item.title}</span>
          {item.subtitle && (
            <span className="block text-xs font-normal text-[var(--ck-text-muted)]">
              {item.subtitle}
            </span>
          )}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-[var(--ck-text-muted)]"
        >
          <ChevronIcon />
        </motion.span>
      </button>

      <motion.div
        id={`accordion-panel-${item.id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${item.id}`}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className={cn("text-[var(--ck-text)]", styles.content)}>
          {item.content}
        </div>
      </motion.div>
    </div>
  );
}

export function Accordion({
  items,
  defaultOpen,
  multiple = false,
  variant = "default",
  size = "md",
  className,
}: AccordionProps) {
  const initialOpen = defaultOpen
    ? Array.isArray(defaultOpen)
      ? defaultOpen
      : [defaultOpen]
    : [];

  const [openIds, setOpenIds] = useState<string[]>(initialOpen);

  function toggle(id: string) {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      return multiple ? [...prev, id] : [id];
    });
  }

  return (
    <div
      className={cn(
        "font-sans",
        variant === "bordered" &&
          "rounded-xl border border-[var(--ck-border)] divide-y divide-[var(--ck-border)] overflow-hidden",
        variant === "separated" && "flex flex-col gap-2",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            variant === "default" &&
              index < items.length - 1 &&
              "border-b border-[var(--ck-border)]",
            variant === "separated" &&
              "rounded-xl border border-[var(--ck-border)] bg-[var(--ck-bg-card)] overflow-hidden",
          )}
        >
          <AccordionItemView
            item={item}
            isOpen={openIds.includes(item.id)}
            onToggle={() => !item.disabled && toggle(item.id)}
            size={size}
          />
        </div>
      ))}
    </div>
  );
}
