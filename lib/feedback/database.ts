import { neon } from "@neondatabase/serverless";

let sqlClient: ReturnType<typeof neon> | null = null;
let schemaPromise: Promise<void> | null = null;

export interface DeveloperFeedbackRow {
  id: number;
  feedback_text: string;
  created_at: Date | string;
}

export function isFeedbackDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getFeedbackSql(): ReturnType<typeof neon> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required for feedback storage.");
  }

  sqlClient ??= neon(databaseUrl);
  return sqlClient;
}

export async function ensureFeedbackSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = createFeedbackSchema().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }

  return schemaPromise;
}

async function createFeedbackSchema(): Promise<void> {
  const sql = getFeedbackSql();

  await sql`
    CREATE TABLE IF NOT EXISTS checklist_peserta_anonymous_feedback (
      id BIGSERIAL PRIMARY KEY,
      feedback_text TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS checklist_peserta_feedback_created_at_idx
    ON checklist_peserta_anonymous_feedback (created_at DESC)
  `;
}
