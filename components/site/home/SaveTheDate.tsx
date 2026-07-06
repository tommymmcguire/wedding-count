import { home, wedding } from "@/lib/content";

/**
 * NOTE: interim version. The faithful travel-collage layout (passport, envelope,
 * lemons, tomatoes, pasta, Capri photo arranged around the invitation) is still
 * to be built. For now the invitation card + a simple asset row stand in.
 */
export function SaveTheDate() {
  const c = home.collage;
  return (
    <section className="bg-wedding-blue px-6 py-20 text-center">
      <h2 className="font-title text-6xl text-wedding-gold sm:text-7xl">Save the Date</h2>

      <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-8">
        {/* Invitation card */}
        <div className="w-full max-w-xs rounded-sm border border-wedding-gold/30 bg-wedding-maroon px-8 py-10 text-wedding-cream shadow-2xl">
          <p className="font-serif text-2xl">{wedding.date.display}</p>
          <p className="my-4 text-wedding-gold/70">~ ✦ ~</p>
          <p className="font-serif text-xl">{wedding.venue}</p>
          <p className="font-serif text-lg text-wedding-cream/85">{wedding.city}</p>
          <p className="my-4 text-wedding-gold/70">~ ✦ ~</p>
          <p className="font-sans text-sm tracking-wide">{wedding.time}</p>
        </div>

        {/* Placeholder asset row — to be composed into the real collage */}
        <div className="flex items-end justify-center gap-3 opacity-95">
          {[c.passport, c.lemons, c.envelope, c.tomatoes, c.pasta].map((src) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={src}
              src={src}
              alt=""
              className="h-14 w-auto object-contain drop-shadow-lg"
            />
          ))}
        </div>
      </div>

      <p className="mt-14 font-serif text-3xl text-wedding-cream sm:text-4xl">
        We&apos;re getting married &hellip; in{" "}
        <span className="font-title text-wedding-gold">{wedding.city.replace(", Italy", ", Italy!")}</span>
      </p>
    </section>
  );
}
