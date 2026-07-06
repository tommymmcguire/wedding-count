import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { PageBanner } from "@/components/site/PageBanner";
import { stay, wedding } from "@/lib/content";

export const metadata: Metadata = { title: "Stay · Jacquelyn & Tommy" };

const btn =
  "inline-block rounded-full border border-wedding-gold/60 px-6 py-2.5 font-serif text-lg text-wedding-gold transition-colors hover:bg-wedding-gold hover:text-wedding-ink";

export default function StayPage() {
  return (
    <SiteChrome>
      <div className="bg-wedding-hero">
        <PageBanner title={stay.title} />

        <div className="mx-auto max-w-3xl space-y-12 px-6 pb-24">
          {/* Host hotel */}
          <section className="rounded-lg border border-wedding-gold/20 bg-wedding-maroon/30 p-8 text-center">
            <p className="font-serif text-sm uppercase tracking-[0.3em] text-wedding-cream/60">
              {stay.hostHotel.label}
            </p>
            <h2 className="mt-1 font-script text-5xl text-wedding-gold sm:text-6xl">
              {stay.hostHotel.name}
            </h2>
            <p className="mt-2 font-serif text-lg text-wedding-cream/80">
              {stay.hostHotel.location}
            </p>
            <a href={wedding.links.hostHotel} target="_blank" rel="noopener noreferrer" className={`${btn} mt-6`}>
              Hotel Website
            </a>
          </section>

          {/* Other recommended hotels */}
          <section className="text-center">
            <h2 className="font-title text-4xl text-wedding-gold">
              {stay.otherHotels.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-serif text-lg leading-relaxed text-wedding-cream/85">
              {stay.otherHotels.body}
            </p>
            <a href={wedding.links.otherHotels} target="_blank" rel="noopener noreferrer" className={`${btn} mt-6`}>
              {stay.otherHotels.cta}
            </a>
          </section>

          {/* Rentals */}
          <section className="text-center">
            <h2 className="font-title text-4xl text-wedding-gold">{stay.rentals.heading}</h2>
            <p className="mx-auto mt-3 max-w-2xl font-serif text-lg leading-relaxed text-wedding-cream/85">
              {stay.rentals.body}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a href={wedding.links.airbnb} target="_blank" rel="noopener noreferrer" className={btn}>
                {stay.rentals.airbnbCta}
              </a>
              <a href={wedding.links.vrbo} target="_blank" rel="noopener noreferrer" className={btn}>
                {stay.rentals.vrboCta}
              </a>
            </div>
            <p className="mt-4 font-serif text-base italic text-wedding-cream/60">
              {stay.rentals.note}
            </p>
          </section>
        </div>
      </div>
    </SiteChrome>
  );
}
