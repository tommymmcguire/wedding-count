"use client";

import { useState } from "react";
import type { GuestMatch } from "@/lib/guests";

type Props = {
  onSelect: (match: GuestMatch) => void;
};

export function GuestSearch({ onSelect }: Props) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length === 0) return;

    setSubmitting(true);
    setNotFound(false);
    setError(null);

    try {
      const res = await fetch(`/api/guests?name=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { match: GuestMatch | null };
      if (data.match) {
        onSelect(data.match);
      } else {
        setNotFound(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-center text-[0.7rem] uppercase tracking-[0.25em] text-ink/50">
          Type your full name as it appears on your invitation
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNotFound(false);
            setError(null);
          }}
          placeholder="e.g. Jane Smith"
          autoComplete="off"
          className="w-full rounded-md border border-line bg-card px-4 py-3 text-center text-base text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/40"
          autoFocus
        />
      </label>

      <button
        type="submit"
        disabled={submitting || name.trim().length === 0}
        className="w-full rounded-md bg-ink px-4 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-paper transition hover:bg-ink/85 disabled:cursor-not-allowed disabled:bg-ink/25"
      >
        {submitting ? "Checking…" : "Continue"}
      </button>

      {notFound && (
        <p className="rounded-md border border-line bg-card px-4 py-3 text-center text-sm font-light text-ink/70">
          We couldn't find that name. Please make sure it's spelled exactly as it appears
          on your invitation, or reach out to the couple.
        </p>
      )}
      {error && (
        <p className="text-center text-sm font-light text-terracotta">{error}</p>
      )}
    </form>
  );
}
