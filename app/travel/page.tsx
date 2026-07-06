import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { PageBanner } from "@/components/site/PageBanner";
import { travel } from "@/lib/content";

export const metadata: Metadata = { title: "Travel · Jacquelyn & Tommy" };

function Card({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-wedding-gold/15 bg-black/15 p-6">
      <h3 className="font-serif text-2xl text-wedding-gold">{heading}</h3>
      <div className="mt-3 font-serif text-lg leading-relaxed text-wedding-cream/85">
        {children}
      </div>
    </div>
  );
}

export default function TravelPage() {
  return (
    <SiteChrome>
      <div className="bg-wedding-hero">
        <PageBanner title={travel.title} />

        <div className="mx-auto max-w-4xl space-y-10 px-6 pb-24">
          <p className="mx-auto max-w-2xl text-center font-serif text-xl leading-relaxed text-wedding-cream/90">
            <span className="mb-2 block font-title text-3xl text-wedding-gold">
              {travel.intro.heading}
            </span>
            {travel.intro.body}
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {travel.sections.map((s) => (
              <Card key={s.heading} heading={s.heading}>
                {s.body}
              </Card>
            ))}
          </div>

          <div>
            <h2 className="mb-5 text-center font-title text-4xl text-wedding-gold">
              {travel.transfers.heading}
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {travel.transfers.options.map((o) => (
                <Card key={o.name} heading={o.name}>
                  <p>{o.body}</p>
                  <ul className="mt-3 space-y-1 text-base text-wedding-gold/80">
                    {o.meta.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {travel.tips.map((t) => (
              <Card key={t.heading} heading={t.heading}>
                {t.body}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}
