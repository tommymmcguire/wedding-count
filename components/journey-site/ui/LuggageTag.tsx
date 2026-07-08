import type { ReactNode } from "react";

/** A little luggage-tag label — used for section eyebrows / metadata. */
export function LuggageTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center gap-2 rounded-md border border-journey-goldWarm/40 bg-journey-goldWarm/10 px-3 py-1 font-body text-[0.62rem] uppercase tracking-[0.3em] text-journey-goldWarm ${className}`}
    >
      {/* punch-hole */}
      <span className="h-1.5 w-1.5 rounded-full border border-journey-goldWarm/60" aria-hidden />
      {children}
    </span>
  );
}
