"use client";

import { ArrowLeft, LogOut, MessageSquare, UsersRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface FeedbackItem {
  id: number;
  feedbackText: string;
  createdAt: string;
}

interface DeveloperDashboardProps {
  feedbackItems: FeedbackItem[];
}

export function DeveloperDashboard({ feedbackItems }: DeveloperDashboardProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/developer/logout", { method: "POST" });
    } finally {
      window.location.reload();
    }
  }

  return (
    <main className="min-h-dvh bg-ink-50 pb-20">
      <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <MessageSquare className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-base font-semibold text-ink-950">Developer</h1>
              <p className="text-xs text-ink-500">Feedback anonim pengguna</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Keluar…" : "Keluar"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                Feedback anonim
              </p>
              <h2 className="mt-1 text-xl font-semibold text-ink-950">
                Masukan pengguna terbaru
              </h2>
            </div>
            <span className="rounded-full bg-ink-100 px-3 py-1 text-sm font-medium text-ink-700">
              {feedbackItems.length.toLocaleString("id-ID")} feedback
            </span>
          </div>

          {feedbackItems.length > 0 ? (
            <div className="mt-6 divide-y divide-ink-100">
              {feedbackItems.map((feedback) => (
                <article
                  key={feedback.id}
                  className="py-5 first:pt-0 last:pb-0"
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-800">
                    {feedback.feedbackText}
                  </p>
                  <time
                    dateTime={feedback.createdAt}
                    className="mt-2 block text-xs text-ink-500"
                  >
                    {formatDateTime(feedback.createdAt)}
                  </time>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex items-start gap-4 rounded-xl bg-ink-50 p-6 text-ink-600">
              <UsersRound className="h-6 w-6 shrink-0" aria-hidden="true" />
              <div>
                <strong className="block text-sm font-medium text-ink-900">
                  Belum ada feedback
                </strong>
                <p className="mt-1 text-sm">
                  Feedback yang dikirim pengguna akan tampil di sini secara anonim.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(date);
}
