"use client";

import { ChecklistItem as ChecklistItemType } from "@/lib/data/checklist-data";
import { cn } from "@/lib/utils";
import { Check, Link2 } from "lucide-react";

interface ChecklistRowProps {
  item: ChecklistItemType;
  checked: boolean;
  onToggle: () => void;
}

export function ChecklistRow({ item, checked, onToggle }: ChecklistRowProps) {
  const docSubject = item.label.match(/\(([^)]+)\)$/)?.[1];
  const mainLabel = docSubject ? item.label.replace(/\s*\([^)]+\)$/, "") : item.label;

  return (
    <label
      htmlFor={item.id}
      className={cn(
        "group flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors",
        "hover:border-brand-300 hover:bg-brand-50/50",
        checked
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-ink-200 bg-white"
      )}
    >
      <span
        className={cn(
          "relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
          checked
            ? "border-emerald-600 bg-emerald-600"
            : "border-ink-400 bg-white group-hover:border-brand-500"
        )}
      >
        <input
          id={item.id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onToggle}
        />
        <Check
          className={cn(
            "h-3.5 w-3.5 text-white transition-transform",
            checked ? "scale-100" : "scale-0"
          )}
          strokeWidth={3}
        />
      </span>
      <span className="flex-1">
        <span
          className={cn(
            "block text-sm leading-relaxed transition-colors",
            checked ? "text-ink-600 line-through" : "text-ink-900"
          )}
        >
          {mainLabel}
        </span>
        {docSubject && (
          <span className="mt-1 inline-flex items-center gap-1 text-xs text-ink-500">
            <Link2 className="h-3 w-3" />
            {docSubject}
          </span>
        )}
      </span>
    </label>
  );
}
