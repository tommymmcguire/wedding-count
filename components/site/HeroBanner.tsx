/**
 * Full-bleed photo banner used at the top of interior pages: a coastal photo
 * with a legibility gradient and the page title in gold script over it.
 */
export function HeroBanner({
  image,
  title,
  kicker,
  subtitle,
  height = "h-[52vh] min-h-[340px]",
}: {
  image: string;
  title: string;
  kicker?: string;
  subtitle?: string;
  height?: string;
}) {
  return (
    <section className={`relative flex ${height} items-center justify-center overflow-hidden bg-wedding-hero`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />

      <div className="relative z-10 px-6 text-center">
        {kicker && (
          <p className="font-serif text-sm uppercase tracking-[0.35em] text-wedding-cream/80 drop-shadow sm:text-base">
            {kicker}
          </p>
        )}
        <h1 className="font-title text-6xl leading-tight text-wedding-gold drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 font-serif text-xl italic text-wedding-cream drop-shadow-md sm:text-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
