import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getClusterChecklist,
  kemenkeuClusters,
} from "@/lib/data/checklist-data";
import { ChecklistPageClient } from "@/components/checklist-page-client";

interface Props {
  params: { subcluster: string };
}

export function generateStaticParams() {
  return kemenkeuClusters.map((c) => ({ subcluster: c.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cluster = kemenkeuClusters.find((c) => c.id === params.subcluster);
  return {
    title: cluster
      ? `Checklist ${cluster.label} — SPMB PT PKN STAN 2026`
      : "Checklist Tidak Ditemukan",
    robots: { index: false, follow: false },
  };
}

export default function KemenkeuChecklistPage({ params }: Props) {
  const cluster = kemenkeuClusters.find((c) => c.id === params.subcluster);
  if (!cluster) return notFound();

  const items = getClusterChecklist("kemenkeu", cluster.id);

  return (
    <ChecklistPageClient
      clusterId="kemenkeu"
      subclusterId={cluster.id}
      clusterLabel="Kementerian Keuangan"
      subclusterLabel={cluster.full}
      items={items}
    />
  );
}
