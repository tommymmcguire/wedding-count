import type { ReactNode } from "react";

type Field = { label: string; value: ReactNode };

/**
 * Boarding-pass styled card. A main panel plus a perforated tear-off stub —
 * used for hotel blocks, event details, and the RSVP flow.
 */
export function BoardingPass({
  airlineTag = "Jacquelyn ✈ Tommy",
  from,
  to,
  fields,
  stub,
  children,
  className = "",
}: {
  airlineTag?: string;
  from?: string;
  to?: string;
  fields?: Field[];
  stub?: { label: string; value: ReactNode };
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md ${className}`} style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
      {/* main panel */}
      <div className="flex-1 p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-4">
          <span className="font-title text-xl text-journey-goldWarm">{airlineTag}</span>
          <span className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-journey-ivory/50">Boarding Pass</span>
        </div>

        {(from || to) && (
          <div className="mt-5 flex items-center gap-4">
            <div>
              <p className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-journey-ivory/50">From</p>
              <p className="font-serif text-2xl text-journey-ivory">{from}</p>
            </div>
            <svg viewBox="0 0 60 12" className="h-3 flex-1" fill="none" aria-hidden>
              <path d="M2 6 H52" stroke="#f6c56b" strokeOpacity="0.5" strokeDasharray="1 5" strokeLinecap="round" />
              <path d="M50 1 L58 6 L50 11 L52 6 Z" fill="#f6c56b" />
            </svg>
            <div className="text-right">
              <p className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-journey-ivory/50">To</p>
              <p className="font-serif text-2xl text-journey-ivory">{to}</p>
            </div>
          </div>
        )}

        {fields && (
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {fields.map((f, i) => (
              <div key={i}>
                <dt className="font-body text-[0.58rem] uppercase tracking-[0.25em] text-journey-ivory/50">{f.label}</dt>
                <dd className="mt-1 font-serif text-lg text-journey-ivory">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {children}
      </div>

      {/* perforated stub */}
      {stub && (
        <div className="relative flex w-28 flex-col items-center justify-center gap-2 border-l border-dashed border-white/20 bg-journey-goldWarm/[0.06] p-4 text-center sm:w-36">
          <span aria-hidden className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-journey-navyDeep" />
          <p className="font-body text-[0.55rem] uppercase tracking-[0.25em] text-journey-ivory/50">{stub.label}</p>
          <p className="font-serif text-lg text-journey-goldWarm">{stub.value}</p>
        </div>
      )}
    </div>
  );
}
