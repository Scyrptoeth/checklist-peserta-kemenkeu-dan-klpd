"use client";

import { ChecklistItem } from "@/lib/data/checklist-data";
import { useChecklistProgress } from "@/hooks/use-checklist-progress";
import { AnonymousFeedback } from "./anonymous-feedback";
import { ChecklistSection } from "./checklist-section";
import { ChecklistDokumenSection } from "./checklist-dokumen-section";
import { LinkContainer } from "./link-container";
import { ProgressPanel } from "./progress-panel";
import { DataAwalSection } from "./data-awal-section";
import { SiteFooter } from "./site-footer";
import { StickyPageHeader } from "./sticky-page-header";

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
      <StickyPageHeader
        backHref={clusterId === "klpd" ? "/" : "/checklist/kemenkeu"}
        backLabel="Kembali"
        breadcrumb={clusterLabel}
        title={subclusterLabel ?? "Checklist"}
        subtitle="Lengkapi Data Awal, lalu centang setiap persyaratan yang sudah terpenuhi. Progress tersimpan otomatis di perangkat ini."
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Mobile sticky top progress summary */}
        <div className="sticky top-24 z-40 -mx-4 mb-6 px-4 sm:-mx-6 sm:px-6 lg:hidden">
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
            <div className="sticky top-32">
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
              <ChecklistDokumenSection
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

      <AnonymousFeedback />
      <SiteFooter />
    </main>
  );
}
