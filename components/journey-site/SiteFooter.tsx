import Link from "next/link";
import { NAV, SITE } from "@/lib/journey/site";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-journey-navyDeep px-6 py-16 text-center">
      {/* tiny flight-path flourish */}
      <svg viewBox="0 0 240 30" className="mx-auto mb-8 h-6 w-56" fill="none" aria-hidden>
        <path d="M6 22 Q 120 -8 234 22" stroke="#f6c56b" strokeOpacity="0.45" strokeDasharray="1 6" strokeLinecap="round" />
        <circle cx="6" cy="22" r="2.5" fill="#e7a6a0" />
        <circle cx="234" cy="22" r="2.5" fill="#f6c56b" />
        <g transform="translate(116 5) rotate(14)">
          <path d="M0 -4 L8 0 L0 4 L1.6 0 Z" fill="#f7efe2" />
        </g>
      </svg>

      <p className="font-script text-4xl text-journey-ivory">
        {SITE.names.one} <span className="text-journey-goldWarm">&amp;</span> {SITE.names.two}
      </p>
      <p className="mt-3 font-body text-xs uppercase tracking-[0.35em] text-journey-ivory/60">
        {SITE.date.display} · {SITE.place}
      </p>

      <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-body text-[0.62rem] uppercase tracking-[0.24em] text-journey-ivory/55 transition-colors hover:text-journey-ivory"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <p className="mt-10 font-serif text-2xl italic text-journey-goldWarm/80">{SITE.monogram}</p>
    </footer>
  );
}
