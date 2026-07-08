import type { ReactNode } from "react";

/** Soft glass panel — the base surface, matched to the globe story cards. */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md ${className}`}
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}
    >
      {children}
    </div>
  );
}
