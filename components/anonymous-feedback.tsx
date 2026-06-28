"use client";

import { MessageCircle, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

import {
  MAX_FEEDBACK_LENGTH,
  MIN_FEEDBACK_LENGTH,
} from "@/lib/feedback/validation";

type FeedbackStatus =
  | { tone: "idle"; message: "" }
  | { tone: "error" | "success"; message: string };

export function AnonymousFeedback() {
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<FeedbackStatus>({
    tone: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedFeedback = feedback.trim();

    if (normalizedFeedback.length < MIN_FEEDBACK_LENGTH) {
      setStatus({
        tone: "error",
        message: `Tulis feedback minimal ${MIN_FEEDBACK_LENGTH} karakter agar dapat ditindaklanjuti.`,
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ tone: "idle", message: "" });

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: normalizedFeedback }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setStatus({
          tone: "error",
          message: payload?.message ?? "Feedback belum berhasil dikirim.",
        });
        return;
      }

      setFeedback("");
      setStatus({
        tone: "success",
        message: "Terima kasih. Feedback anonim sudah masuk ke dashboard Developer.",
      });
    } catch {
      setStatus({
        tone: "error",
        message: "Layanan feedback sedang tidak dapat dijangkau. Silakan coba kembali.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-ink-100 py-10 sm:py-14" aria-labelledby="anonymous-feedback-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <form
          className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            <div className="flex flex-1 gap-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-200 bg-ink-50 text-ink-700"
                aria-hidden="true"
              >
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                  Feedback anonim
                </p>
                <h2
                  id="anonymous-feedback-title"
                  className="mt-1 text-xl font-semibold text-ink-950"
                >
                  Beri feedback secara anonim di sini
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600">
                  Sampaikan kendala, saran tampilan, atau bagian checklist yang perlu dibuat
                  lebih jelas. Identitas pengguna tidak disimpan bersama feedback.
                </p>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-ink-700" htmlFor="feedback-text">
                Feedback
              </label>
              <textarea
                id="feedback-text"
                name="feedback"
                value={feedback}
                onChange={(event) => {
                  setFeedback(event.target.value);
                  if (status.tone !== "idle") {
                    setStatus({ tone: "idle", message: "" });
                  }
                }}
                placeholder="Contoh: alur checklist sudah jelas, tetapi penjelasan untuk dokumen Unit Kerja dapat dibuat lebih ringkas…"
                autoComplete="off"
                rows={4}
                maxLength={MAX_FEEDBACK_LENGTH}
                disabled={isSubmitting}
                aria-describedby="feedback-support-text"
                required
                className="mt-2 block w-full resize-y rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-950 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p
              id="feedback-support-text"
              className={`text-sm ${
                status.tone === "error"
                  ? "text-red-600"
                  : status.tone === "success"
                    ? "text-emerald-700"
                    : "text-ink-500"
              }`}
              role={status.tone === "error" ? "alert" : "status"}
            >
              {status.tone === "idle"
                ? `Maksimal ${MAX_FEEDBACK_LENGTH.toLocaleString("id-ID")} karakter. Data masuk ke dashboard Developer.`
                : status.message}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60"
            >
              <Send aria-hidden="true" className="h-4 w-4" />
              {isSubmitting ? "Mengirim…" : "Kirim Feedback"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
