"use client";

import { useState } from "react";
import { GuestSearch } from "@/components/GuestSearch";
import { RsvpForm } from "@/components/RsvpForm";
import { SaveTheDateIntro } from "@/components/SaveTheDateIntro";
import { SubmittedCard } from "@/components/SubmittedCard";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { GuestMatch } from "@/lib/guests";

type View =
  | { kind: "search" }
  | { kind: "form"; match: GuestMatch }
  | { kind: "submitted" };

export default function RsvpPage() {
  const [view, setView] = useState<View>({ kind: "search" });
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <SiteHeader />
      {!introDone && <SaveTheDateIntro onDone={() => setIntroDone(true)} />}
      <div className="rsvp-surface min-h-screen pt-12">
        <div
          className={`mx-auto flex w-full max-w-xl flex-col gap-10 px-4 py-10 transition-opacity duration-700 sm:py-16 ${
            introDone ? "opacity-100" : "opacity-0"
          }`}
        >
          <header className="space-y-6 text-center">
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gold">
              Sorrento, Italy · June 2027
            </p>
            <h1 className="font-serif text-5xl font-normal tracking-tight text-ink sm:text-6xl">
              RSVP
            </h1>
            <div className="mx-auto flex items-center justify-center gap-4 text-gold">
              <span className="h-px w-16 bg-line" />
              <span className="text-[0.6rem]">&#9670;</span>
              <span className="h-px w-16 bg-line" />
            </div>
            <p className="mx-auto max-w-md text-base font-light leading-relaxed text-ink/65">
              Find your name below to let us know if you can join us in Sorrento. If
              your invitation includes additional guests, they&apos;ll appear once you
              select your name.
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
        </div>
      </div>
    </>
  );
}
