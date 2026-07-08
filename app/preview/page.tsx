import { SITE } from "@/lib/journey/site";
import Reveal from "@/components/journey-site/ui/Reveal";
import { Button } from "@/components/journey-site/ui/Button";
import { Card } from "@/components/journey-site/ui/Card";
import { Countdown } from "@/components/journey-site/ui/Countdown";
import { LuggageTag } from "@/components/journey-site/ui/LuggageTag";
import { BoardingPass } from "@/components/journey-site/ui/BoardingPass";
import { FlightPathDivider } from "@/components/journey-site/ui/FlightPathDivider";

export default function PreviewHome() {
  return (
    <main>
      {/* ————— Hero ————— */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* soft night-sky wash */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(130% 120% at 50% 20%, #0b1026 0%, #070a1c 70%)" }}
        />
        <div className="relative">
          <Reveal>
            <LuggageTag>{SITE.place}</LuggageTag>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-script leading-none text-journey-ivory" style={{ fontSize: "clamp(3.5rem, 13vw, 9rem)" }}>
              {SITE.names.one}
              <span className="mx-3 align-middle text-journey-goldWarm">&amp;</span>
              {SITE.names.two}
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 font-body text-sm uppercase tracking-[0.5em] text-journey-ivory/70 sm:text-base">
              {SITE.date.display}
            </p>
          </Reveal>
          <Reveal delay={380}>
            <p className="mt-3 font-serif text-xl italic text-journey-goldWarm/90">Our journey around the globe</p>
          </Reveal>
          <Reveal delay={520}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/journey-demo" size="lg">Begin our journey</Button>
              <Button href="/preview/rsvp" variant="outline" size="lg">RSVP</Button>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-10 animate-bounce font-body text-xs uppercase tracking-[0.3em] text-journey-ivory/40">
          Scroll ↓
        </div>
      </section>

      {/* ————— Countdown ————— */}
      <section className="relative px-6 py-24 text-center">
        <Reveal>
          <p className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-journey-goldWarm/80">Now boarding in</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8">
            <Countdown />
          </div>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-8 font-serif text-lg text-journey-ivory/70">
            until we say <span className="italic text-journey-ivory">“I do”</span> on the Amalfi Coast.
          </p>
        </Reveal>
      </section>

      <FlightPathDivider />

      {/* ————— Design-system showcase (the travel motif) ————— */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <div className="text-center">
            <LuggageTag>The details</LuggageTag>
            <h2 className="mt-6 font-title text-5xl text-journey-ivory">A weekend in Sorrento</h2>
            <p className="mx-auto mt-4 max-w-xl font-serif text-lg text-journey-ivory/70">
              Everything you&apos;ll need, styled like pages from a travel journal — boarding passes, luggage tags, and
              dotted flight paths carried across every page.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12">
            <BoardingPass
              from="Home"
              to="SRN"
              fields={[
                { label: "Date", value: "Jun 4, 2027" },
                { label: "Venue", value: SITE.venue },
                { label: "Gate", value: "Cliffside Pier" },
                { label: "Dress", value: "Formal" },
                { label: "Boarding", value: "4:00 PM" },
                { label: "Seat", value: "By your name" },
              ]}
              stub={{ label: "Flight", value: "J&T 27" }}
            />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { tag: "Chapter I", title: "Welcome Dinner", body: "June 3rd — an evening to arrive, embrace, and toast the days ahead." },
            { tag: "Chapter II", title: "The Ceremony", body: "June 4th — “I do” on the famous pier overlooking the Amalfi Coast." },
            { tag: "Chapter III", title: "Farewell Brunch", body: "June 5th — one last Mediterranean morning together before we part." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <Card className="h-full">
                <LuggageTag>{c.tag}</LuggageTag>
                <h3 className="mt-4 font-title text-3xl text-journey-ivory">{c.title}</h3>
                <p className="mt-3 font-serif text-journey-ivory/70">{c.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <FlightPathDivider />

      {/* ————— Closing invitation ————— */}
      <section className="relative px-6 py-28 text-center">
        <Reveal>
          <h2 className="font-title text-journey-ivory" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            Come find us in Sorrento
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg text-journey-ivory/75">
            The next chapter is ours to write together — and it wouldn&apos;t be complete without you. Let us know you&apos;re coming.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <div className="mt-10">
            <Button href="/preview/rsvp" size="lg">Reserve your seat</Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
