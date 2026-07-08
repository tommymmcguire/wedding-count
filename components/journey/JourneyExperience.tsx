"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { CHAPTERS, PALETTE } from "@/lib/journey/chapters";
import StaticJourneyMap from "./StaticJourneyMap";

// Globe canvas is browser-only (WebGPU/WebGL) — never server-render it.
const JourneyCanvas = dynamic(() => import("./JourneyCanvas"), { ssr: false });

export default function JourneyExperience() {
  const progress = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll (Lenis) wired into GSAP's ticker + ScrollTrigger.
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // One trigger spans the whole journey and feeds normalized progress (0..1)
    // to the globe scene each frame.
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    // Elegant staggered reveal for each story card.
    const cards = gsap.utils.toArray<HTMLElement>(".story-card");
    const tweens = cards.map((card) =>
      gsap.fromTo(
        card.querySelectorAll(".reveal"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: card, start: "top 72%", end: "top 40%", toggleActions: "play none none reverse" },
        },
      ),
    );

    return () => {
      st.kill();
      tweens.forEach((t) => t.scrollTrigger?.kill());
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [mounted, reducedMotion]);

  if (mounted && reducedMotion) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Header />
        <div className="mt-10">
          <StaticJourneyMap />
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ background: PALETTE.navyDeep }}>
      {/* Fixed globe behind the scrolling story. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {mounted && <JourneyCanvas progress={progress} />}
      </div>

      {/* Intro hero. */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="reveal-static font-serif text-sm uppercase tracking-[0.4em] text-white/60">Jacquelyn &amp; Tommy</p>
        <h1 className="mt-4 text-white" style={{ fontFamily: "var(--font-script), cursive", fontSize: "clamp(3rem, 12vw, 8rem)", color: PALETTE.ivory }}>
          Our Journey
        </h1>
        <p className="mt-2 font-serif text-lg tracking-[0.3em] text-white/70">AROUND THE GLOBE</p>
        <p className="mt-8 max-w-md font-serif text-white/70">
          Two people whose paths converge into one — told across the places that made us. Scroll to begin the flight.
        </p>
        <div className="mt-16 animate-bounce text-white/50" aria-hidden>↓</div>
      </section>

      {/* Story chapters — scroll length per chapter is tuned by its weight. */}
      <div ref={wrapRef} className="relative z-10">
        {CHAPTERS.map((c, i) => (
          <section
            key={c.id}
            className="story-card relative flex items-center px-6"
            style={{
              minHeight: `${c.weight * 90}vh`,
              justifyContent: c.beat === "apart" ? "center" : i % 2 === 0 ? "flex-start" : "flex-end",
            }}
          >
            <article
              className="max-w-md rounded-2xl border border-white/15 p-8"
              style={{
                background: "linear-gradient(180deg, rgba(6,9,24,0.94) 0%, rgba(6,9,24,0.86) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 28px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <p className="reveal text-xs uppercase tracking-[0.35em]" style={{ color: PALETTE.goldWarm }}>{c.kicker}</p>
              <h2 className="reveal mt-3 text-4xl" style={{ fontFamily: "var(--font-title), cursive", color: PALETTE.ivory }}>{c.title}</h2>
              <p className="reveal mt-1 font-serif text-sm italic text-white/70">{c.date}</p>
              <p className="reveal mt-4 font-serif text-lg leading-relaxed text-white/95">{c.body}</p>
            </article>
          </section>
        ))}
      </div>

      {/* Closing invitation / RSVP cue (demo placeholder). */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="rounded-[2rem] px-10 py-12" style={{ background: "radial-gradient(closest-side, rgba(7,10,28,0.72), rgba(7,10,28,0))" }}>
          <h2 className="text-white" style={{ fontFamily: "var(--font-title), cursive", fontSize: "clamp(2.5rem, 8vw, 5rem)", color: PALETTE.ivory }}>
            Join us in Sorrento
          </h2>
          <p className="mt-4 max-w-md font-serif text-white/80">The next chapter is ours to write together. We would be honored to have you there.</p>
          <span className="mt-8 inline-block rounded-full border px-8 py-3 font-serif uppercase tracking-[0.25em]" style={{ borderColor: PALETTE.goldWarm, color: PALETTE.goldWarm }}>
            RSVP
          </span>
        </div>
        <p className="mt-16 text-xs uppercase tracking-[0.3em] text-white/30">Phase 0 · isolated globe demo</p>
      </section>
    </div>
  );
}

function Header() {
  return (
    <header className="text-center">
      <p className="font-serif text-sm uppercase tracking-[0.4em] text-white/60">Jacquelyn &amp; Tommy</p>
      <h1 className="mt-3 text-5xl text-white" style={{ fontFamily: "var(--font-script), cursive" }}>Our Journey</h1>
      <p className="mt-2 font-serif text-white/70">A calmer, motion-free view of our route around the globe.</p>
    </header>
  );
}
