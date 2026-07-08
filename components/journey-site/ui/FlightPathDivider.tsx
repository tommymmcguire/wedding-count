/** A dotted flight-path section divider with a small plane in flight. */
export function FlightPathDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-10 ${className}`} aria-hidden>
      <svg viewBox="0 0 400 40" className="h-8 w-full max-w-xl" fill="none">
        <path
          d="M8 32 Q 200 -6 392 32"
          stroke="#f6c56b"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
        <circle cx="8" cy="32" r="3" fill="#e7a6a0" />
        <circle cx="392" cy="32" r="3" fill="#f6c56b" />
        {/* plane at the apex */}
        <g transform="translate(196 8) rotate(12)">
          <path d="M0 -5 L10 0 L0 5 L2 0 Z" fill="#f7efe2" />
        </g>
      </svg>
    </div>
  );
}
