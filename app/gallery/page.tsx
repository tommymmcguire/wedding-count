import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { HeroBanner } from "@/components/site/HeroBanner";
import { gallery } from "@/lib/content";

export const metadata: Metadata = { title: "Gallery · Jacquelyn & Tommy" };

export default function GalleryPage() {
  // The first photo doubles as the hero, so skip it in the grid below.
  const gridPhotos = gallery.photos.slice(1);
  return (
    <SiteChrome>
      <HeroBanner
        image={gallery.photos[0]}
        titleFontClass="font-script"
        objectPosition="50% 72%"
        title={
          <>
            Over{" "}
            <span className="mx-1 inline-block translate-y-[-0.12em] rounded-[50%] border border-wedding-gold/70 px-[0.45em] py-[0.02em] align-middle font-serif text-[0.4em] not-italic">
              the
            </span>
          </>
        }
        accent="years"
      />

      <div className="bg-wedding-coral pb-24">
        <div className="px-6 pb-8 pt-16 text-center sm:pt-20">
          <h1 className="font-serif text-6xl font-bold leading-tight text-wedding-cream sm:text-7xl">
            {gallery.title}
          </h1>
          <p className="mt-2 font-serif text-2xl tracking-wide text-wedding-cream/90">
            {gallery.subtitle}
          </p>
        </div>

        {/* Masonry grid */}
        <div className="mx-auto max-w-6xl gap-3 px-4 [column-fill:_balance] sm:columns-2 sm:gap-4 md:columns-3 lg:columns-4">
          {gridPhotos.map((src, i) => (
            <div key={src} className="mb-3 break-inside-avoid sm:mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Jacquelyn and Tommy memory ${i + 1}`}
                loading={i < 8 ? "eager" : "lazy"}
                className="w-full rounded-sm object-cover shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </SiteChrome>
  );
}
