"use client";

export function SubmittedCard() {
  return (
    <div className="space-y-7 rounded-lg border border-line bg-card px-8 py-12 text-center">
      <p className="text-[0.7rem] uppercase tracking-[0.35em] text-gold">
        Received with love
      </p>

      <h2 className="font-display text-4xl font-normal text-ink">Thank you</h2>

      <div className="mx-auto flex items-center justify-center gap-4 text-gold">
        <span className="h-px w-12 bg-line" />
        <span className="text-[0.6rem]">&#9670;</span>
        <span className="h-px w-12 bg-line" />
      </div>

      <p className="mx-auto max-w-sm text-base font-light leading-relaxed text-ink/65">
        Your tentative plans are in. You can update them any time by re-opening this page.
        Your formal RSVP will come later.
      </p>
    </div>
  );
}
