"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChecklistItem } from "@/lib/data/checklist-data";
import { getProdiTujuanOptions } from "@/lib/data/reference-data";
import {
  computeProdiStatus,
  isProdiStatusComplete,
} from "@/lib/data/status-utils";

type ProgressMap = Record<string, boolean>;
type DataAwalMap = Record<string, string>;

interface StoredProgress {
  version: number;
  clusterId: string;
  subclusterId?: string;
  checked: ProgressMap;
  dataAwal: DataAwalMap;
  updatedAt: string;
}

const STORAGE_VERSION = 2;

function storageKey(clusterId: string, subclusterId?: string) {
  return `checklist-progress:${clusterId}:${subclusterId ?? "default"}`;
}

function buildInitialMap(items: ChecklistItem[]): ProgressMap {
  return items.reduce<ProgressMap>((acc, item) => {
    if (item.applies) {
      acc[item.id] = false;
    }
    return acc;
  }, {});
}

function buildInitialDataAwal(items: ChecklistItem[]): DataAwalMap {
  return items.reduce<DataAwalMap>((acc, item) => {
    if (item.applies && item.category === "Data Awal") {
      acc[item.id] = "";
    }
    return acc;
  }, {});
}

function normalizeDataAwal(values: DataAwalMap): DataAwalMap {
  const next = { ...values };
  const prodiAsal = next["prodi-asal"] ?? "";
  const options = new Set(getProdiTujuanOptions(prodiAsal));
  for (let i = 1; i <= 5; i++) {
    const key = `prioritas-pilihan-prodi-${i}`;
    const value = next[key] ?? "";
    if (value && !options.has(value)) {
      next[key] = "";
    }
  }
  return next;
}

function serialize(
  clusterId: string,
  subclusterId: string | undefined,
  checked: ProgressMap,
  dataAwal: DataAwalMap
): StoredProgress {
  return {
    version: STORAGE_VERSION,
    clusterId,
    subclusterId,
    checked,
    dataAwal,
    updatedAt: new Date().toISOString(),
  };
}

export function useChecklistProgress(
  clusterId: string,
  subclusterId: string | undefined,
  items: ChecklistItem[]
) {
  const initialMap = useMemo(() => buildInitialMap(items), [items]);
  const initialDataAwal = useMemo(() => buildInitialDataAwal(items), [items]);

  const [checked, setChecked] = useState<ProgressMap>(initialMap);
  const [dataAwal, setDataAwal] = useState<DataAwalMap>(initialDataAwal);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = storageKey(clusterId, subclusterId);
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed: StoredProgress = JSON.parse(raw);
        if (
          parsed.version === STORAGE_VERSION &&
          parsed.clusterId === clusterId &&
          parsed.subclusterId === subclusterId
        ) {
          setChecked((prev) => ({
            ...initialMap,
            ...parsed.checked,
          }));
          setDataAwal(
            normalizeDataAwal({
              ...initialDataAwal,
              ...parsed.dataAwal,
            })
          );
        }
      }
    } catch {
      // Ignore malformed storage
    }
    setHydrated(true);
  }, [clusterId, subclusterId, items, initialMap, initialDataAwal]);

  useEffect(() => {
    if (typeof window === "undefined" || !hydrated) return;
    const key = storageKey(clusterId, subclusterId);
    const data = serialize(clusterId, subclusterId, checked, dataAwal);
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [checked, dataAwal, clusterId, subclusterId, hydrated]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const setValue = useCallback((id: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: value }));
  }, []);

  const setDataAwalValue = useCallback((id: string, value: string) => {
    setDataAwal((prev) => {
      const next = { ...prev, [id]: value };
      if (id === "prodi-asal") {
        const options = new Set(getProdiTujuanOptions(value));
        for (let i = 1; i <= 5; i++) {
          const key = `prioritas-pilihan-prodi-${i}`;
          if (next[key] && !options.has(next[key])) {
            next[key] = "";
          }
        }
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setChecked(buildInitialMap(items));
    setDataAwal(buildInitialDataAwal(items));
  }, [items]);

  const applicableItems = useMemo(
    () => items.filter((item) => item.applies && item.category !== "Link Penting"),
    [items]
  );

  const stats = useMemo(() => {
    const byCategory = (category: string) =>
      applicableItems.filter((item) => item.category === category);

    const dataAwalItems = byCategory("Data Awal");
    const nonDokumenItems = byCategory("Checklist Non-Dokumen");
    const dokumenItems = byCategory("Checklist Dokumen");

    const priorities = Array.from({ length: 5 }, (_, i) =>
      (dataAwal[`prioritas-pilihan-prodi-${i + 1}`] ?? "").trim()
    );
    const statusText = computeProdiStatus(
      dataAwal["prodi-asal"]?.trim(),
      priorities
    );
    const statusDone = isProdiStatusComplete(statusText);

    const dataAwalTotal = dataAwalItems.length;
    let dataAwalDone = 0;
    for (const item of dataAwalItems) {
      if (item.id === "status-pilihan-prodi") {
        if (statusDone) dataAwalDone += 1;
      } else if ((dataAwal[item.id] ?? "").trim()) {
        dataAwalDone += 1;
      }
    }

    const computeCheckboxStats = (categoryItems: ChecklistItem[]) => {
      const total = categoryItems.length;
      const done = categoryItems.filter((item) => checked[item.id]).length;
      return {
        total,
        done,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
      };
    };

    const nonDokumen = computeCheckboxStats(nonDokumenItems);
    const dokumen = computeCheckboxStats(dokumenItems);

    const overallTotal = nonDokumen.total + dokumen.total;
    const overallDone = nonDokumen.done + dokumen.done;

    return {
      dataAwal: {
        total: dataAwalTotal,
        done: dataAwalDone,
        percent: dataAwalTotal === 0 ? 0 : Math.round((dataAwalDone / dataAwalTotal) * 100),
        statusText,
        statusDone,
      },
      nonDokumen,
      dokumen,
      overall: {
        total: overallTotal,
        done: overallDone,
        percent: overallTotal === 0 ? 0 : Math.round((overallDone / overallTotal) * 100),
      },
    };
  }, [applicableItems, checked, dataAwal]);

  const exportJson = useCallback(() => {
    const data = serialize(clusterId, subclusterId, checked, dataAwal);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeSub = subclusterId ? `-${subclusterId}` : "";
    a.download = `checklist-${clusterId}${safeSub}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [checked, dataAwal, clusterId, subclusterId]);

  const importJson = useCallback(
    (file: File) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed: StoredProgress = JSON.parse(String(reader.result));
            if (parsed.version !== STORAGE_VERSION) {
              reject(new Error("Versi file tidak didukung."));
              return;
            }
            if (
              parsed.clusterId !== clusterId ||
              parsed.subclusterId !== subclusterId
            ) {
              reject(
                new Error("File ini berasal dari klaster/sub-klaster berbeda.")
              );
              return;
            }
            setChecked((prev) => ({
              ...initialMap,
              ...parsed.checked,
            }));
            setDataAwal(
              normalizeDataAwal({
                ...initialDataAwal,
                ...parsed.dataAwal,
              })
            );
            resolve();
          } catch (err) {
            reject(err instanceof Error ? err : new Error("Gagal membaca file."));
          }
        };
        reader.onerror = () => reject(new Error("Gagal membaca file."));
        reader.readAsText(file);
      });
    },
    [clusterId, subclusterId, initialMap, initialDataAwal]
  );

  return {
    checked,
    dataAwal,
    hydrated,
    toggle,
    setValue,
    setDataAwal: setDataAwalValue,
    reset,
    stats,
    exportJson,
    importJson,
  };
}
