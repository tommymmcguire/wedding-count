"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/journey/site";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/** Countdown to the wedding — a row of boarding-gate style flip cells. */
export function Countdown({ className = "" }: { className?: string }) {
  const target = new Date(SITE.date.iso).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const t = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const cells: [string, number][] = parts
    ? [
        ["Days", parts.days],
        ["Hours", parts.hours],
        ["Minutes", parts.minutes],
        ["Seconds", parts.seconds],
      ]
    : [
        ["Days", 0],
        ["Hours", 0],
        ["Minutes", 0],
        ["Seconds", 0],
      ];

  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
      {cells.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="min-w-[3.75rem] rounded-xl border border-white/10 bg-journey-ink/70 px-3 py-3 text-center sm:min-w-[4.75rem]">
            <span
              className="font-serif text-3xl tabular-nums text-journey-ivory sm:text-4xl"
              suppressHydrationWarning
            >
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 font-body text-[0.58rem] uppercase tracking-[0.28em] text-journey-ivory/50">{label}</span>
        </div>
      ))}
    </div>
  );
}
