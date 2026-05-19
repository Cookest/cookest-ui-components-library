"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "../../utils/cn";

const ToggleGroupContext = React.createContext<{
  size?: "sm" | "md" | "lg";
}>({
  size: "md",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    size?: "sm" | "md" | "lg";
  }
>(({ className, size = "md", children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
    size?: "sm" | "md" | "lg";
  }
>(({ className, children, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  const itemSize = size || context.size || "md";

  const sizeStyles = {
    sm: "h-8 px-2.5 text-xs",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-5 text-base",
  };

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors hover:bg-[var(--ck-bg-card)] hover:text-[var(--ck-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ck-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--ck-bg-card)] data-[state=on]:text-[var(--ck-heading)]",
        sizeStyles[itemSize as keyof typeof sizeStyles],
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
