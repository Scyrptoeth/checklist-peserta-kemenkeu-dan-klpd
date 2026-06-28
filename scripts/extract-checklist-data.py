import pandas as pd
from pathlib import Path
import json
import re

BASE = Path("/Users/persiapantubel/Desktop/codex/persiapantubel/checklist-peserta-kemenkeu-dan-klpd")
OUT = BASE / "lib" / "data" / "checklist-data.ts"
REF_OUT = BASE / "lib" / "data" / "reference-data.ts"

# Fields in "Data Awal" that should not be rendered nor counted in progress.
HIDDEN_DATA_AWAL_LABELS = {
    "Unit/Satuan Kerja",
    "Nama PIC Unit/Satuan Kerja",
    "NIP",
    "NAMA",
    "EMAIL",
    "ID INSTANSI",
}

JALUR_OPTIONS = ["Reguler", "Afirmasi"]

# Additional KLPD dokumen items that are not present in the Excel prototype but are
# required for KLPD participants. Injected before the "Link" column on regeneration.
KLPD_EXTRA_DOKUMEN_ITEMS = [
    {
        "id": "surat-rekomendasi-kepala-unit-kerja-tte-atau-tanda-tangan-basah-dan-stemple-berformat-pdf-pic-unit-kerja",
        "label": "Surat Rekomendasi Kepala Unit Kerja (TTE atau Tanda Tangan Basah dan Stemple) Berformat PDF (Subjek: Unit Kerja)",
        "category": "Checklist Dokumen",
        "applies": True,
        "rawFlag": "Wajib untuk Semua Unit Kerja",
        "subject": "Subjek: Unit Kerja",
    },
    {
        "id": "nota-dinas-usulan-pendaftar-spmb-tb-tte-atau-tanda-tangan-basah-dan-stempel-berformat-pdf-subjek-unit-kerja",
        "label": "Nota Dinas Usulan Pendaftar SPMB TB (TTE atau Tanda Tangan Basah dan Stempel) Berformat PDF (Subjek: Unit Kerja)",
        "category": "Checklist Dokumen",
        "applies": True,
        "rawFlag": "Wajib untuk Semua Unit Kerja",
        "subject": "Subjek: Unit Kerja",
    },
]


def slugify(text: str) -> str:
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    return re.sub(r"[-\s]+", "-", text)


def clean_header(value):
    if pd.isna(value):
        return ""
    return str(value).strip()


def ts_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def normalize_label(label: str) -> str:
    """Standardize legacy 'PIC:' suffix to 'Subjek:' in checklist labels."""
    return re.sub(r"\(PIC:\s*", "(Subjek: ", label, flags=re.IGNORECASE)


def parse_subject(label: str) -> str | None:
    """Extract trailing '(Subjek: ...)' suffix used for document grouping."""
    match = re.search(r"\((Subjek:[^)]+)\)$", label)
    if match:
        return match.group(1).strip()
    return None


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

        label = normalize_label(h)
        subject = parse_subject(label) if cat == "Checklist Dokumen" else None
        categories.append({
            "id": slugify(h),
            "label": label,
            "category": cat,
            "applies": active,
            "rawFlag": str(flag_value).strip() if not pd.isna(flag_value) else "",
            "subject": subject,
        })

    return categories


def extract_reference_data(kemenkeu_path: Path, klpd_path: Path):
    # BidangList = DATA!$A$4:$A$203 in Kemenkeu Excel (1-indexed)
    df_kemenkeu = pd.read_excel(kemenkeu_path, sheet_name="DATA", header=None)
    bidang_values = df_kemenkeu.iloc[3:203, 0]
    bidang_list = [
        str(v).strip()
        for v in bidang_values
        if pd.notna(v) and str(v).strip() and str(v).strip().lower() != "nan"
    ]

    # K_1 .. K_n = columns B..GR rows 4..53 for each entry in bidangList
    prodi_tujuan_map: dict[str, list[str]] = {}
    for i, prodi in enumerate(bidang_list):
        col_idx = 1 + i  # column B is index 1
        if col_idx >= df_kemenkeu.shape[1]:
            break
        col_values = df_kemenkeu.iloc[3:53, col_idx]
        seen = set()
        options = []
        for v in col_values:
            if pd.isna(v):
                continue
            s = str(v).strip()
            if not s or s.lower() == "nan":
                continue
            if s not in seen:
                seen.add(s)
                options.append(s)
        prodi_tujuan_map[prodi] = options

    # KLPD instansi list = DATA!$HA$4:$HA$199 in KLPD Excel
    df_klpd = pd.read_excel(klpd_path, sheet_name="DATA", header=None)
    instansi_values = df_klpd.iloc[3:199, 208]  # HA is column 209 => index 208
    klpd_instansi_list = [
        str(v).strip()
        for v in instansi_values
        if pd.notna(v) and str(v).strip() and str(v).strip().lower() != "nan"
    ]

    return {
        "bidangList": bidang_list,
        "prodiTujuanMap": prodi_tujuan_map,
        "klpdInstansiList": klpd_instansi_list,
        "jalurOptions": JALUR_OPTIONS,
    }


