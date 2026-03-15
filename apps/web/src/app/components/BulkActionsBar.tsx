"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { cn } from "./ui/utils";

export type BulkActionVariant = "default" | "destructive" | "outline" | "secondary" | "ghost";

export interface BulkAction {
  label: string;
  onClick: () => void;
  variant?: BulkActionVariant;
  disabled?: boolean;
}

export interface BulkActionsBarProps {
  selectedCount: number;
  actions: BulkAction[];
  onClearSelection?: () => void;
  className?: string;

  selectionLabel?: string;
}


export function BulkActionsBar({
  selectedCount,
  actions,
  onClearSelection,
  className,
  selectionLabel = "items",
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  const label =
    selectedCount === 1
      ? `1 ${selectionLabel.replace(/s$/, "")} selected`
      : `${selectedCount} ${selectionLabel} selected`;

  return (
    <Card
      className={cn("p-4 gap-0", className)}
      role="region"
      aria-label="Bulk actions"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700" id="bulk-selection-label">
          {label}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant={action.variant ?? "outline"}
              size="sm"
              onClick={action.onClick}
              disabled={action.disabled}
              className={action.variant === "destructive" ? "bg-red-600 hover:bg-red-700 text-white" : undefined}
            >
              {action.label}
            </Button>
          ))}
          {onClearSelection && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              aria-label="Clear selection"
              className="text-slate-500 hover:text-slate-700"
            >
              <X size={16} aria-hidden />
              Clear
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
