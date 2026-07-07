/**
 * Full-bleed photo banner used at the top of interior pages: a coastal photo
 * with a legibility gradient and the page title in gold script over it.
 */
export function HeroBanner({
  image,
  title,
  kicker,
  accent,
  subtitle,
  height = "h-[52vh] min-h-[340px]",
  objectPosition = "center",
  titleFontClass = "font-title",
}: {
  image: string;
  title: React.ReactNode;
  kicker?: string;
  /** Bold-serif line shown under the script title (e.g. Events' "at a glance"). */
  accent?: string;
  subtitle?: string;
  height?: string;
  /** CSS object-position for the photo crop, e.g. "center 72%". */
  objectPosition?: string;
  /** Font family for the title (e.g. "font-script" for the elegant Stay title). */
  titleFontClass?: string;
}) {
  return (
    <section className={`relative flex ${height} items-center justify-center overflow-hidden bg-wedding-hero`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden
        style={{ objectPosition }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />

      <div className="relative z-10 px-6 text-center">
        {kicker && (
          <p className="font-serif text-sm uppercase tracking-[0.35em] text-wedding-cream/80 drop-shadow sm:text-base">
            {kicker}
          </p>
        )}
        <h1 className={`${titleFontClass} text-6xl leading-tight text-wedding-gold drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl`}>
          {title}
        </h1>
        {accent && (
          <p className="-mt-1 font-serif text-4xl font-bold text-wedding-gold/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-5xl md:text-6xl">
            {accent}
          </p>
        )}
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl font-serif text-lg italic leading-relaxed text-wedding-cream drop-shadow-md sm:text-xl">
            {subtitle}
          </p>
        )}
        <span className="mt-4 block animate-bounce text-2xl text-wedding-gold/80 drop-shadow">▼</span>
      </div>
    </section>
  );
}
