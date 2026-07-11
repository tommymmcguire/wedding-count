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

  if (loading)
    return (
      <p className="text-center text-sm font-light italic text-ink/50">
        Loading your household…
      </p>
    );
  if (loadError)
    return (
      <p className="text-center text-sm font-light text-terracotta">{loadError}</p>
    );
  if (!detail) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <button
        type="button"
        onClick={onBack}
        className="text-[0.7rem] uppercase tracking-[0.2em] text-ink/45 transition hover:text-ink"
      >
        ← Search for a different name
      </button>

      {detail.members.length > 1 ? (
        <section className="space-y-4">
          <SectionHeading>Who are these plans for?</SectionHeading>
          <p className="text-sm font-light text-ink/55">
            Uncheck anyone not included in this response.
          </p>
          <ul className="space-y-2.5">
            {detail.members.map((member) => (
              <li key={member.guestId}>
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-line bg-card px-4 py-3.5 transition has-[:checked]:border-ink/60 has-[:checked]:bg-ink/[0.03] hover:border-ink/30">
                  <input
                    type="checkbox"
                    checked={!!form.attending[member.guestId]}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        attending: { ...f.attending, [member.guestId]: e.target.checked },
                      }))
                    }
                    className="h-4 w-4 accent-ink"
                  />
                  <span className="text-ink">{member.guestName}</span>
                </label>
              </li>
            ))}
          </ul>
          {!anyAttending && (
            <p className="text-sm font-light text-terracotta">
              Select at least one person to include in this response.
            </p>
          )}
        </section>
      ) : (
        <p className="text-sm font-light text-ink/65">
          Sharing plans for <span className="font-normal text-ink">{detail.members[0].guestName}</span>.
        </p>
      )}

      <section className="space-y-4">
        <SectionHeading>Your response</SectionHeading>
        <ul className="space-y-2.5">
          {RSVP_STATUSES.map((status) => (
            <li key={status}>
              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-line bg-card px-4 py-3.5 transition has-[:checked]:border-ink/60 has-[:checked]:bg-ink/[0.03] hover:border-ink/30">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={form.status === status}
                  onChange={() => setForm((f) => ({ ...f, status }))}
                  className="mt-1 h-4 w-4 accent-ink"
                  required
                />
                <span className="text-ink">
                  {statusLabelFor(status, detail.members.length)}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <SectionHeading>
          Mailing address {requiresAddress ? "" : "(optional)"}
        </SectionHeading>
        <p className="text-sm font-light text-ink/55">
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

      <section className="space-y-4">
        <SectionHeading>Anything else? (optional)</SectionHeading>
        <textarea
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          rows={3}
          placeholder="Song request, dietary note, well-wishes…"
          className="w-full rounded-md border border-line bg-card px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/40"
        />
      </section>

      {submitError && (
        <p className="text-center text-sm font-light text-terracotta">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={submitting || !anyAttending || !form.status}
        className="w-full rounded-md bg-ink px-4 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-paper transition hover:bg-ink/85 disabled:cursor-not-allowed disabled:bg-ink/25"
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-normal text-ink">{children}</h2>
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
      <span className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.18em] text-ink/45">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        name={name}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-line bg-card px-4 py-2.5 text-base text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/40"
      />
    </label>
  );
}
