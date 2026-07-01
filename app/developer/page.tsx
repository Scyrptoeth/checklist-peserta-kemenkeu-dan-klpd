import type { Metadata } from "next";
import { DeveloperDashboard } from "@/components/developer-dashboard";
import { DeveloperLoginForm } from "@/components/developer-login-form";
import { getDeveloperSessionFromCookie } from "@/lib/developer/session";
import {
  ensureFeedbackSchema,
  getFeedbackSql,
  type DeveloperFeedbackRow,
} from "@/lib/feedback/database";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function DeveloperPage() {
  const session = await getDeveloperSessionFromCookie();

  if (!session) {
    return <DeveloperLoginForm />;
  }

  let feedbackItems: { id: number; feedbackText: string; createdAt: string }[] = [];

  try {
    await ensureFeedbackSchema();
    const sql = getFeedbackSql();

    const rows = (await sql`
      SELECT id, feedback_text, created_at
      FROM checklist_peserta_anonymous_feedback
      ORDER BY created_at DESC
      LIMIT 100
    `) as unknown as DeveloperFeedbackRow[];

    feedbackItems = rows.map((row) => ({
      id: Number(row.id),
      feedbackText: row.feedback_text,
      createdAt: toIsoString(row.created_at) ?? "",
    }));
  } catch {
    // If the database is unreachable, render empty state so the page still loads.
    feedbackItems = [];
  }

  return <DeveloperDashboard feedbackItems={feedbackItems} />;
}

function toIsoString(value: Date | string | null): string | null {
  if (!value) return null;
  return new Date(value).toISOString();
}
