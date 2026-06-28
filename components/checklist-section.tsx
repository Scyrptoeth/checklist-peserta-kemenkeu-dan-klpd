"use client";

import { useState } from "react";
import { ChecklistItem as ChecklistItemType } from "@/lib/data/checklist-data";
import { cn } from "@/lib/utils";
import { ChecklistRow } from "./checklist-row";
import { ProgressBar } from "./progress-bar";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ChecklistSectionProps {
  title: string;
  category: string;
  items: ChecklistItemType[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  stats: { total: number; done: number; percent: number };
}

export function ChecklistSection({
  title,
  category,
  items,
  checked,
  onToggle,
  stats,
}: ChecklistSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (items.length === 0) return null;

  const contentId = `${title.replace(/\s+/g, "-")}-content`;

  return (
    <section className="rounded-2xl border border-ink-200 bg-white shadow-sm">
      <div
        className={cn(
          "sticky top-24 z-30 rounded-t-2xl border-b bg-white/95 px-5 py-5 backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:px-6",
          stats.percent === 100 ? "border-emerald-100" : "border-ink-100"
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink-950">{title}</h2>
            <p className="text-sm text-ink-600">{category}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-40 sm:w-48">
              <ProgressBar
                percent={stats.percent}
                label={`${stats.done}/${stats.total}`}
                size="sm"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              aria-expanded={isExpanded}
              aria-controls={contentId}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="sr-only">
                {isExpanded ? "Ciutkan" : "Kembangkan"} {title}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id={contentId}
        className={cn(
          "grid transition-all duration-300 ease-in-out motion-reduce:transition-none",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden px-5 sm:px-6">
          <div className="flex flex-col gap-3 py-5">
            {items.map((item) => (
              <ChecklistRow
                key={item.id}
                item={item}
                checked={!!checked[item.id]}
                onToggle={() => onToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
