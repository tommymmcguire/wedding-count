"use client";

import { useState } from "react";
import { GuestSearch } from "@/components/GuestSearch";
import { RsvpForm } from "@/components/RsvpForm";
import { SaveTheDateIntro } from "@/components/SaveTheDateIntro";
import { SubmittedCard } from "@/components/SubmittedCard";
import type { GuestMatch } from "@/lib/guests";

type View =
  | { kind: "search" }
  | { kind: "form"; match: GuestMatch }
  | { kind: "submitted" };

export default function Page() {
  const [view, setView] = useState<View>({ kind: "search" });
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <SaveTheDateIntro onDone={() => setIntroDone(true)} />}
      <main
        className={`flex flex-1 flex-col gap-10 transition-opacity duration-700 ${
          introDone ? "opacity-100" : "opacity-0"
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

      {view.kind === "search" && (
        <GuestSearch onSelect={(match) => setView({ kind: "form", match })} />
      )}

      {view.kind === "form" && (
        <RsvpForm
          householdId={view.match.householdId}
          onSubmitted={() => setView({ kind: "submitted" })}
          onBack={() => setView({ kind: "search" })}
        />
      )}

      {view.kind === "submitted" && (
        <SubmittedCard onEditAgain={() => setView({ kind: "search" })} />
      )}
      </main>
    </>
  );
}
