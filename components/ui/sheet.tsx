"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LuX } from "react-icons/lu";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: "right" | "left";
  className?: string;
}

export function Sheet({
  open,
  onOpenChange,
  children,
  side = "right",
  className,
}: SheetProps) {
  // Lock scroll when open
  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute top-0 bottom-0 w-full max-w-xs bg-surface-elevated shadow-xl flex flex-col",
          side === "right" ? "right-0" : "left-0",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export function SheetHeader({
  className,
  children,
  onClose,
  ...props
}: SheetHeaderProps) {
  return (
    <div
      className={cn("flex items-center justify-between p-4 border-b border-surface-border", className)}
      {...props}
    >
      <div>{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex items-center justify-center w-9 h-9 rounded-sm text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors cursor-pointer"
        >
          <LuX className="size-5" />
        </button>
      )}
    </div>
  );
}

export function SheetContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-4", className)} {...props}>
      {children}
    </div>
  );
}