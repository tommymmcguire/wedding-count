import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { HeroBanner } from "@/components/site/HeroBanner";
import { stay, wedding } from "@/lib/content";

export const metadata: Metadata = { title: "Stay · Jacquelyn & Tommy" };

const btn =
  "inline-block rounded-full border border-wedding-gold/60 px-6 py-2.5 font-serif text-lg text-wedding-gold transition-colors hover:bg-wedding-gold hover:text-wedding-ink";

export default function StayPage() {
  return (
    <SiteChrome>
      <HeroBanner image={stay.heroImage} title={stay.title} subtitle="Where to lay your head" />

      <div className="bg-wedding-blue">
        <div className="mx-auto max-w-4xl space-y-16 px-6 py-20">
          {/* Host hotel */}
          <section className="overflow-hidden rounded-lg border border-wedding-gold/25 bg-black/15 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stay.hostHotel.photo}
              alt={stay.hostHotel.name}
              className="h-72 w-full object-cover sm:h-96"
            />
            <div className="p-8 text-center">
              <p className="font-serif text-sm uppercase tracking-[0.3em] text-wedding-cream/70">
                {stay.hostHotel.label}
              </p>
              <h2 className="mt-1 font-script text-5xl text-wedding-gold sm:text-6xl">
                {stay.hostHotel.name}
              </h2>
              <p className="mt-2 font-serif text-lg text-wedding-cream/85">
                {stay.hostHotel.location}
              </p>
              <a href={wedding.links.hostHotel} target="_blank" rel="noopener noreferrer" className={`${btn} mt-6`}>
                Hotel Website
              </a>
            </div>
          </section>

          {/* Other recommended hotels */}
          <section className="text-center">
            <h2 className="font-title text-4xl text-wedding-gold">
              {stay.otherHotels.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-serif text-lg leading-relaxed text-wedding-cream/90">
              {stay.otherHotels.body}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stay.otherHotels.photos.map((src) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="aspect-[3/2] w-full rounded-sm border-4 border-wedding-cream/90 object-cover shadow-xl"
                />
              ))}
            </div>
            <a href={wedding.links.otherHotels} target="_blank" rel="noopener noreferrer" className={`${btn} mt-8`}>
              {stay.otherHotels.cta}
            </a>
          </section>

          {/* Rentals — shown once the Airbnb/VRBO wishlist links are set */}
          {(wedding.links.airbnb || wedding.links.vrbo) && (
            <section className="text-center">
              <h2 className="font-title text-4xl text-wedding-gold">{stay.rentals.heading}</h2>
              <p className="mx-auto mt-3 max-w-2xl font-serif text-lg leading-relaxed text-wedding-cream/90">
                {stay.rentals.body}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                {wedding.links.airbnb && (
                  <a href={wedding.links.airbnb} target="_blank" rel="noopener noreferrer" className={btn}>
                    {stay.rentals.airbnbCta}
                  </a>
                )}
                {wedding.links.vrbo && (
                  <a href={wedding.links.vrbo} target="_blank" rel="noopener noreferrer" className={btn}>
                    {stay.rentals.vrboCta}
                  </a>
                )}
              </div>
              <p className="mt-4 font-serif text-base italic text-wedding-cream/70">
                {stay.rentals.note}
              </p>
            </section>
          )}
        </div>
      </div>
    </SiteChrome>
  );
}
