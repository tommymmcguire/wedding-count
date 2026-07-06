import type { Metadata } from "next";
import Image from "next/image";
import { SiteChrome } from "@/components/site/SiteChrome";
import { gallery } from "@/lib/content";

export const metadata: Metadata = { title: "Gallery · Jacquelyn & Tommy" };

export default function GalleryPage() {
  return (
    <SiteChrome>
      <div className="bg-wedding-coral pb-24">
        <div className="px-6 pb-8 pt-16 text-center sm:pt-20">
          <h1 className="font-title text-6xl leading-tight text-wedding-cream sm:text-7xl md:text-8xl">
            {gallery.title}
          </h1>
          <p className="mt-2 font-serif text-2xl tracking-[0.2em] text-wedding-cream/90">
            {gallery.subtitle}
          </p>
        </div>

        {/* Masonry grid */}
        <div className="mx-auto max-w-6xl gap-3 px-4 [column-fill:_balance] sm:columns-2 sm:gap-4 md:columns-3 lg:columns-4">
          {gallery.photos.map((src, i) => (
            <div key={src} className="mb-3 break-inside-avoid sm:mb-4">
              <Image
                src={src}
                alt={`Jacquelyn and Tommy memory ${i + 1}`}
                width={600}
                height={800}
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
