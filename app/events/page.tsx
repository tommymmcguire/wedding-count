import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { HeroBanner } from "@/components/site/HeroBanner";
import { events } from "@/lib/content";

export const metadata: Metadata = { title: "Events · Jacquelyn & Tommy" };

// Alternating section palettes, echoing the Canva original (blue → coral → olive).
const dayThemes = [
  { bg: "bg-wedding-blue", accent: "text-wedding-gold", oval: "border-wedding-gold/70", body: "text-wedding-cream/90" },
  { bg: "bg-wedding-coral", accent: "text-wedding-gold", oval: "border-wedding-gold/80", body: "text-wedding-cream" },
  { bg: "bg-wedding-olive", accent: "text-wedding-gold", oval: "border-wedding-gold/60", body: "text-wedding-cream/90" },
];

function PhotoRow({ photos }: { photos?: readonly string[] }) {
  if (!photos || photos.length === 0) return null;
  return (
    <div className={`mx-auto mt-6 grid max-w-2xl gap-3 sm:gap-4 ${photos.length > 1 ? "grid-cols-2" : "max-w-xs grid-cols-1"}`}>
      {photos.map((src) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={src}
          src={src}
          alt=""
          className="aspect-[4/3] w-full rounded-sm border-4 border-wedding-cream/90 object-cover shadow-xl"
        />
      ))}
    </div>
  );
}

export default function EventsPage() {
  return (
    <SiteChrome>
      <HeroBanner
        image={events.heroImage}
        kicker={events.intro.kicker}
        title={events.intro.title}
        subtitle={events.intro.subtitle}
      />

      {events.days.map((day, i) => {
        const theme = dayThemes[i % dayThemes.length];
        return (
          <section key={day.date} className={`${theme.bg} px-6 py-16 sm:py-20`}>
            <div className="mx-auto max-w-3xl text-center">
              {/* Gold oval date badge */}
              <span
                className={`inline-block rounded-[50%] border-2 ${theme.oval} px-8 py-3 font-serif text-lg tracking-wide ${theme.accent}`}
              >
                <strong className="font-bold">{day.day}</strong>{" "}
                <span className="font-normal">{day.date}</span>
              </span>

              <h2 className={`mt-6 font-script text-6xl ${theme.accent} sm:text-7xl`}>
                {day.title}
              </h2>
              {day.note && (
                <p className={`mt-3 font-serif text-2xl italic ${theme.body}`}>{day.note}</p>
              )}

              {day.items.length > 0 && (
                <div className="mt-12 space-y-14">
                  {day.items.map((item) => (
                    <div key={item.time}>
                      <h3 className={`font-serif text-2xl font-semibold uppercase tracking-wide ${theme.accent} sm:text-3xl`}>
                        {item.time} <span className="text-wedding-cream/70">·</span> {item.name}
                      </h3>
                      <p className={`mx-auto mt-3 max-w-2xl font-serif text-lg leading-relaxed ${theme.body}`}>
                        {item.desc}
                      </p>
                      <PhotoRow photos={item.photos} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </SiteChrome>
  );
}
