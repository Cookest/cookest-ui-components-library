"use client";

import { useState, useRef, useEffect, useId, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  error,
  disabled = false,
  searchable = false,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const labelId = useId();

  const selectedOption = options.find((o) => o.value === value);
  const filtered = searchable && search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open) setHighlightIndex(-1);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) { setOpen(true); return; }
        setHighlightIndex((prev) => {
          const next = prev + 1;
          return next >= filtered.length ? 0 : next;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) { setOpen(true); return; }
        setHighlightIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? filtered.length - 1 : next;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (open && highlightIndex >= 0 && filtered[highlightIndex] && !filtered[highlightIndex].disabled) {
          onChange?.(filtered[highlightIndex].value);
          setOpen(false);
          setSearch("");
        } else if (!open) {
          setOpen(true);
        }
        break;
      case "Escape":
        setOpen(false);
        setSearch("");
        break;
    }
  };

  const selectOption = (opt: SelectOption) => {
    if (opt.disabled) return;
    onChange?.(opt.value);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={containerRef} className={cn("relative font-sans", className)} onKeyDown={handleKeyDown}>
      {label && (
        <label id={labelId} className="mb-1.5 block text-sm font-medium text-[var(--ck-heading)]">
          {label}
        </label>
      )}

      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={label ? labelId : undefined}
        aria-invalid={!!error}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setOpen(!open);
            if (searchable && !open) {
              requestAnimationFrame(() => inputRef.current?.focus());
            }
          }
        }}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border bg-[var(--ck-surface)] px-4 py-2.5 text-left text-sm transition-all",
          "focus:outline-2 focus:outline-offset-0 focus:outline-[var(--ck-primary)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-[var(--ck-error)]"
            : open
              ? "border-[var(--ck-primary)]"
              : "border-[var(--ck-border)] hover:border-[var(--ck-primary)]",
        )}
      >
        <span className={selectedOption ? "text-[var(--ck-heading)]" : "text-[var(--ck-text-muted)]"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={cn("ml-2 shrink-0 text-[var(--ck-text-muted)] transition-transform", open && "rotate-180")}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-[var(--ck-border)] bg-[var(--ck-surface)] shadow-lg"
          >
            {searchable && (
              <div className="border-b border-[var(--ck-border)] p-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setHighlightIndex(-1); }}
                  placeholder="Search..."
                  className="w-full rounded-lg border border-[var(--ck-border)] bg-[var(--ck-bg)] px-3 py-1.5 text-sm text-[var(--ck-heading)] placeholder:text-[var(--ck-text-muted)] focus:outline-none"
                />
              </div>
            )}
            <ul id={listboxId} role="listbox" className="max-h-60 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-2 text-sm text-[var(--ck-text-muted)]">No options found</li>
              )}
              {filtered.map((opt, i) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  aria-disabled={opt.disabled}
                  onClick={() => selectOption(opt)}
                  className={cn(
                    "cursor-pointer px-4 py-2 text-sm transition-colors",
                    opt.value === value && "bg-[var(--ck-primary)]/10 font-medium text-[var(--ck-primary)]",
                    opt.disabled && "cursor-not-allowed opacity-40",
                    i === highlightIndex && "bg-[var(--ck-bg-card)]",
                    !opt.disabled && opt.value !== value && i !== highlightIndex && "text-[var(--ck-heading)] hover:bg-[var(--ck-bg-card)]",
                  )}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-xs text-[var(--ck-error)]">{error}</p>}
    </div>
  );
}
