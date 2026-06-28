"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ChecklistItem } from "@/lib/data/checklist-data";
import { useChecklistProgress } from "@/hooks/use-checklist-progress";
import { ChecklistSection } from "./checklist-section";
import { LinkContainer } from "./link-container";
import { ProgressPanel } from "./progress-panel";
import { DataAwalSection } from "./data-awal-section";

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
    dataAwal,
    toggle,
    reset,
    setDataAwal,
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
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6">
          <Link
            href={clusterId === "klpd" ? "/" : "/checklist/kemenkeu"}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </div>

        <div className="mb-8">
          <p className="text-sm font-medium text-brand-700">{clusterLabel}</p>
          <h1 className="mt-1 text-balance text-2xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            {subclusterLabel ?? "Checklist"}
          </h1>
          <p className="mt-2 text-balance text-ink-700">
            Lengkapi Data Awal, lalu centang setiap persyaratan yang sudah
            terpenuhi. Progress tersimpan otomatis di perangkat ini.
          </p>
        </div>

        {/* Mobile sticky top progress summary */}
        <div className="sticky top-0 z-40 -mx-4 mb-6 px-4 sm:-mx-6 sm:px-6 lg:hidden">
          <ProgressPanel
            variant="compact"
            stats={stats}
            onExport={exportJson}
            onImport={importJson}
            onReset={reset}
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Desktop sticky left sidebar */}
          <div className="hidden lg:block lg:w-80 lg:shrink-0 xl:w-96">
            <div className="sticky top-6">
              <ProgressPanel
                variant="full"
                stats={stats}
                onExport={exportJson}
                onImport={importJson}
                onReset={reset}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-6">
              <DataAwalSection
                items={dataAwalItems}
                values={dataAwal}
                onChange={setDataAwal}
                statusText={stats.dataAwal.statusText ?? ""}
                statusDone={stats.dataAwal.statusDone ?? false}
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
          </div>
        </div>
      </div>
    </main>
  );
}
