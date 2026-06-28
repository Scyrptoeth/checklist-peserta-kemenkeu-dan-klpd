import { Github, Mail, MessageCircle } from "lucide-react";

const githubUrl = "https://persiapantubel.com/product";
const supportPhoneLabel = "0822-9411-6001 (Goradok Pande Raja Sinabutar / Dedek)";
const supportEmail = "dedekfidelis@gmail.com";

export function SiteFooter() {
  return (
    <footer
      className="border-t border-ink-200 bg-ink-100 py-10 text-center sm:py-14"
      aria-label="Informasi situs"
    >
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-base font-semibold text-ink-950">
          Ceklis Tubel — Peserta SPMB PT PKN STAN 2026
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-600">
          Gunakan PENG-19/PKN/2026 & Ketentuan dari Instansi Kamu sebagai Rujukan Utama.
          Sampai Bertemu Kembali di Bintaro!
        </p>

        <nav
          className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-ink-600"
          aria-label="Tautan pendukung"
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-700"
          >
            <Github aria-hidden="true" className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://wa.me/6282294116001"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-700"
          >
            <MessageCircle
              aria-hidden="true"
              className="h-4 w-4"
            />
            <span>Saran &amp; Kendala: {supportPhoneLabel}</span>
          </a>
          <a
            href={`mailto:${supportEmail}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-700"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            <span>Email: {supportEmail}</span>
          </a>
        </nav>

        <p className="mt-10 text-xs text-ink-500">
          &copy; {new Date().getFullYear()} Ceklis Tubel — Peserta SPMB PT PKN STAN 2026 
        </p>
      </div>
    </footer>
  );
}
