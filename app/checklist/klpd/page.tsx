import { getClusterChecklist, klpdCluster } from "@/lib/data/checklist-data";
import { ChecklistPageClient } from "@/components/checklist-page-client";

export const metadata = {
  title: "Checklist KLPD — SPMB PT PKN STAN 2026",
};

export default function KlpdChecklistPage() {
  const items = getClusterChecklist("klpd");

  return (
    <ChecklistPageClient
      clusterId="klpd"
      clusterLabel="Kementerian/Lembaga/Pemerintah Daerah"
      subclusterLabel={klpdCluster.full}
      items={items}
    />
  );
}
