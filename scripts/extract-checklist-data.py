import pandas as pd
from pathlib import Path
import json
import re

BASE = Path("/Users/persiapantubel/Desktop/codex/persiapantubel/checklist-peserta-kemenkeu-dan-klpd")
OUT = BASE / "lib" / "data" / "checklist-data.ts"


def slugify(text: str) -> str:
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    return re.sub(r"[-\s]+", "-", text)


def clean_header(value):
    if pd.isna(value):
        return ""
    return str(value).strip()


# Fields in "Data Awal" that should not be rendered nor counted in progress.
HIDDEN_DATA_AWAL_LABELS = {
    "Unit/Satuan Kerja",
    "Nama PIC Unit/Satuan Kerja",
    "NIP",
    "NAMA",
    "EMAIL",
    "ID INSTANSI",
}


def parse_flag(value, cluster: str | None = None):
    if pd.isna(value):
        return False
    text = str(value).strip().lower()
    if text in ("", "nan"):
        return False
    if "semua unit kerja" in text:
        return True
    if cluster is None:
        return True
    # Determine if this cluster is mentioned
    cluster_lower = cluster.lower()
    # Handle DJPb vs DJP ambiguity: require word boundary for "djp"
    if cluster_lower == "djpb":
        return "djpb" in text
    if cluster_lower == "djp":
        # DJP should not match DJPb
        return bool(re.search(r"\bdjp\b(?!b)", text)) or text == "wajib untuk djp"
    if cluster_lower == "djbc":
        return "djbc" in text
    if cluster_lower == "ue-1":
        return "ue-1" in text or "ue 1" in text or "selain djbc, djp dan djpb" in text
    return cluster_lower in text


def extract_checklist(path: Path, sheet_name: str, cluster: str | None = None):
    df = pd.read_excel(path, sheet_name=sheet_name, header=None)
    headers = [clean_header(v) for v in df.iloc[4].values]
    flags = df.iloc[5].values if len(df) > 5 else []

    # Category boundaries inferred from row 1 group headers
    # Kemenkeu: 0-16 Data Awal, 17-31 Non-Dokumen, 32-49 Dokumen, 51 Link
    # KLPD: 0-15 Data Awal, 16-19 Non-Dokumen, 20-26 Dokumen, 28 Link
    categories = []
    n_cols = len(headers)
    for idx in range(n_cols):
        h = headers[idx]
        if not h:
            continue
        if h in ("No", "_avail"):
            continue

        if idx == 0:
            cat = "Data Awal"
        else:
            # determine by index
            if "kemenkeu" in path.name.lower():
                if 1 <= idx <= 16:
                    cat = "Data Awal"
                elif 17 <= idx <= 31:
                    cat = "Checklist Non-Dokumen"
                elif 32 <= idx <= 49:
                    cat = "Checklist Dokumen"
                elif idx == 51:
                    cat = "Link Penting"
                else:
                    continue
            else:
                if 1 <= idx <= 15:
                    cat = "Data Awal"
                elif 16 <= idx <= 19:
                    cat = "Checklist Non-Dokumen"
                elif 20 <= idx <= 26:
                    cat = "Checklist Dokumen"
                elif idx == 28:
                    cat = "Link Penting"
                else:
                    continue

        flag_value = flags[idx] if idx < len(flags) else ""
        # Data Awal fields are applicable as a completion checklist unless
        # explicitly marked as hidden (e.g. auto-populated identity fields).
        if cat == "Data Awal":
            active = h not in HIDDEN_DATA_AWAL_LABELS
        else:
            active = parse_flag(flag_value, cluster)

        categories.append({
            "id": slugify(h),
            "label": h,
            "category": cat,
            "applies": active,
            "rawFlag": str(flag_value).strip() if not pd.isna(flag_value) else "",
        })

    return categories


