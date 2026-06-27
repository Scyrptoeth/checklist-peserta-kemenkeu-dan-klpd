"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChecklistItem } from "@/lib/data/checklist-data";

type ProgressMap = Record<string, boolean>;

interface StoredProgress {
  version: number;
  clusterId: string;
  subclusterId?: string;
  checked: ProgressMap;
  updatedAt: string;
}

const STORAGE_VERSION = 1;

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

function serialize(clusterId: string, subclusterId: string | undefined, checked: ProgressMap): StoredProgress {
  return {
    version: STORAGE_VERSION,
    clusterId,
    subclusterId,
    checked,
    updatedAt: new Date().toISOString(),
  };
}

export function useChecklistProgress(
  clusterId: string,
  subclusterId: string | undefined,
  items: ChecklistItem[]
) {
  const initialMap = useMemo(() => buildInitialMap(items), [items]);
  const [checked, setChecked] = useState<ProgressMap>(initialMap);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = storageKey(clusterId, subclusterId);
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed: StoredProgress = JSON.parse(raw);
        if (parsed.version === STORAGE_VERSION) {
          setChecked((prev) => ({
            ...buildInitialMap(items),
            ...parsed.checked,
          }));
        }
      }
    } catch {
      // Ignore malformed storage
    }
    setHydrated(true);
  }, [clusterId, subclusterId, items]);

  useEffect(() => {
    if (typeof window === "undefined" || !hydrated) return;
    const key = storageKey(clusterId, subclusterId);
    const data = serialize(clusterId, subclusterId, checked);
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [checked, clusterId, subclusterId, hydrated]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const setValue = useCallback((id: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: value }));
  }, []);

  const reset = useCallback(() => {
    setChecked(buildInitialMap(items));
  }, [items]);

  const applicableItems = useMemo(
    () => items.filter((item) => item.applies && item.category !== "Link Penting"),
    [items]
  );

  const stats = useMemo(() => {
    const byCategory = (category: string) =>
      applicableItems.filter((item) => item.category === category);

    const compute = (categoryItems: ChecklistItem[]) => {
      const total = categoryItems.length;
      const done = categoryItems.filter((item) => checked[item.id]).length;
      return {
        total,
        done,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
      };
    };

    const dataAwal = compute(byCategory("Data Awal"));
    const nonDokumen = compute(byCategory("Checklist Non-Dokumen"));
    const dokumen = compute(byCategory("Checklist Dokumen"));
    const overallTotal = applicableItems.length;
    const overallDone = applicableItems.filter((item) => checked[item.id]).length;

    return {
      dataAwal,
      nonDokumen,
      dokumen,
      overall: {
        total: overallTotal,
        done: overallDone,
        percent: overallTotal === 0 ? 0 : Math.round((overallDone / overallTotal) * 100),
      },
    };
  }, [applicableItems, checked]);

  const exportJson = useCallback(() => {
    const data = serialize(clusterId, subclusterId, checked);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeSub = subclusterId ? `-${subclusterId}` : "";
    a.download = `checklist-${clusterId}${safeSub}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [checked, clusterId, subclusterId]);

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
            if (parsed.clusterId !== clusterId || parsed.subclusterId !== subclusterId) {
              reject(new Error("File ini berasal dari klaster/sub-klaster berbeda."));
              return;
            }
            setChecked((prev) => ({
              ...buildInitialMap(items),
              ...parsed.checked,
            }));
            resolve();
          } catch (err) {
            reject(err instanceof Error ? err : new Error("Gagal membaca file."));
          }
        };
        reader.onerror = () => reject(new Error("Gagal membaca file."));
        reader.readAsText(file);
      });
    },
    [clusterId, subclusterId, items]
  );

  return {
    checked,
    hydrated,
    toggle,
    setValue,
    reset,
    stats,
    exportJson,
    importJson,
  };
}
