"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percent: number;
  label: string;
  sublabel?: string;
  size?: "sm" | "md";
  className?: string;
}

export function ProgressBar({
  percent,
  label,
  sublabel,
  size = "md",
  className,
}: ProgressBarProps) {
  const safePercent = Math.min(100, Math.max(0, percent));

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between gap-4">
        <span className={cn("font-medium text-ink-900", size === "sm" ? "text-sm" : "text-base")}>
          {label}
        </span>
        <span
          className={cn(
            "font-mono font-semibold tabular-nums",
            size === "sm" ? "text-sm" : "text-base",
            safePercent === 100 ? "text-emerald-700" : "text-brand-700"
          )}
        >
          {safePercent}%
        </span>
      </div>
      {sublabel && <p className="mt-0.5 text-xs text-ink-600">{sublabel}</p>}
      <div
        className={cn(
          "mt-2 w-full overflow-hidden rounded-full bg-ink-200",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
        role="progressbar"
        aria-valuenow={safePercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out motion-reduce:transition-none",
            safePercent === 100 ? "bg-emerald-600" : "bg-brand-600"
          )}
          style={{ width: `${safePercent}%` }}
        />
      </div>
    </div>
  );
}
