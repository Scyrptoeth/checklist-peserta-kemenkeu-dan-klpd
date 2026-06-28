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
import { PromoBanner } from "./promo-banner";
import { ExternalLink } from "lucide-react";

interface ChecklistPageClientProps {
  clusterId: string;
  subclusterId?: string;
  clusterLabel: string;
  subclusterLabel?: string;
  items: ChecklistItem[];
}

function InlineExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
    >
      {children}
      <ExternalLink className="h-3 w-3" aria-hidden="true" />
    </a>
  );
}

function getSectionSubtitles(clusterId: string, subclusterId?: string) {
  const dataAwalSubtitle = (
    <>
      Sesuai dengan Kertas Kerja yang Dibagikan oleh PKN STAN di{" "}
      <InlineExternalLink href="https://taplink.cc/formulirspmbpt2026">
        https://taplink.cc/formulirspmbpt2026
      </InlineExternalLink>
    </>
  );

  let nonDokumenSubtitle: React.ReactNode;
  if (clusterId === "kemenkeu") {
    nonDokumenSubtitle = (
      <>
        Sesuai dengan Pasal 6 PMK 34 Tahun 2024 tentang Pengelolaan Tugas Belajar
        bagi PNS di Lingkungan Kemenkeu yang bisa Diunduh di{" "}
        <InlineExternalLink href="https://s.id/PMK-Tubel-Kemenkeu">
          s.id/PMK-Tubel-Kemenkeu
        </InlineExternalLink>
      </>
    );
  } else {
    nonDokumenSubtitle =
      "Sesuai dengan Ketentuan Kepegawaian/Tugas Belajar yang Berlaku di KLPD Masing-Masing";
  }

  let dokumenSubtitle: React.ReactNode;
  if (clusterId === "kemenkeu") {
    switch (subclusterId) {
      case "djbc":
        dokumenSubtitle = (
          <>
            Sesuai dengan PENG-31/BC.01/2026 yang dapat Diunduh di{" "}
            <InlineExternalLink href="https://s.id/Tubel-DJBC-2026">
              s.id/Tubel-DJBC-2026
            </InlineExternalLink>
          </>
        );
        break;
      case "djpb":
        dokumenSubtitle = (
          <>
            Sesuai dengan ND-2360/PB.1/2026 yang dapat Diunduh di{" "}
            <InlineExternalLink href="https://s.id/Tubel-DJPb-2026">
              s.id/Tubel-DJPb-2026
            </InlineExternalLink>
          </>
        );
        break;
      case "djp":
        dokumenSubtitle = (
          <>
            Sesuai dengan PENG-380/PJ/PJ.01/2026 yang dapat Diunduh di{" "}
            <InlineExternalLink href="https://s.id/Tubel-DJP-2026">
              s.id/Tubel-DJP-2026
            </InlineExternalLink>
          </>
        );
        break;
      case "ue-1":
      default:
        dokumenSubtitle = (
          <>
            Sesuai dengan PENG-19/PKN/2026 yang dapat Diunduh di{" "}
            <InlineExternalLink href="https://s.id/PENG-Tubel-2026">
              s.id/PENG-Tubel-2026
            </InlineExternalLink>
          </>
        );
    }
  } else {
    dokumenSubtitle = (
      <>
        Sesuai dengan PENG-19/PKN/2026 yang dapat Diunduh di{" "}
        <InlineExternalLink href="https://s.id/PENG-Tubel-2026">
          s.id/PENG-Tubel-2026
        </InlineExternalLink>
      </>
    );
  }

  return {
    dataAwal: dataAwalSubtitle,
    nonDokumen: nonDokumenSubtitle,
    dokumen: dokumenSubtitle,
  };
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

  const subtitles = getSectionSubtitles(clusterId, subclusterId);

  return (
    <main className="min-h-dvh bg-ink-50 pb-20">
      <StickyPageHeader
        backHref={clusterId === "klpd" ? "/" : "/checklist/kemenkeu"}
        backLabel="Kembali"
        breadcrumb={clusterLabel}
        title={subclusterLabel ?? "Checklist"}
        subtitle="Lengkapi Data Awal, lalu centang setiap persyaratan yang sudah terpenuhi. Progress tersimpan otomatis di perangkat ini."
      />

      <PromoBanner />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Mobile sticky top progress summary */}
        <div className="sticky top-28 z-30 -mx-4 mb-6 px-4 sm:-mx-6 sm:px-6 lg:hidden">
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
                subtitle={subtitles.dataAwal}
              />
              <ChecklistDokumenSection
                items={dokumenItems}
                checked={checked}
                onToggle={toggle}
                stats={stats.dokumen}
                category={subtitles.dokumen}
              />
              <ChecklistSection
                title="Checklist Non-Dokumen"
                category={subtitles.nonDokumen}
                items={nonDokumenItems}
                checked={checked}
                onToggle={toggle}
                stats={stats.nonDokumen}
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
