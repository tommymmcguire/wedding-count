import { home, wedding } from "@/lib/content";

/* eslint-disable @next/next/no-img-element */

/**
 * "Save the Date" travel collage. On tablet/desktop the passport, envelope,
 * lemons, tomatoes, pasta and Capri photo scatter around the invitation card,
 * faithful to the live site. Element positions and font sizes are expressed in
 * container-query units (cqw) so the whole scene scales as one. On phones the
 * collage would shrink below legibility, so we fall back to a stacked layout.
 */
export function SaveTheDate() {
  const c = home.collage;

  const card = (
    <>
      <p className="font-serif text-2xl">{wedding.date.display}</p>
      <p className="my-3 text-sm text-wedding-gold/70">~ ✦ ~</p>
      <p className="font-serif text-xl leading-snug">
        {wedding.venue}
        <br />
        {wedding.city}
      </p>
      <p className="my-3 text-sm text-wedding-gold/70">~ ✦ ~</p>
      <p className="font-sans text-sm tracking-wide">{wedding.time}</p>
    </>
  );

  return (
    <section className="bg-wedding-blue px-6 py-16 text-center sm:py-20">
      {/* Tablet / desktop: scattered travel collage */}
      <div
        className="relative mx-auto hidden aspect-[980/620] w-full max-w-[980px] [container-type:inline-size] md:block"
      >
        {/* Save the Date script */}
        <div
          className="absolute left-[1%] top-[3%] z-40 text-left font-title leading-[0.8] text-wedding-gold drop-shadow-sm"
          style={{ fontSize: "9.5cqw" }}
        >
          <span className="block">Save the</span>
          <span className="block pl-[14%]">Date</span>
        </div>

        {/* Maroon invitation card */}
        <div
          className="absolute left-[49%] top-[1%] z-10 flex h-[42%] w-[21%] flex-col items-center justify-center gap-[2cqw] rounded-sm bg-wedding-maroon px-[1.5cqw] text-wedding-cream shadow-2xl"
        >
          <p className="font-serif" style={{ fontSize: "2.4cqw" }}>
            {wedding.date.display}
          </p>
          <p className="text-wedding-gold/60" style={{ fontSize: "1.5cqw" }}>
            ~ ✦ ~
          </p>
          <p className="font-serif leading-snug" style={{ fontSize: "2.1cqw" }}>
            {wedding.venue}
            <br />
            {wedding.city}
          </p>
          <p className="text-wedding-gold/60" style={{ fontSize: "1.5cqw" }}>
            ~ ✦ ~
          </p>
          <p className="font-sans tracking-wide" style={{ fontSize: "1.7cqw" }}>
            {wedding.time}
          </p>
        </div>

        {/* Collage assets — layered around the card */}
        <img src={c.lemons} alt="" className="absolute left-[35%] top-[13%] z-20 w-[22%] drop-shadow-lg" />
        <img src={c.envelope} alt="" className="absolute left-[40%] top-[40%] z-30 w-[29%] drop-shadow-xl" />
        <img src={c.capri} alt="" className="absolute left-[71%] top-[39%] z-20 w-[28%] rotate-[4deg] rounded-sm drop-shadow-xl" />
        <img src={c.pasta} alt="" className="absolute left-[78%] top-[26%] z-40 w-[14%] rotate-[-8deg] drop-shadow-lg" />
        <img src={c.passport} alt="" className="absolute left-[0%] top-[44%] z-40 w-[23%] rotate-[-11deg] drop-shadow-xl" />
        <img src={c.tomatoes} alt="" className="absolute left-[27%] top-[59%] z-50 w-[18%] drop-shadow-lg" />
      </div>

      {/* Phones: stacked, legible fallback */}
      <div className="md:hidden">
        <h2 className="font-title text-6xl text-wedding-gold">Save the Date</h2>
        <div className="mx-auto mt-8 w-full max-w-xs rounded-sm border border-wedding-gold/30 bg-wedding-maroon px-8 py-10 text-wedding-cream shadow-2xl">
          {card}
        </div>
        <div className="mt-8 flex items-end justify-center gap-3 opacity-95">
          {[c.passport, c.lemons, c.envelope, c.tomatoes, c.pasta].map((src) => (
            <img key={src} src={src} alt="" className="h-14 w-auto object-contain drop-shadow-lg" />
          ))}
        </div>
      </div>

      <p className="mt-10 font-serif text-3xl text-wedding-cream sm:mt-14 sm:text-4xl">
        We&apos;re getting married &hellip; in{" "}
        <span className="font-title text-wedding-gold">{wedding.city.replace(", Italy", ", Italy!")}</span>
      </p>
    </section>
  );
}
