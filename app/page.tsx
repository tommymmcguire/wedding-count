"use client";

import { useState } from "react";
import { GuestSearch } from "@/components/GuestSearch";
import { RsvpForm } from "@/components/RsvpForm";
import { SaveTheDateIntro } from "@/components/SaveTheDateIntro";
import { SubmittedCard } from "@/components/SubmittedCard";
import type { GuestMatch } from "@/lib/guests";

const INTRO_SESSION_KEY = "std-intro-seen";

type View =
  | { kind: "invitation" }
  | { kind: "search" }
  | { kind: "form"; match: GuestMatch }
  | { kind: "submitted" };

export default function Page() {
  // A simple navigation stack — the last entry is the current page,
  // and the generic back button pops one page off.
  const [stack, setStack] = useState<View[]>([{ kind: "invitation" }]);
  const current = stack[stack.length - 1];

  const push = (view: View) => setStack((s) => [...s, view]);

  const back = () => {
    setStack((s) => {
      if (s.length <= 1) return s;
      const next = s.slice(0, -1);
      // Returning to the invitation replays the envelope animation, so
      // clear the "seen" flag that would otherwise auto-skip it.
      if (next[next.length - 1].kind === "invitation") {
        try {
          window.sessionStorage.removeItem(INTRO_SESSION_KEY);
        } catch {}
      }
      return next;
    });
  };

  const onInvitation = current.kind === "invitation";

  return (
    <>
      {onInvitation && (
        <SaveTheDateIntro onDone={() => push({ kind: "search" })} />
      )}

      {!onInvitation && (
        <button
          type="button"
          onClick={back}
          aria-label="Go back"
          className="absolute left-4 top-6 z-10 flex items-center gap-2 text-xs font-medium uppercase leading-none tracking-[0.2em] text-gold transition-colors hover:text-ink sm:left-6 sm:top-8"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
          <span className="leading-none">Back</span>
        </button>
      )}

      <main
        className={`flex flex-1 flex-col gap-10 transition-opacity duration-700 ${
          onInvitation ? "opacity-0" : "opacity-100"
        }`}
      >
        <header className="space-y-6 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gold">
            Sorrento, Italy · June 2027
          </p>
          <h1 className="font-display text-5xl font-normal tracking-tight text-ink sm:text-6xl">
            Tentative Plans
          </h1>
          <div className="mx-auto flex items-center justify-center gap-4 text-gold">
            <span className="h-px w-16 bg-line" />
            <span className="text-[0.6rem]">&#9670;</span>
            <span className="h-px w-16 bg-line" />
          </div>
          <p className="mx-auto max-w-md text-base font-light leading-relaxed text-ink/65">
            We are beginning to plan accommodations and guest logistics. If you could share
            your tentative plans by August 31, it would be enormously helpful.{" "}
            <span className="italic text-ink/50">This is not your formal RSVP.</span>
          </p>
        </header>

        {current.kind === "search" && (
          <GuestSearch onSelect={(match) => push({ kind: "form", match })} />
        )}

        {current.kind === "form" && (
          <RsvpForm
            householdId={current.match.householdId}
            onSubmitted={() => push({ kind: "submitted" })}
          />
        )}

        {current.kind === "submitted" && <SubmittedCard />}
      </main>
    </>
  );
}
