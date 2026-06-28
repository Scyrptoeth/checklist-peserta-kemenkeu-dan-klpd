import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Halaman Tidak Ditemukan",
};

export default function NotFoundPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-ink-50 px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight text-ink-300">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-ink-950">Halaman tidak ditemukan</h2>
      <p className="mt-2 max-w-md text-ink-600">
        Tautan yang Kamu tuju tidak tersedia. Kembali ke beranda untuk memilih checklist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Beranda
      </Link>
    </main>
  );
}