def build_data():
    kemenkeu_path = BASE / "checklistPesertaKemenkeu.xlsx"
    klpd_path = BASE / "checklistPesertaKlpd.xlsx"

    clusters = [
        {"id": "djbc", "label": "DJBC", "full": "Direktorat Jenderal Bea dan Cukai"},
        {"id": "djp", "label": "DJP", "full": "Direktorat Jenderal Pajak"},
        {"id": "djpb", "label": "DJPb", "full": "Direktorat Jenderal Perbendaharaan"},
        {"id": "ue-1", "label": "UE-1", "full": "UE-1 Selain DJBC, DJP dan DJPb"},
    ]

    kemenkeu_checklists = {}
    for cluster in clusters:
        items = extract_checklist(kemenkeu_path, "checklistPesertaKemenkeu", cluster["id"])
        kemenkeu_checklists[cluster["id"]] = items

    klpd_items = extract_checklist(klpd_path, "checklistPesertaKlpd", None)

    return {
        "kemenkeu": {
            "clusters": clusters,
            "checklists": kemenkeu_checklists,
        },
        "klpd": {
            "label": "KLPD",
            "full": "Kementerian/Lembaga/Pemerintah Daerah",
            "checklist": klpd_items,
        },
    }


def ts_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def emit():
    data = build_data()

    lines = [
        "// Auto-generated from Excel prototypes.",
        "// Do not edit manually; regenerate with scripts/extract-checklist-data.py",
        "",
        "export type ChecklistCategory =",
        '  | "Data Awal"',
        '  | "Checklist Non-Dokumen"',
        '  | "Checklist Dokumen"',
        '  | "Link Penting";',
        "",
        "export type ClusterId = 'kemenkeu' | 'klpd';",
        "",
        "export interface ChecklistItem {",
        '  id: string;',
        '  label: string;',
        '  category: ChecklistCategory;',
        '  applies: boolean;',
        '  link?: string;',
        '  rawFlag?: string;',
        "}",
        "",
        "export interface Cluster {",
        '  id: string;',
        '  label: string;',
        '  full: string;',
        "}",
        "",
        "export const kemenkeuClusters: Cluster[] = [",
    ]
    for c in data["kemenkeu"]["clusters"]:
        lines.append(f'  {{ id: "{c["id"]}", label: "{c["label"]}", full: "{ts_escape(c["full"])}" }},')
    lines.append("];")
    lines.append("")

    lines.append("export const kemenkeuChecklists: Record<string, ChecklistItem[]> = {")
    for cid, items in data["kemenkeu"]["checklists"].items():
        lines.append(f'  "{cid}": [')
        for item in items:
            link = item.get("link", "")
            raw = item.get("rawFlag", "")
            lines.append(f'    {{ id: "{item["id"]}", label: "{ts_escape(item["label"])}", category: "{item["category"]}", applies: {str(item["applies"]).lower()}, link: "{ts_escape(link)}", rawFlag: "{ts_escape(raw)}" }},')
        lines.append("  ],")
    lines.append("};")
    lines.append("")

    klpd = data["klpd"]
    lines.append(f'export const klpdCluster: Cluster = {{ id: "klpd", label: "{klpd["label"]}", full: "{ts_escape(klpd["full"])}" }};')
    lines.append("")
    lines.append("export const klpdChecklist: ChecklistItem[] = [")
    for item in klpd["checklist"]:
        link = item.get("link", "")
        raw = item.get("rawFlag", "")
        lines.append(f'  {{ id: "{item["id"]}", label: "{ts_escape(item["label"])}", category: "{item["category"]}", applies: {str(item["applies"]).lower()}, link: "{ts_escape(link)}", rawFlag: "{ts_escape(raw)}" }},')
    lines.append("];")
    lines.append("")

    lines.append("export const allClusterIds = ['kemenkeu', 'klpd'] as const;")
    lines.append("")
    lines.append("export function getClusterLabel(id: ClusterId | string): string {")
    lines.append('  if (id === "klpd") return klpdCluster.label;')
    lines.append('  return "Kemenkeu";')
    lines.append("}")
    lines.append("")
    lines.append("export function getClusterChecklist(clusterId: ClusterId | string, subclusterId?: string): ChecklistItem[] {")
    lines.append('  if (clusterId === "klpd") return klpdChecklist;')
    lines.append('  if (subclusterId && kemenkeuChecklists[subclusterId]) return kemenkeuChecklists[subclusterId];')
    lines.append('  return [];')
    lines.append("}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    emit()
