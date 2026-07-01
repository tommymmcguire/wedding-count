"use client";

import { useEffect, useMemo, useState } from "react";
import {
  RSVP_STATUSES,
  STATUSES_REQUIRING_ADDRESS,
  statusLabelFor,
  type HouseholdDetail,
  type RsvpStatus,
} from "@/lib/guests";

type Props = {
  householdId: string;
  onSubmitted: () => void;
  onBack: () => void;
};

type FormState = {
  status: RsvpStatus | null;
  attending: Record<string, boolean>;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  note: string;
};

const EMPTY_FORM: FormState = {
  status: null,
  attending: {},
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  note: "",
};

export function RsvpForm({ householdId, onSubmitted, onBack }: Props) {
  const [detail, setDetail] = useState<HouseholdDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/guests?household_id=${encodeURIComponent(householdId)}`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as HouseholdDetail;
        if (cancelled) return;

        setDetail(data);
        const attending: Record<string, boolean> = {};
        const hasPriorSubmission = !!data.existingRsvp.submittedAt;
        for (const m of data.members) {
          if (hasPriorSubmission) {
            attending[m.guestId] = m.attending === true;
          } else {
            attending[m.guestId] = true;
          }
        }

        setForm({
          status: data.existingRsvp.status,
          attending,
          addressLine1: data.existingRsvp.addressLine1,
          addressLine2: data.existingRsvp.addressLine2,
          city: data.existingRsvp.city,
          state: data.existingRsvp.state,
          postalCode: data.existingRsvp.postalCode,
          country: data.existingRsvp.country,
          note: data.existingRsvp.note,
        });
      } catch {
        if (!cancelled) {
          setLoadError("Couldn't load your household. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [householdId]);

  const requiresAddress = useMemo(
    () => form.status !== null && STATUSES_REQUIRING_ADDRESS.includes(form.status),
    [form.status],
  );

  const anyAttending = useMemo(
    () => Object.values(form.attending).some(Boolean),
    [form.attending],
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!detail || !form.status) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const attendingGuestIds = detail.members
        .filter((m) => form.attending[m.guestId])
        .map((m) => m.guestId);

      if (attendingGuestIds.length === 0) {
        setSubmitError("Please select at least one guest.");
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          householdId,
          status: form.status,
          attendingGuestIds,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
          note: form.note,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setSubmitError(data?.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      onSubmitted();
    } catch {
      setSubmitError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-sm text-neutral-500">Loading your household…</p>;
  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>;
  if (!detail) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
      >
        ← Search for a different name
      </button>

      {detail.members.length > 1 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">Who are these plans for?</h2>
          <p className="text-sm text-neutral-600">
            Uncheck anyone not included in this response.
          </p>
          <ul className="space-y-2">
            {detail.members.map((member) => (
              <li key={member.guestId}>
                <label className="flex items-center gap-3 rounded-md border border-neutral-200 bg-white px-4 py-3">
                  <input
                    type="checkbox"
                    checked={!!form.attending[member.guestId]}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        attending: { ...f.attending, [member.guestId]: e.target.checked },
                      }))
                    }
                    className="h-4 w-4"
                  />
                  <span className="text-neutral-900">{member.guestName}</span>
                </label>
              </li>
            ))}
          </ul>
          {!anyAttending && (
            <p className="text-sm text-amber-700">
              Select at least one person to include in this response.
            </p>
          )}
        </section>
      ) : (
        <p className="text-sm text-neutral-600">
          Sharing plans for <span className="font-medium text-neutral-900">{detail.members[0].guestName}</span>.
        </p>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Your response</h2>
        <ul className="space-y-2">
          {RSVP_STATUSES.map((status) => (
            <li key={status}>
              <label className="flex items-start gap-3 rounded-md border border-neutral-200 bg-white px-4 py-3">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={form.status === status}
                  onChange={() => setForm((f) => ({ ...f, status }))}
                  className="mt-1 h-4 w-4"
                  required
                />
                <span className="text-neutral-900">
                  {statusLabelFor(status, detail.members.length)}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          Mailing address {requiresAddress ? "" : "(optional)"}
        </h2>
        <p className="text-sm text-neutral-600">
          {requiresAddress
            ? "We'll use this to send you further wedding details."
            : "Feel free to skip if you'd rather not share right now."}
        </p>
        <div className="grid grid-cols-1 gap-3">
          <TextInput
            label="Address line 1"
            value={form.addressLine1}
            onChange={(v) => setForm((f) => ({ ...f, addressLine1: v }))}
            required={requiresAddress}
            name="address-line1"
            autoComplete="address-line1"
          />
          <TextInput
            label="Address line 2 (optional)"
            value={form.addressLine2}
            onChange={(v) => setForm((f) => ({ ...f, addressLine2: v }))}
            name="address-line2"
            autoComplete="address-line2"
          />
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="City"
              value={form.city}
              onChange={(v) => setForm((f) => ({ ...f, city: v }))}
              required={requiresAddress}
              name="address-level2"
              autoComplete="address-level2"
            />
            <TextInput
              label="State / Region"
              value={form.state}
              onChange={(v) => setForm((f) => ({ ...f, state: v }))}
              required={requiresAddress}
              name="address-level1"
              autoComplete="address-level1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Postal code"
              value={form.postalCode}
              onChange={(v) => setForm((f) => ({ ...f, postalCode: v }))}
              required={requiresAddress}
              name="postal-code"
              autoComplete="postal-code"
            />
            <TextInput
              label="Country"
              value={form.country}
              onChange={(v) => setForm((f) => ({ ...f, country: v }))}
              required={requiresAddress}
              name="country-name"
              autoComplete="country-name"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Anything else? (optional)</h2>
        <textarea
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          rows={3}
          placeholder="Song request, dietary note, well-wishes…"
          className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-base outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
        />
      </section>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting || !anyAttending || !form.status}
        className="w-full rounded-md bg-neutral-900 px-4 py-3 text-base font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
      >
        {submitting
          ? "Sending…"
          : detail.existingRsvp.submittedAt
            ? "Update tentative plans"
            : "Share tentative plans"}
      </button>
    </form>
  );
}

function TextInput({
  label,
  value,
  onChange,
  required,
  name,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  name?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-700">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        name={name}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-base outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
      />
    </label>
  );
}
