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
      <HeroBanner
        image={stay.heroImage}
        titleFontClass="font-title"
        title={
          <>
            Hotels{" "}
            <span className="mx-1 inline-block translate-y-[-0.15em] rounded-[50%] border border-wedding-gold/70 px-[0.5em] py-[0.1em] align-middle font-serif text-[0.32em] not-italic">
              and
            </span>{" "}
            Rentals
          </>
        }
      />

      <div className="bg-wedding-blue">
        <div className="mx-auto max-w-4xl space-y-16 px-6 py-20">
          {/* Host hotel */}
          <section className="text-center">
            <h2 className="font-title text-5xl text-wedding-gold sm:text-6xl">
              {stay.hostHotel.name}
            </h2>
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="text-xl tracking-[0.15em] text-wedding-gold" aria-label="Five stars">
                ★★★★★
              </span>
              <span className="h-px w-6 bg-wedding-cream/40" />
              <span className="text-left font-serif text-sm leading-tight text-wedding-cream/85">
                {stay.hostHotel.location.split(" · ").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </div>

            {/* Framed photo with a Host Hotel seal */}
            <div className="relative mx-auto mt-8 max-w-3xl rounded-sm bg-wedding-cream/90 p-3 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stay.hostHotel.photo}
                alt={stay.hostHotel.name}
                className="aspect-[16/10] w-full object-cover"
              />
              <span className="absolute right-5 top-5 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-wedding-gold text-center font-serif text-sm font-bold leading-tight text-wedding-blue shadow-lg ring-2 ring-wedding-blue/25 ring-offset-2 ring-offset-wedding-gold">
                <span>Host</span>
                <span>Hotel</span>
              </span>
            </div>

            <a href={wedding.links.hostHotel} target="_blank" rel="noopener noreferrer" className={`${btn} mt-8`}>
              Hotel Website
            </a>
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
