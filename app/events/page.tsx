import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { PageBanner } from "@/components/site/PageBanner";
import { events } from "@/lib/content";

export const metadata: Metadata = { title: "Events · Jacquelyn & Tommy" };

export default function EventsPage() {
  return (
    <SiteChrome>
      <div className="bg-wedding-olive">
        <PageBanner
          kicker={events.intro.kicker}
          title={events.intro.title}
          subtitle={events.intro.subtitle}
        />

        <div className="mx-auto max-w-3xl space-y-16 px-6 pb-24">
          {events.days.map((day) => (
            <section key={day.date}>
              <div className="mb-6 text-center">
                <p className="font-serif text-sm uppercase tracking-[0.3em] text-wedding-cream/60">
                  {day.day} · {day.date}
                </p>
                <h2 className="mt-1 font-script text-5xl text-wedding-gold sm:text-6xl">
                  {day.title}
                </h2>
                {day.note && (
                  <p className="mt-2 font-serif text-lg italic text-wedding-cream/75">
                    {day.note}
                  </p>
                )}
              </div>

              {day.items.length > 0 && (
                <ol className="relative space-y-8 border-l border-wedding-gold/25 pl-6">
                  {day.items.map((item) => (
                    <li key={item.time} className="relative">
                      <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full bg-wedding-gold" />
                      <p className="font-serif text-xl font-semibold text-wedding-gold">
                        {item.time} — {item.name}
                      </p>
                      <p className="mt-1 font-serif text-lg leading-relaxed text-wedding-cream/85">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
      </div>
    </SiteChrome>
  );
}
