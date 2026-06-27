"use client";

import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImportExportProps {
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
  className?: string;
}

export function ImportExport({ onExport, onImport, className }: ImportExportProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await onImport(file);
      setMessage("Progress berhasil diimpor.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Gagal mengimpor file.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <button
        type="button"
        onClick={onExport}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-ink-300 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <Download className="h-4 w-4" />
        Export JSON
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-ink-300 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <Upload className="h-4 w-4" />
        Import JSON
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="sr-only"
        onChange={handleFile}
      />
      {message && (
        <span
          className={cn(
            "text-sm",
            message.includes("berhasil") ? "text-emerald-700" : "text-red-600"
          )}
          role="status"
        >
          {message}
        </span>
      )}
    </div>
  );
}
