"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { ProgressBar } from "./progress-bar";
import { ImportExport } from "./import-export";
import { cn } from "@/lib/utils";

interface CategoryStats {
  total: number;
  done: number;
  percent: number;
  statusText?: string;
  statusDone?: boolean;
}

interface ProgressStats {
  dataAwal: CategoryStats;
  nonDokumen: CategoryStats;
  dokumen: CategoryStats;
  overall: CategoryStats;
}

interface ProgressPanelProps {
  variant: "full" | "compact";
  stats: ProgressStats;
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
  onReset: () => void;
}

export function ProgressPanel({
  variant,
  stats,
  onExport,
  onImport,
  onReset,
}: ProgressPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const isCompact = variant === "compact";

  useEffect(() => {
    if (!showResetConfirm) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowResetConfirm(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showResetConfirm]);

  const categoryBars = (
    <div className="space-y-4">
      <ProgressBar
        percent={stats.nonDokumen.percent}
        label="Non-Dokumen"
        sublabel={`${stats.nonDokumen.done} dari ${stats.nonDokumen.total}`}
        size="sm"
        hidePercent
      />
      <ProgressBar
        percent={stats.dokumen.percent}
        label="Dokumen"
        sublabel={`${stats.dokumen.done} dari ${stats.dokumen.total}`}
        size="sm"
        hidePercent
      />
    </div>
  );

  const actionButtons = (
    <div className="flex flex-wrap items-center gap-3">
      <ImportExport onExport={onExport} onImport={onImport} />
      <button
        type="button"
        onClick={() => setShowResetConfirm(true)}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </button>
    </div>
  );

  const resetConfirmDialog = showResetConfirm && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="reset-title"
        aria-describedby="reset-desc"
        className="w-full max-w-sm rounded-2xl border border-ink-200 bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 id="reset-title" className="text-lg font-bold text-ink-950">
          Hapus semua progress?
        </h3>
        <p id="reset-desc" className="mt-2 text-sm leading-relaxed text-ink-600">
          Semua centangan dan data yang telah diisi akan dikosongkan. Pastikan Kamu sudah mengekspor data jika perlu.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setShowResetConfirm(false)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-ink-300 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onReset();
              setShowResetConfirm(false);
            }}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Ya, Reset
          </button>
        </div>
      </div>
    </div>
  );

  if (isCompact) {
    return (
      <>
        <div className="rounded-b-2xl border-b border-ink-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <ProgressBar
                percent={stats.overall.percent}
                label="Progress Keseluruhan"
                sublabel={`${stats.overall.done} dari ${stats.overall.total} selesai`}
                size="sm"
                hidePercent
              />
            </div>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {expanded ? (
                <ChevronUp className="h-5 w-5" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="sr-only">
                {expanded ? "Ciutkan" : "Kembangkan"} detail progress
              </span>
            </button>
          </div>

          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out motion-reduce:transition-none",
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="border-t border-ink-100 pt-4 mt-4 space-y-5">
                {categoryBars}
                {actionButtons}
              </div>
            </div>
          </div>
        </div>
        {resetConfirmDialog}
      </>
    );
  }

  return (
    <>
      <aside className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4">
          <p className="text-sm font-medium text-ink-600">Progress Keseluruhan</p>
          <p className="mt-1 text-sm text-ink-900">
            {stats.overall.done} dari {stats.overall.total} persyaratan selesai
          </p>
        </div>

        <ProgressBar
          percent={stats.overall.percent}
          label=""
          size="md"
          className="mb-6"
          hidePercent
        />

        {categoryBars}

        <div className="mt-6 border-t border-ink-100 pt-5">
          {actionButtons}
        </div>
      </aside>
      {resetConfirmDialog}
    </>
  );
}
