import { home, wedding } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-wedding-hero">
      {/* Torii-gate hero photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={home.heroImage}
        alt="Jacquelyn and Tommy beneath a torii gate in Kyoto"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55" />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center">
        {/* Dotted flight path from the Engaged stamp, arcing over the names to
            the Married stamp — a static take on the live site's animated line. */}
        <svg
          className="pointer-events-none absolute inset-0 -z-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 14 26 C 30 6, 55 10, 62 20 S 80 34, 88 30"
            fill="none"
            stroke="#f4e4a1"
            strokeWidth="0.35"
            strokeDasharray="0.2 1.6"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
        {/* Little paper airplane riding the leading end of the flight path */}
        <svg
          className="pointer-events-none absolute left-[84%] top-[23%] -z-0 w-6 rotate-[33deg] text-wedding-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:w-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>

        {/* Engaged stamp + label */}
        <div className="absolute -left-2 top-6 flex flex-col items-center sm:left-2 md:left-6">
          <span className="mb-1 font-script text-lg text-wedding-gold drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] sm:text-xl md:text-2xl">
            Engaged
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={home.stampEngaged}
            alt="Osaka Castle stamp"
            className="w-16 rotate-[-8deg] drop-shadow-lg sm:w-20 md:w-24"
          />
        </div>

        {/* Married stamp + label */}
        <div className="absolute -right-2 bottom-2 flex flex-col items-center sm:right-2 md:right-6">
          <span className="mb-1 font-script text-lg text-wedding-gold drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] sm:text-xl md:text-2xl">
            Married
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={home.stampMarried}
            alt="Italia / Sorrento stamp"
            className="w-20 rotate-[6deg] drop-shadow-lg sm:w-24 md:w-28"
          />
        </div>

        <h1 className="relative font-script text-7xl leading-[0.9] text-wedding-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-8xl md:text-9xl">
          {wedding.names.one}
        </h1>
        <span className="relative my-2 inline-block rounded-[50%] border border-wedding-gold/70 px-6 py-0.5 font-serif text-2xl italic text-wedding-gold/90 drop-shadow-md sm:text-3xl">
          and
        </span>
        <h1 className="relative font-script text-7xl leading-[0.9] text-wedding-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-8xl md:text-9xl">
          {wedding.names.two}
        </h1>

        <p className="relative mt-10 font-sans text-lg font-medium tracking-wide text-wedding-gold drop-shadow-md sm:text-xl">
          {wedding.tagline}
        </p>
        <span className="relative mt-4 animate-bounce text-wedding-gold/80">▼</span>
      </div>
    </section>
  );
}
