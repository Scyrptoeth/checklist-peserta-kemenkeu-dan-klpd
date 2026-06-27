"use client";

import { ChecklistItem as ChecklistItemType } from "@/lib/data/checklist-data";
import { ChecklistRow } from "./checklist-row";
import { ProgressBar } from "./progress-bar";

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
  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-ink-950">{title}</h2>
          <p className="text-sm text-ink-600">{category}</p>
        </div>
        <div className="sm:w-48">
          <ProgressBar
            percent={stats.percent}
            label={`${stats.done}/${stats.total}`}
            size="sm"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ChecklistRow
            key={item.id}
            item={item}
            checked={!!checked[item.id]}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
