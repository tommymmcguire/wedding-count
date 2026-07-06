import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { PageBanner } from "@/components/site/PageBanner";
import { dressCode } from "@/lib/content";

export const metadata: Metadata = { title: "Dress Code · Jacquelyn & Tommy" };

export default function DressCodePage() {
  return (
    <SiteChrome>
      <div className="bg-wedding-olive">
        <PageBanner title={dressCode.title} />

        <div className="mx-auto max-w-3xl space-y-14 px-6 pb-24">
          <p className="mx-auto max-w-2xl text-center font-serif text-xl leading-relaxed text-wedding-cream/90">
            {dressCode.intro}
          </p>

          {dressCode.events.map((e) => (
            <section
              key={e.event}
              className="rounded-lg border border-wedding-gold/15 bg-black/15 p-8 text-center"
            >
              <p className="font-serif text-sm uppercase tracking-[0.3em] text-wedding-cream/60">
                {e.event}
              </p>
              <h2 className="mt-1 font-script text-5xl text-wedding-gold sm:text-6xl">
                {e.code}
              </h2>
              <div className="mt-6 grid gap-6 text-left sm:grid-cols-2">
                <div>
                  <h3 className="font-serif text-xl text-wedding-gold/90">Her</h3>
                  <p className="mt-2 font-serif text-lg leading-relaxed text-wedding-cream/85">
                    {e.girls}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-wedding-gold/90">Him</h3>
                  <p className="mt-2 font-serif text-lg leading-relaxed text-wedding-cream/85">
                    {e.boys}
                  </p>
                </div>
              </div>
            </section>
          ))}

          <p className="mx-auto max-w-2xl text-center font-serif text-lg italic leading-relaxed text-wedding-cream/75">
            {dressCode.note}
          </p>
        </div>
      </div>
    </SiteChrome>
  );
}
