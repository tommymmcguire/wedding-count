import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { ScallopCard } from "@/components/site/ScallopCard";
import { Countdown } from "@/components/site/Countdown";
import { travel, wedding } from "@/lib/content";

export const metadata: Metadata = { title: "Travel · Jacquelyn & Tommy" };

// Palette sampled from the original Canva Travel page.
const C = {
  cream: "#ece0c2",
  coral: "#cd5a52",
  maroon: "#6e1a1f",
  gold: "#f2e08a",
  blue: "#274a8c",
  green: "#2f6d4f",
  darkGreen: "#20443a",
};

function Heading({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2 className="font-serif text-3xl sm:text-4xl" style={{ color }}>
      {children}
    </h2>
  );
}

function Sub({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h3 className="font-serif text-xl font-bold" style={{ color }}>
      {children}
    </h3>
  );
}

export default function TravelPage() {
  const [gettingAround, weather, accommodations, tips] = travel.tips;
  const [flying, suggested] = travel.sections;

  return (
    <SiteChrome>
      {/* Full-bleed Capri hero */}
      <section className="relative flex h-[88vh] min-h-[460px] items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={travel.heroImage}
          alt="Capri, Amalfi Coast"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-script text-8xl text-wedding-gold drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] sm:text-9xl">
            Travel
          </span>
          <span className="mt-6 animate-bounce text-4xl text-wedding-gold">▾</span>
        </div>
      </section>

      {/* Striped cabana section with scalloped cards */}
      <div
        className="px-4 py-16 sm:px-6 sm:py-24"
        style={{
          backgroundImage: `url(${travel.stripeBg})`,
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top center",
        }}
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-16">
          {/* Card 1 — cream / coral border */}
          <ScallopCard border={C.coral} fill={C.cream}>
            <div className="space-y-4" style={{ color: C.darkGreen }}>
              <Heading color={C.darkGreen}>Travel to Sorrento</Heading>
              <p className="font-serif text-lg leading-relaxed">
                We are so excited to celebrate with you in {wedding.city}, on {wedding.date.display}.
              </p>
              <p className="font-serif text-lg leading-relaxed">{travel.intro.body}</p>
              <div className="pt-4">
                <Heading color={C.darkGreen}>{gettingAround.heading}</Heading>
              </div>
              <p className="font-serif text-lg leading-relaxed">{gettingAround.body}</p>
            </div>
          </ScallopCard>

          {/* Card 2 — maroon / gold border */}
          <ScallopCard border={C.gold} fill={C.maroon}>
            <div className="space-y-4 text-wedding-cream">
              <Heading color={C.gold}>{suggested.heading}</Heading>
              <p className="font-serif text-lg leading-relaxed">{suggested.body}</p>
              <div className="pt-4">
                <Heading color={C.gold}>{flying.heading}</Heading>
              </div>
              <p className="font-serif text-lg leading-relaxed">{flying.body}</p>
            </div>
          </ScallopCard>

          {/* Card 3 — coral / blue border */}
          <ScallopCard border={C.blue} fill={C.coral}>
            <div className="space-y-5 text-wedding-cream">
              <Heading color="#ffffff">{travel.transfers.heading}</Heading>
              {travel.transfers.options.map((o) => (
                <div key={o.name} className="space-y-2">
                  <Sub color="#ffffff">{o.name}</Sub>
                  <p className="font-serif text-lg leading-relaxed">{o.body}</p>
                  <ul className="list-disc space-y-1 pl-6 font-serif text-lg">
                    {o.meta.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScallopCard>

          {/* Card 4 — pale yellow / maroon border */}
          <ScallopCard border={C.maroon} fill={C.gold}>
            <div className="space-y-4" style={{ color: "#4a1518" }}>
              <Heading color="#4a1518">{weather.heading}</Heading>
              <p className="font-serif text-lg leading-relaxed">{weather.body}</p>
              <div className="pt-4">
                <Heading color="#4a1518">{accommodations.heading}</Heading>
              </div>
              <p className="font-serif text-lg leading-relaxed">{accommodations.body}</p>
              <div className="pt-4">
                <Heading color="#4a1518">{tips.heading}</Heading>
              </div>
              <p className="font-serif text-lg leading-relaxed">{tips.body}</p>
            </div>
          </ScallopCard>
        </div>
      </div>

      <Countdown target={wedding.date.iso} />
    </SiteChrome>
  );
}
