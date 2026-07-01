"use client";

import { useState } from "react";
import { GuestSearch } from "@/components/GuestSearch";
import { RsvpForm } from "@/components/RsvpForm";
import { SubmittedCard } from "@/components/SubmittedCard";
import type { GuestMatch } from "@/lib/guests";

type View =
  | { kind: "search" }
  | { kind: "form"; match: GuestMatch }
  | { kind: "submitted" };

export default function Page() {
  const [view, setView] = useState<View>({ kind: "search" });

  return (
    <main className="flex flex-1 flex-col gap-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Tentative Plans
        </h1>
        <p className="text-neutral-600">
          We are beginning to plan accommodations and guest logistics. If you could share
          your tentative plans by August 31, it would be enormously helpful.{" "}
          <span className="italic">This is not your formal RSVP.</span>
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
  );
}
