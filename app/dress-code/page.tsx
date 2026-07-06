import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { HeroBanner } from "@/components/site/HeroBanner";
import { dressCode } from "@/lib/content";

export const metadata: Metadata = { title: "Dress Code · Jacquelyn & Tommy" };

export default function DressCodePage() {
  return (
    <SiteChrome>
      <HeroBanner image={dressCode.heroImage} title={dressCode.title} subtitle="Amalfi glamour" />

      <div className="bg-wedding-blue">
        <div className="mx-auto max-w-4xl space-y-16 px-6 py-20">
          <p className="mx-auto max-w-2xl text-center font-serif text-xl leading-relaxed text-wedding-cream/90">
            {dressCode.intro}
          </p>

          {dressCode.events.map((e) => (
            <section key={e.event} className="text-center">
              <p className="font-serif text-sm uppercase tracking-[0.3em] text-wedding-cream/70">
                {e.event}
              </p>
              <h2 className="mt-1 font-script text-5xl text-wedding-gold sm:text-6xl">
                {e.code}
              </h2>

              {/* Moodboards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {e.moodboards.map((src) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={src}
                    src={src}
                    alt={`${e.code} moodboard`}
                    className="w-full rounded-sm border-4 border-wedding-cream/90 object-cover shadow-xl"
                  />
                ))}
              </div>

              <div className="mt-8 grid gap-6 text-left sm:grid-cols-2">
                <div className="rounded-lg bg-black/15 p-6">
                  <h3 className="font-serif text-xl text-wedding-gold/90">Her</h3>
                  <p className="mt-2 font-serif text-lg leading-relaxed text-wedding-cream/85">
                    {e.girls}
                  </p>
                </div>
                <div className="rounded-lg bg-black/15 p-6">
                  <h3 className="font-serif text-xl text-wedding-gold/90">Him</h3>
                  <p className="mt-2 font-serif text-lg leading-relaxed text-wedding-cream/85">
                    {e.boys}
                  </p>
                </div>
              </div>
            </section>
          ))}

          <p className="mx-auto max-w-2xl text-center font-serif text-lg italic leading-relaxed text-wedding-cream/80">
            {dressCode.note}
          </p>
        </div>
      </div>
    </SiteChrome>
  );
}
