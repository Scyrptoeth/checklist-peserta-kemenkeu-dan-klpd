import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyPageHeaderProps {
  backHref?: string;
  backLabel?: string;
  breadcrumb?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function StickyPageHeader({
  backHref,
  backLabel = "Kembali",
  breadcrumb,
  title,
  subtitle,
  className,
}: StickyPageHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-24 border-b border-ink-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:h-28 lg:h-32",
        className
      )}
    >
      <div className="grid h-full w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-3 sm:gap-8 sm:px-6">
        <div className="flex min-w-0 flex-col justify-center">
          {backHref && (
            <Link
              href={backHref}
              className="mb-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-ink-600 transition-colors hover:text-brand-700 sm:text-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              <span className="truncate">{backLabel}</span>
            </Link>
          )}
          {breadcrumb && (
            <p className="mb-0.5 text-xs font-medium text-brand-700 sm:text-sm">
              {breadcrumb}
            </p>
          )}
          <h1 className="truncate text-base font-bold tracking-tight text-ink-950 sm:text-xl lg:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-ink-600 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        <a
          href="https://s.id/tubelstan"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center justify-self-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          aria-label="Daftar kelas gelombang terakhir Persiapantubel di s.id/tubelstan"
        >
          <span className="font-serif text-[11px] font-semibold leading-snug tracking-tight text-ink-950 sm:text-sm sm:leading-snug">
            Daftar Kelas Gelombang Terakhir Sekarang!
          </span>
          <span className="mt-0.5 font-serif text-[11px] font-semibold leading-snug tracking-tight text-red-600 sm:text-sm sm:leading-snug">
            Kuota Tersisa: 11!
          </span>
          <span className="mt-0.5 text-[9px] font-semibold tracking-wide text-brand-700 underline decoration-brand-500 underline-offset-2 transition-colors group-hover:text-brand-800 sm:text-xs">
            Klik s.id/tubelstan
          </span>
        </a>

        <Link
          href="/"
          className="relative shrink-0 justify-self-end rounded-lg transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          aria-label="Beranda"
        >
          <Image
            src="/logo.png"
            alt="Persiapantubel"
            width={180}
            height={56}
            priority
            className="h-12 w-auto object-contain sm:h-16 lg:h-24"
          />
        </Link>
      </div>
    </header>
  );
}
