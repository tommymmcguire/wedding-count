"use client";

import { useEffect, useState } from "react";

const UNITS = [
  { label: "Days", ms: 1000 * 60 * 60 * 24 },
  { label: "Hours", ms: 1000 * 60 * 60 },
  { label: "Minutes", ms: 1000 * 60 },
  { label: "Seconds", ms: 1000 },
];

export function Countdown({ target, title = "My countdown" }: { target: string; title?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const targetMs = new Date(target).getTime();
  let remaining = now === null ? 0 : Math.max(0, targetMs - now);
  const parts = UNITS.map((u) => {
    const v = Math.floor(remaining / u.ms);
    remaining -= v * u.ms;
    return { label: u.label, value: v };
  });

  return (
    <section className="bg-[#84a9b3] px-6 py-20 text-center text-wedding-cream">
      <h2 className="font-title text-5xl sm:text-6xl">{title}</h2>
      <div className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-3 sm:gap-6">
        {parts.map((p, i) => (
          <div key={p.label} className="flex items-start">
            <div className="min-w-[3.5rem] sm:min-w-[6rem]">
              <div className="font-serif text-5xl leading-none sm:text-8xl" suppressHydrationWarning>
                {now === null ? "—" : String(p.value).padStart(2, "0")}
              </div>
              <div className="mt-2 font-serif text-sm uppercase tracking-widest sm:text-xl">
                {p.label}
              </div>
            </div>
            {i < parts.length - 1 && (
              <span className="px-1 font-serif text-5xl leading-none text-wedding-cream/70 sm:text-8xl sm:px-2">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
