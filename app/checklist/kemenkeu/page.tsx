import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { kemenkeuClusters } from "@/lib/data/checklist-data";
import { StickyPageHeader } from "@/components/sticky-page-header";

export default function KemenkeuSelectPage() {
  return (
    <main className="min-h-dvh bg-ink-50">
      <StickyPageHeader
        backHref="/"
        backLabel="Kembali"
        breadcrumb="Kementerian Keuangan"
        title="Pilih Sub-Klaster Kemenkeu"
        subtitle="Setiap sub-klaster memiliki variasi dokumen yang berbeda. Pilih sesuai unit kerja Anda."
      />

      <div className="mx-auto max-w-3xl px-6 py-6 sm:py-10">

        <div className="grid gap-4 sm:grid-cols-2">
          {kemenkeuClusters.map((cluster) => (
            <Link
              key={cluster.id}
              href={`/checklist/kemenkeu/${cluster.id}`}
              className="group flex items-center justify-between rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <div>
                <h2 className="text-lg font-semibold text-ink-950">{cluster.label}</h2>
                <p className="mt-1 text-sm text-ink-600">{cluster.full}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
