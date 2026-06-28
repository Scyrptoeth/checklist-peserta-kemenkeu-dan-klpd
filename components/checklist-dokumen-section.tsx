"use client";

import { useState } from "react";
import { ChecklistItem } from "@/lib/data/checklist-data";
import { cn } from "@/lib/utils";
import { ChecklistRow } from "./checklist-row";
import { ProgressBar } from "./progress-bar";
import { ChevronDown, ChevronUp, User, Users, Building2 } from "lucide-react";

interface ChecklistDokumenSectionProps {
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  stats: { total: number; done: number; percent: number };
  category?: React.ReactNode;
}

const SUBJECT_ORDER = [
  "Subjek: Peserta",
  "Subjek: Peserta dan Unit Kerja",
  "Subjek: Unit Kerja",
] as const;

type SubjectKey = (typeof SUBJECT_ORDER)[number];

const SUBJECT_META: Record<
  SubjectKey,
  {
    icon: React.ReactNode;
    headerBg: string;
    headerBorder: string;
    topBorder: string;
    text: string;
    ring: string;
  }
> = {
  "Subjek: Peserta": {
    icon: <User className="h-4 w-4" aria-hidden="true" />,
    headerBg: "bg-brand-50",
    headerBorder: "border-brand-200",
    topBorder: "border-t-brand-500",
    text: "text-brand-700",
    ring: "focus-visible:ring-brand-500",
  },
  "Subjek: Peserta dan Unit Kerja": {
    icon: <Users className="h-4 w-4" aria-hidden="true" />,
    headerBg: "bg-amber-50",
    headerBorder: "border-amber-200",
    topBorder: "border-t-amber-500",
    text: "text-amber-700",
    ring: "focus-visible:ring-amber-500",
  },
  "Subjek: Unit Kerja": {
    icon: <Building2 className="h-4 w-4" aria-hidden="true" />,
    headerBg: "bg-emerald-50",
    headerBorder: "border-emerald-200",
    topBorder: "border-t-emerald-600",
    text: "text-emerald-700",
    ring: "focus-visible:ring-emerald-600",
  },
};

function getSubjectMeta(subject: string) {
  return (
    SUBJECT_META[subject as SubjectKey] ?? {
      icon: <User className="h-4 w-4" aria-hidden="true" />,
      headerBg: "bg-ink-50",
      headerBorder: "border-ink-200",
      topBorder: "border-t-ink-400",
      text: "text-ink-700",
      ring: "focus-visible:ring-ink-400",
    }
  );
}

export function ChecklistDokumenSection({
  items,
  checked,
  onToggle,
  stats,
  category = "Kelengkapan dokumen administrasi",
}: ChecklistDokumenSectionProps) {
  const grouped = new Map<string, ChecklistItem[]>();
  for (const item of items) {
    const subject = item.subject ?? "Lainnya";
    if (!grouped.has(subject)) grouped.set(subject, []);
    grouped.get(subject)!.push(item);
  }

  const orderedSubjects = SUBJECT_ORDER.filter((s) => grouped.has(s));
  const otherSubjects = Array.from(grouped.keys()).filter(
    (s) => !SUBJECT_ORDER.includes(s as SubjectKey)
  );
  const allSubjects = [...orderedSubjects, ...otherSubjects];

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(allSubjects.map((s) => [s, true]))
  );

  if (items.length === 0) return null;

  const toggleSubject = (subject: string) => {
    setExpanded((prev) => ({ ...prev, [subject]: !prev[subject] }));
  };

  return (
    <section className="rounded-2xl border border-ink-200 bg-white shadow-sm">
      <div
        className={cn(
          "sticky top-0 z-30 rounded-t-2xl border-b bg-white/95 px-5 py-5 backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:px-6",
          stats.percent === 100 ? "border-emerald-100" : "border-ink-100"
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink-950">
              Checklist Dokumen
            </h2>
            <p className="text-sm text-ink-600">{category}</p>
          </div>
          <div className="w-40 sm:w-48">
            <ProgressBar
              percent={stats.percent}
              label={`${stats.done}/${stats.total}`}
              size="sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-5 py-5 sm:px-6">
        {allSubjects.map((subject) => {
          const subjectItems = grouped.get(subject)!;
          const meta = getSubjectMeta(subject);
          const done = subjectItems.filter((item) => checked[item.id]).length;
          const total = subjectItems.length;
          const percent = total === 0 ? 0 : Math.round((done / total) * 100);
          const isExpanded = expanded[subject] ?? true;
          const contentId = `dokumen-${subject.replace(/[^a-z0-9]+/gi, "-")}-content`;

          return (
            <div
              key={subject}
              className={cn(
                "overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm",
                "border-t-4",
                meta.topBorder
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4",
                  meta.headerBg
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-white shadow-sm",
                      meta.headerBorder,
                      meta.text
                    )}
                  >
                    {meta.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-ink-900">{subject}</h3>
                    <p className="text-xs text-ink-600">
                      {done}/{total} selesai · {percent}%
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  aria-expanded={isExpanded}
                  aria-controls={contentId}
                  className={cn(
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                    meta.ring
                  )}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {isExpanded ? "Ciutkan" : "Kembangkan"} {subject}
                  </span>
                </button>
              </div>

              <div
                id={contentId}
                className={cn(
                  "grid transition-all duration-300 ease-in-out motion-reduce:transition-none",
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                  <div className="flex flex-col gap-3">
                    {subjectItems.map((item) => (
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
