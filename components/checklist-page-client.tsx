"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { ChecklistItem } from "@/lib/data/checklist-data";
import { useChecklistProgress } from "@/hooks/use-checklist-progress";
import { ChecklistSection } from "./checklist-section";
import { LinkContainer } from "./link-container";
import { ProgressBar } from "./progress-bar";
import { ImportExport } from "./import-export";

interface ChecklistPageClientProps {
  clusterId: string;
  subclusterId?: string;
  clusterLabel: string;
  subclusterLabel?: string;
  items: ChecklistItem[];
}

export function ChecklistPageClient({
  clusterId,
  subclusterId,
  clusterLabel,
  subclusterLabel,
  items,
}: ChecklistPageClientProps) {
  const {
    checked,
    toggle,
    reset,
    stats,
    exportJson,
    importJson,
  } = useChecklistProgress(clusterId, subclusterId, items);

  const dataAwalItems = items.filter(
    (item) => item.applies && item.category === "Data Awal"
  );
  const nonDokumenItems = items.filter(
    (item) => item.applies && item.category === "Checklist Non-Dokumen"
  );
  const dokumenItems = items.filter(
    (item) => item.applies && item.category === "Checklist Dokumen"
  );
  const linkItems = items
    .filter((item) => item.category === "Link Penting")
    .map((item) => ({ label: item.label, url: item.link }));

  return (
    <main className="min-h-dvh bg-ink-50 pb-20">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={clusterId === "klpd" ? "/" : "/checklist/kemenkeu"}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
          <ImportExport onExport={exportJson} onImport={importJson} />
        </div>

        <div className="mb-8">
          <p className="text-sm font-medium text-brand-700">{clusterLabel}</p>
          <h1 className="mt-1 text-balance text-2xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            {subclusterLabel ?? "Checklist"}
          </h1>
          <p className="mt-2 text-balance text-ink-700">
            Centang setiap persyaratan yang sudah terpenuhi. Progress tersimpan otomatis di
            perangkat ini.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm sm:p-6">
          <ProgressBar
            percent={stats.overall.percent}
            label="Progress Keseluruhan"
            sublabel={`${stats.overall.done} dari ${stats.overall.total} persyaratan terpenuhi`}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ProgressBar percent={stats.dataAwal.percent} label="Data Awal" size="sm" />
            <ProgressBar percent={stats.nonDokumen.percent} label="Non-Dokumen" size="sm" />
            <ProgressBar percent={stats.dokumen.percent} label="Dokumen" size="sm" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ChecklistSection
            title="Data Awal"
            category="Informasi dasar Calon Peserta"
            items={dataAwalItems}
            checked={checked}
            onToggle={toggle}
            stats={stats.dataAwal}
          />
          <ChecklistSection
            title="Checklist Non-Dokumen"
            category="Kesesuaian persyaratan kepegawaian"
            items={nonDokumenItems}
            checked={checked}
            onToggle={toggle}
            stats={stats.nonDokumen}
          />
          <ChecklistSection
            title="Checklist Dokumen"
            category="Kelengkapan dokumen administrasi"
            items={dokumenItems}
            checked={checked}
            onToggle={toggle}
            stats={stats.dokumen}
          />
          <LinkContainer links={linkItems} />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Progress
          </button>
        </div>
      </div>
    </main>
  );
}
