"use client";

import { KeyRound } from "lucide-react";
import { type FormEvent, useState } from "react";

export function DeveloperLoginForm() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/developer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setError(payload?.message ?? "Login gagal. Silakan coba lagi.");
        return;
      }

      window.location.reload();
    } catch {
      setError("Login gagal. Periksa koneksi internet Kamu.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-ink-50 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
          <KeyRound className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-center text-xl font-semibold text-ink-950">
          Akses Developer
        </h1>
        <p className="mt-2 text-center text-sm text-ink-600">
          Halaman ini khusus untuk mengelola feedback anonim yang masuk.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="developer-password"
              className="block text-sm font-medium text-ink-700"
            >
              Password Developer
            </label>
            <input
              id="developer-password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 block w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-950 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {isLoading ? "Memverifikasi…" : "Masuk"}
          </button>
        </form>
      </section>
    </main>
  );
}
