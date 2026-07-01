"use client";

type Props = {
  onEditAgain: () => void;
};

export function SubmittedCard({ onEditAgain }: Props) {
  return (
    <div className="space-y-6 rounded-md border border-neutral-200 bg-white p-8 text-center">
      <h2 className="text-2xl font-semibold text-neutral-900">Thank you!</h2>
      <p className="text-neutral-700">
        Your tentative plans are in. You can update them any time by re-opening this page.
        Your formal RSVP will come later.
      </p>
      <button
        type="button"
        onClick={onEditAgain}
        className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
      >
        Share plans for a different household
      </button>
    </div>
  );
}
