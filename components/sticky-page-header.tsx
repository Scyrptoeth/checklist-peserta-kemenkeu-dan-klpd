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
        "sticky top-0 z-50 border-b border-ink-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-3 sm:h-20 sm:gap-4 sm:px-6 lg:h-24">
        {/* Left: back + text block */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="flex shrink-0 items-center gap-1 rounded-lg p-1.5 text-xs font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:p-2 sm:text-sm"
              aria-label={backLabel}
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              <span className="hidden sm:inline">{backLabel}</span>
            </Link>
          )}

          <div className="flex min-w-0 flex-col justify-center">
            {breadcrumb && (
              <p className="mb-0.5 text-[10px] font-medium text-brand-700 sm:text-xs">
                {breadcrumb}
              </p>
            )}
            <h1 className="truncate text-sm font-bold tracking-tight text-ink-950 sm:text-lg lg:text-xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-0.5 hidden text-[10px] leading-snug text-ink-600 sm:line-clamp-1 sm:text-xs lg:text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: logo */}
        <Link
          href="/"
          className="relative shrink-0 rounded-lg transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          aria-label="Beranda"
        >
          <Image
            src="/logo.png"
            alt="Persiapantubel"
            width={160}
            height={48}
            priority
            className="h-9 w-auto object-contain sm:h-11 lg:h-14"
          />
        </Link>
      </div>
    </header>
  );
}
