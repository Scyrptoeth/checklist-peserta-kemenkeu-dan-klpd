import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { kemenkeuClusters } from "@/lib/data/checklist-data";

export default function KemenkeuSelectPage() {
  return (
    <main className="min-h-dvh bg-ink-50">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>

        <div className="mb-10">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            Pilih Sub-Klaster Kemenkeu
          </h1>
          <p className="mt-3 text-balance text-ink-700">
            Setiap sub-klaster memiliki variasi dokumen yang berbeda. Pilih sesuai unit kerja Anda.
          </p>
        </div>

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
