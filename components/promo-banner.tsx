import { Megaphone, ArrowUpRight } from "lucide-react";

export function PromoBanner() {
  return (
    <a
      href="https://s.id/tubelstan"
      target="_blank"
      rel="noopener noreferrer"
      className="group sticky top-16 z-40 block border-b border-brand-200 bg-gradient-to-r from-brand-50 via-white to-brand-50 py-2.5 shadow-sm transition-colors hover:bg-brand-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:top-20 sm:py-3 lg:top-24"
      aria-label="Daftar kelas gelombang terakhir Persiapantubel di s.id/tubelstan"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-3 sm:gap-3 sm:px-6">
        <Megaphone
          className="hidden h-4 w-4 shrink-0 text-brand-600 sm:block sm:h-5 sm:w-5"
          aria-hidden="true"
        />
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-center sm:gap-x-2">
          <span className="text-xs font-semibold text-ink-900 sm:text-sm">
            Daftar Kelas Gelombang Terakhir Sekarang!
          </span>
          <span className="text-xs font-bold text-red-600 sm:text-sm">
            Kuota Tersisa: 5!
          </span>
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold tracking-wide text-brand-700 underline decoration-brand-500 underline-offset-2 transition-colors group-hover:text-brand-800 sm:text-xs">
            Klik s.id/tubelstan
            <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}
