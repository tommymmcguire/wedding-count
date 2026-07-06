/** Script title banner used at the top of interior pages. */
export function PageBanner({
  title,
  kicker,
  subtitle,
  className = "",
}: {
  title: string;
  kicker?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`px-6 pb-10 pt-16 text-center sm:pt-20 ${className}`}>
      {kicker && (
        <p className="font-serif text-lg uppercase tracking-[0.35em] text-wedding-cream/70">
          {kicker}
        </p>
      )}
      <h1 className="font-title text-6xl leading-tight text-wedding-gold sm:text-7xl md:text-8xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 font-serif text-xl italic text-wedding-cream/80">{subtitle}</p>
      )}
      <div className="mx-auto mt-6 flex items-center justify-center gap-3 text-wedding-gold/60">
        <span className="h-px w-12 bg-current" />
        <span className="text-xs">✦</span>
        <span className="h-px w-12 bg-current" />
      </div>
    </div>
  );
}
