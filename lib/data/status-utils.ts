import { prodiTujuanMap } from "./reference-data";

export function computeProdiStatus(
  prodiAsal: string | null | undefined,
  priorities: string[]
): string {
  if (!prodiAsal) return "";
  const avail = (prodiTujuanMap[prodiAsal] ?? []).length;
  if (avail === 0) return "";

  const filled = priorities.filter((p) => p && p.trim() !== "");
  const count = filled.length;

  if (count > avail) {
    return `Seluruh pilihan telah dipilih, Kamu memilih lebih dari kemungkinan pilihan yang tersedia, periksa pilihan Kamu (${count}/${avail})`;
  }

  if (count === avail) {
    const frequencies: Record<string, number> = {};
    for (const value of filled) {
      frequencies[value] = (frequencies[value] ?? 0) + 1;
    }
    const sumOfSquares = Object.values(frequencies).reduce(
      (sum, freq) => sum + freq * freq,
      0
    );
    if (sumOfSquares > count) {
      return `Terdapat pilihan yang sama, segera ubah (${count}/${avail})`;
    }
    return `Seluruh pilihan telah dipilih (${count}/${avail})`;
  }

  if (count > 0) {
    return `Masih terdapat pilihan yang bisa dipilih, silahkan melengkapi pilihan (${count}/${avail})`;
  }

  return "";
}

export function isProdiStatusComplete(statusText: string): boolean {
  if (!statusText) return false;
  if (!statusText.startsWith("Seluruh pilihan telah dipilih")) return false;
  if (statusText.includes("lebih") || statusText.includes("sama")) return false;
  return true;
}
