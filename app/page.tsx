import Link from "next/link";
import { ArrowRight, Building2, Landmark } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-ink-50">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
            SPMB PT PKN STAN 2026
          </span>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Checklist Peserta
          </h1>
          <p className="mt-4 text-balance text-lg text-ink-700">
            Pastikan seluruh persyaratan dokumen dan non-dokumen telah terpenuhi sebelum
            mendaftar.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Link
            href="/checklist/kemenkeu"
            className="group relative flex flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-200">
              <Landmark className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-ink-950">Kemenkeu</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
              Untuk peserta dari Kementerian Keuangan: DJBC, DJP, DJPb, dan UE-1.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-700 group-hover:text-brand-900">
              Pilih sub-klaster <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/checklist/klpd"
            className="group relative flex flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-200">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-ink-950">KLPD</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
              Untuk peserta dari Kementerian/Lembaga/Pemerintah Daerah.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-700 group-hover:text-brand-900">
              Buka checklist <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        <p className="mt-10 text-center text-xs text-ink-500">
          Progress tersimpan otomatis di perangkat ini. Gunakan Export/Import JSON untuk memindahkan
          progress antar perangkat.
        </p>
      </div>
    </main>
  );
}
