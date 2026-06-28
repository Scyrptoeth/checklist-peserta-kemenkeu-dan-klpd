"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ChecklistItem, DataAwalFieldType } from "@/lib/data/checklist-data";
import { getProdiTujuanOptions } from "@/lib/data/reference-data";
import { cn } from "@/lib/utils";

interface DataAwalSectionProps {
  items: ChecklistItem[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  statusText: string;
  statusDone: boolean;
}

const DATA_AWAL_ORDER = [
  "unit-kerja",
  "jalur",
  "prodi-asal",
  "prioritas-pilihan-prodi-1",
  "prioritas-pilihan-prodi-2",
  "prioritas-pilihan-prodi-3",
  "prioritas-pilihan-prodi-4",
  "prioritas-pilihan-prodi-5",
  "status-pilihan-prodi",
];

function getStaticOptions(item: ChecklistItem, values: Record<string, string>): string[] {
  if (item.dependsOn === "prodi-asal") {
    return getProdiTujuanOptions(values["prodi-asal"]);
  }
  return item.options ?? [];
}

const PRIORITY_IDS = Array.from({ length: 5 }, (_, i) => `prioritas-pilihan-prodi-${i + 1}`);

function getSelectedPriorities(values: Record<string, string>, excludeId?: string): string[] {
  return PRIORITY_IDS
    .filter((id) => id !== excludeId)
    .map((id) => values[id]?.trim())
    .filter((v): v is string => Boolean(v));
}

function getPrioritySelectState(item: ChecklistItem, values: Record<string, string>) {
  const eligible = getStaticOptions(item, values);
  const currentValue = (values[item.id] ?? "").trim();
  const selectedInOthers = new Set(getSelectedPriorities(values, item.id));

  const remaining = eligible.filter((option) => !selectedInOthers.has(option));
  const options = currentValue
    ? [currentValue, ...remaining.filter((option) => option !== currentValue)]
    : remaining;

  const selectedCount = PRIORITY_IDS.filter((id) => values[id]?.trim()).length;
  const allSelected = eligible.length > 0 && selectedCount === eligible.length;
  const disabled = eligible.length === 0 || (allSelected && !currentValue);

  return { options, disabled, allSelected };
}

function FieldLabel({ id, label }: { id: string; label: string }) {
  return (
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-900">
      {label}
    </label>
  );
}

function HelperText({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mt-1.5 text-xs text-ink-500", className)}>{children}</p>;
}

export function DataAwalSection({
  items,
  values,
  onChange,
  statusText,
  statusDone,
}: DataAwalSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const itemMap = new Map(items.map((item) => [item.id, item]));
  const orderedItems = DATA_AWAL_ORDER.map((id) => itemMap.get(id)).filter(
    (item): item is ChecklistItem => Boolean(item)
  );

  const contentId = "data-awal-content";

  return (
    <section className="rounded-2xl border border-ink-200 bg-white shadow-sm">
      <div className="sticky top-0 z-30 rounded-t-2xl border-b border-ink-100 bg-white/95 px-5 py-5 backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink-950">Data Awal</h2>
            <p className="text-sm text-ink-600">Informasi dasar Calon Peserta</p>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            aria-expanded={isExpanded}
            aria-controls={contentId}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="sr-only">{isExpanded ? "Ciutkan" : "Kembangkan"} Data Awal</span>
          </button>
        </div>
      </div>

      <div
        id={contentId}
        className={cn(
          "grid transition-all duration-300 ease-in-out motion-reduce:transition-none",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden px-5 sm:px-6">
          <div className="grid gap-5 py-5 sm:grid-cols-2">
            {orderedItems.map((item) => {
              const isStatus = item.id === "status-pilihan-prodi";

              return (
                <div key={item.id} className={cn(isStatus && "sm:col-span-2")}>
                  <FieldLabel id={item.id} label={item.label} />
                  <DataAwalInput
                    item={item}
                    value={values[item.id] ?? ""}
                    values={values}
                    onChange={onChange}
                    statusText={statusText}
                    statusDone={statusDone}
                  />
                  <DataAwalHelper item={item} values={values} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

interface DataAwalInputProps {
  item: ChecklistItem;
  value: string;
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  statusText: string;
  statusDone: boolean;
}

function DataAwalInput({
  item,
  value,
  values,
  onChange,
  statusText,
  statusDone,
}: DataAwalInputProps) {
  const fieldType = item.fieldType as DataAwalFieldType | undefined;
  const inputClassName = cn(
    "w-full rounded-lg border px-3 py-2.5 text-sm transition-colors",
    "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
  );

  if (fieldType === "computed") {
    return (
      <input
        id={item.id}
        type="text"
        readOnly
        value={statusText || "—"}
        className={cn(
          inputClassName,
          "cursor-default bg-ink-50 font-medium",
          statusDone
            ? "border-emerald-200 text-emerald-800"
            : statusText
            ? "border-amber-200 text-amber-800"
            : "border-ink-200 text-ink-500"
        )}
      />
    );
  }

  if (fieldType === "select") {
    const isPriority = item.dependsOn === "prodi-asal";
    const { options, disabled } = isPriority
      ? getPrioritySelectState(item, values)
      : { options: getStaticOptions(item, values), disabled: false };

    const placeholder =
      isPriority && disabled && !value
        ? "Tidak ada pilihan tersisa"
        : `Pilih ${item.label}`;

    return (
      <select
        id={item.id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(item.id, e.target.value)}
        className={cn(
          inputClassName,
          "appearance-none bg-white text-ink-900",
          "disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-500",
          "border-ink-300"
        )}
        style={{
          backgroundImage: disabled
            ? "none"
            : `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.75rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1rem",
          paddingRight: "2.5rem",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={item.id}
      type="text"
      value={value}
      onChange={(e) => onChange(item.id, e.target.value)}
      placeholder={`Masukkan ${item.label}`}
      className={cn(
        inputClassName,
        "border-ink-300 bg-white text-ink-900 placeholder:text-ink-400"
      )}
    />
  );
}

function DataAwalHelper({
  item,
  values,
}: {
  item: ChecklistItem;
  values: Record<string, string>;
}) {
  if (item.id === "prodi-asal") {
    return <HelperText>Pilih prodi asal sesuai ijazah terakhir.</HelperText>;
  }

  if (item.dependsOn === "prodi-asal") {
    const prodiAsal = values["prodi-asal"];
    if (!prodiAsal) {
      return <HelperText>Pilih PRODI ASAL terlebih dahulu.</HelperText>;
    }
    const { allSelected } = getPrioritySelectState(item, values);
    if (allSelected && !(values[item.id] ?? "").trim()) {
      return <HelperText>Semua pilihan prodi tujuan sudah dipilih.</HelperText>;
    }
    return <HelperText>Pilih prodi tujuan sesuai prioritas.</HelperText>;
  }

  if (item.id === "status-pilihan-prodi") {
    return (
      <HelperText>
        Status pemilihan prodi tujuan akan terisi otomatis setelah prioritas
        dilengkapi.
      </HelperText>
    );
  }

  return null;
}