def decorate_data_awal(item: dict, is_kemenkeu: bool, ref: dict) -> dict:
    """Attach fieldType/options/dependsOn to visible Data Awal items."""
    if item["category"] != "Data Awal" or not item["applies"]:
        return item

    fid = item["id"]
    extra: dict = {}

    if fid == "unit-kerja":
        extra["fieldType"] = "text" if is_kemenkeu else "select"
        if not is_kemenkeu:
            extra["options"] = ref["klpdInstansiList"]
    elif fid == "jalur":
        extra["fieldType"] = "select"
        extra["options"] = ref["jalurOptions"]
    elif fid == "prodi-asal":
        extra["fieldType"] = "select"
        extra["options"] = ref["bidangList"]
    elif fid.startswith("prioritas-pilihan-prodi-"):
        extra["fieldType"] = "select"
        extra["dependsOn"] = "prodi-asal"
    elif fid == "status-pilihan-prodi":
        extra["fieldType"] = "computed"

    return {**item, **extra}


def build_data():
    kemenkeu_path = BASE / "checklistPesertaKemenkeu.xlsx"
    klpd_path = BASE / "checklistPesertaKlpd.xlsx"

    ref = extract_reference_data(kemenkeu_path, klpd_path)

    clusters = [
        {"id": "djbc", "label": "DJBC", "full": "Direktorat Jenderal Bea dan Cukai"},
        {"id": "djp", "label": "DJP", "full": "Direktorat Jenderal Pajak"},
        {"id": "djpb", "label": "DJPb", "full": "Direktorat Jenderal Perbendaharaan"},
        {"id": "ue-1", "label": "UE-1", "full": "UE-1 Selain DJBC, DJP dan DJPb"},
    ]

    kemenkeu_checklists = {}
    for cluster in clusters:
        items = extract_checklist(kemenkeu_path, "checklistPesertaKemenkeu", cluster["id"])
        kemenkeu_checklists[cluster["id"]] = [decorate_data_awal(item, True, ref) for item in items]

    klpd_items = extract_checklist(klpd_path, "checklistPesertaKlpd", None)

    # Inject additional KLPD Unit Kerja dokumen items before the Link column.
    for i, item in enumerate(klpd_items):
        if item["category"] == "Link Penting":
            klpd_items[i:i] = KLPD_EXTRA_DOKUMEN_ITEMS
            break

    klpd_items = [decorate_data_awal(item, False, ref) for item in klpd_items]

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
        "ref": ref,
    }


def emit_reference_data(ref: dict):
    lines = [
        "// Auto-generated from Excel prototypes.",
        "// Do not edit manually; regenerate with scripts/extract-checklist-data.py",
        "",
        'export const jalurOptions = ["Reguler", "Afirmasi"] as const;',
        "",
        f"export const bidangList = {json.dumps(ref['bidangList'], ensure_ascii=False)} as const;",
        "",
        "export const prodiTujuanMap: Record<string, string[]> = "
        f"{json.dumps(ref['prodiTujuanMap'], ensure_ascii=False)};",
        "",
        f"export const klpdInstansiList = {json.dumps(ref['klpdInstansiList'], ensure_ascii=False)} as const;",
        "",
        "export function getProdiTujuanOptions(prodiAsal: string | undefined): string[] {",
        '  if (!prodiAsal) return [];',
        "  return prodiTujuanMap[prodiAsal] ?? [];",
        "}",
        "",
        "export type ProdiAsal = typeof bidangList[number];",
        'export type Jalur = typeof jalurOptions[number];',
        "",
    ]

    REF_OUT.parent.mkdir(parents=True, exist_ok=True)
    REF_OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {REF_OUT}")


def emit_checklist_data(data: dict):
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
        'export type DataAwalFieldType = "text" | "select" | "computed";',
        "",
        "export interface ChecklistItem {",
        '  id: string;',
        '  label: string;',
        '  category: ChecklistCategory;',
        '  applies: boolean;',
        '  link?: string;',
        '  rawFlag?: string;',
        '  subject?: string;',
        '  fieldType?: DataAwalFieldType;',
        '  options?: string[];',
        '  dependsOn?: string;',
        "}",
        "",
        "export interface DataAwalField extends ChecklistItem {",
        '  fieldType: DataAwalFieldType;',
        "}",
        "",
        "export function isDataAwalField(item: ChecklistItem): item is DataAwalField {",
        '  return typeof item.fieldType === "string";',
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
            lines.append(emit_item(item))
        lines.append("  ],")
    lines.append("};")
    lines.append("")

    klpd = data["klpd"]
    lines.append(f'export const klpdCluster: Cluster = {{ id: "klpd", label: "{klpd["label"]}", full: "{ts_escape(klpd["full"])}" }};')
    lines.append("")
    lines.append("export const klpdChecklist: ChecklistItem[] = [")
    for item in klpd["checklist"]:
        lines.append(emit_item(item))
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


def emit_item(item: dict) -> str:
    link = item.get("link", "")
    raw = item.get("rawFlag", "")
    subject = item.get("subject", "")
    parts = [
        f'id: "{item["id"]}"',
        f'label: "{ts_escape(item["label"])}"',
        f'category: "{item["category"]}"',
        f'applies: {str(item["applies"]).lower()}',
        f'link: "{ts_escape(link)}"',
        f'rawFlag: "{ts_escape(raw)}"',
    ]
    if subject:
        parts.append(f'subject: "{ts_escape(subject)}"')
    if item.get("fieldType"):
        parts.append(f'fieldType: "{item["fieldType"]}"')
    if item.get("options") is not None:
        opts = ", ".join(f'"{ts_escape(o)}"' for o in item["options"])
        parts.append(f"options: [{opts}]")
    if item.get("dependsOn"):
        parts.append(f'dependsOn: "{item["dependsOn"]}"')
    return "    { " + ", ".join(parts) + " },"


def emit():
    data = build_data()
    emit_reference_data(data["ref"])
    emit_checklist_data(data)


if __name__ == "__main__":
    emit()
