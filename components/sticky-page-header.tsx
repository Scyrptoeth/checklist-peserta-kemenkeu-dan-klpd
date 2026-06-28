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
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
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
          <h1 className="truncate text-lg font-bold tracking-tight text-ink-950 sm:text-xl lg:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 line-clamp-1 text-xs text-ink-600 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        <Link
          href="/"
          className="group relative shrink-0 rounded-lg transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          aria-label="Beranda"
        >
          <Image
            src="/logo.png"
            alt="Persiapantubel"
            width={180}
            height={56}
            priority
            className="h-14 w-auto object-contain sm:h-16 lg:h-24"
          />
        </Link>
      </div>
    </header>
  );
}
