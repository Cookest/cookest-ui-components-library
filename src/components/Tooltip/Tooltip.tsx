"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../utils/cn";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  content?: React.ReactNode;
  position?: TooltipPosition;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border border-[var(--ck-border)] bg-[var(--ck-surface)] px-3 py-1.5 text-xs text-[var(--ck-heading)] shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipProps
>(({ content, position = "top", delay = 200, className, children, ...props }, ref) => {
  if (content !== undefined) {
    // Legacy support for custom Cookest UI Tooltip
    return (
      <TooltipProvider delayDuration={delay}>
        <TooltipPrimitive.Root {...props}>
          <TooltipTrigger asChild ref={ref}>
            {children}
          </TooltipTrigger>
          <TooltipContent side={position} className={className}>
            {content}
          </TooltipContent>
        </TooltipPrimitive.Root>
      </TooltipProvider>
    );
  }

  // Radix UI Tooltip Root (Shadcn style)
  return <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>;
});

Tooltip.displayName = "Tooltip";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
