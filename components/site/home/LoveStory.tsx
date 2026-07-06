import Image from "next/image";
import { home } from "@/lib/content";

const tilts = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6"];

export function LoveStory() {
  return (
    <section className="bg-wedding-olive px-6 py-20">
      {/* Japan polaroids */}
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 sm:gap-6">
        {home.lovePolaroids.map((src, i) => (
          <div
            key={src}
            className={`${tilts[i % tilts.length]} bg-wedding-cream p-2 shadow-2xl transition-transform hover:rotate-0`}
          >
            <Image
              src={src}
              alt="Jacquelyn and Tommy in Japan"
              width={220}
              height={280}
              className="h-40 w-32 object-cover sm:h-52 sm:w-40"
            />
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-center font-title text-6xl text-wedding-gold sm:text-7xl">
        Our Love Story
      </h2>

      <div className="mx-auto mt-10 max-w-2xl space-y-5 text-center font-serif text-lg leading-relaxed text-wedding-gold/95 sm:text-xl">
        {home.loveStory.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
