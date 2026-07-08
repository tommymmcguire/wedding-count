import { CHAPTERS, CITIES, PALETTE, type City } from "@/lib/journey/chapters";

const W = 1000;
const H = 480;

function project(city: City) {
  return {
    x: ((city.lng + 180) / 360) * W,
    y: ((90 - city.lat) / 180) * H,
  };
}

/** A gentle arc path between two projected points. */
function arc(a: City, b: City, lift = 60) {
  const p = project(a);
  const q = project(b);
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2 - lift;
  return `M ${p.x} ${p.y} Q ${mx} ${my} ${q.x} ${q.y}`;
}

/**
 * Static, accessible fallback shown when the guest prefers reduced motion.
 * A flat illustrated map: the two pre-Houston paths merging, then the full
 * route on to Sorrento.
 */
export default function StaticJourneyMap() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10" style={{ background: `radial-gradient(120% 120% at 50% 20%, ${PALETTE.navy}, ${PALETTE.navyDeep})` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Our journey: Austin to Durham and back together in Houston, then Kyoto, home to Austin, and finally Sorrento, Italy.">
        {/* faint graticule */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={(i / 8) * W} y1={0} x2={(i / 8) * W} y2={H} stroke={PALETTE.gold} strokeOpacity={0.06} />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={(i / 4) * H} x2={W} y2={(i / 4) * H} stroke={PALETTE.gold} strokeOpacity={0.06} />
        ))}

        {/* two paths converging on Houston */}
        <path d={arc(CITIES.austin, CITIES.houston, 30)} fill="none" stroke={PALETTE.gold} strokeWidth={2} strokeDasharray="2 6" strokeLinecap="round" opacity={0.9} />
        <path d={arc(CITIES.durham, CITIES.houston, 55)} fill="none" stroke={PALETTE.blush} strokeWidth={2} strokeDasharray="2 6" strokeLinecap="round" opacity={0.9} />

        {/* the single blended trail onward */}
        <path d={arc(CITIES.houston, CITIES.kyoto, 120)} fill="none" stroke={PALETTE.goldWarm} strokeWidth={2.5} strokeLinecap="round" opacity={0.95} />
        <path d={arc(CITIES.kyoto, CITIES.houston, 150)} fill="none" stroke={PALETTE.goldWarm} strokeWidth={1.5} strokeDasharray="1 7" strokeLinecap="round" opacity={0.6} />
        <path d={arc(CITIES.houston, CITIES.austin, 20)} fill="none" stroke={PALETTE.goldWarm} strokeWidth={1.5} strokeDasharray="1 7" strokeLinecap="round" opacity={0.6} />
        <path d={arc(CITIES.austin, CITIES.sorrento, 130)} fill="none" stroke={PALETTE.goldWarm} strokeWidth={2.5} strokeLinecap="round" opacity={0.95} />

        {/* city markers + labels */}
        {[CITIES.austin, CITIES.durham, CITIES.houston, CITIES.kyoto, CITIES.sorrento].map((c) => {
          const p = project(c);
          const isFinale = c.name === CITIES.sorrento.name;
          return (
            <g key={c.name}>
              <circle cx={p.x} cy={p.y} r={isFinale ? 7 : 4} fill={isFinale ? PALETTE.goldWarm : PALETTE.ivory} />
              <circle cx={p.x} cy={p.y} r={isFinale ? 14 : 9} fill="none" stroke={isFinale ? PALETTE.goldWarm : PALETTE.ivory} strokeOpacity={0.4} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize={16} fill={PALETTE.ivory} fillOpacity={0.85} style={{ fontFamily: "var(--font-serif), serif" }}>
                {c.name.split(",")[0]}
              </text>
            </g>
          );
        })}
      </svg>

      <ol className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {CHAPTERS.map((c) => (
          <li key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: PALETTE.gold }}>{c.kicker}</p>
            <p className="mt-1 font-serif text-lg text-white">{c.title}</p>
            <p className="text-sm text-white/60">{c.date}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
