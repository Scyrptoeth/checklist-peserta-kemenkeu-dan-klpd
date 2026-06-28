"use client";

import { ExternalLink, Link2 } from "lucide-react";

interface LinkContainerProps {
  links: { label: string; url?: string }[];
}

export function LinkContainer({ links }: LinkContainerProps) {
  const filledLinks = links.filter((l) => l.url && l.url.trim() !== "");

  return (
    <section className="rounded-2xl border border-brand-200 bg-brand-50/50 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Link2 className="h-5 w-5 text-brand-700" />
        <h2 className="text-lg font-semibold tracking-tight text-ink-950">Link Penting</h2>
      </div>
      {filledLinks.length === 0 ? (
        <p className="text-sm leading-relaxed text-ink-600">Akan segera diperbarui.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filledLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-brand-700 underline-offset-2 hover:text-brand-900 hover:underline"
              >
                {link.label}
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
