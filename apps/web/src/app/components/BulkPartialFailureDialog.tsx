"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export interface BulkFailureItem {
  id: string;
  error: string;
}

export interface BulkPartialFailureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  /** Short summary, e.g. "3 of 5 items could not be processed." */
  summary: string;
  failed: BulkFailureItem[];
}

/**
 * Dialog shown after a bulk action returns partial failure (some ids in `failed`).
 * Lists failed IDs and error messages so the user can see what went wrong.
 */
export function BulkPartialFailureDialog({
  open,
  onOpenChange,
  title = "Some items could not be processed",
  summary,
  failed,
}: BulkPartialFailureDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="max-h-[200px] rounded-md border p-2">
          <ul className="text-sm space-y-1.5" role="list">
            {failed.map(({ id, error }) => (
              <li key={id} className="flex flex-col gap-0.5">
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                  {id}
                </span>
                <span className="text-red-600 dark:text-red-400">{error}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
