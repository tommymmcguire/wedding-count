import Image from "next/image";
import { home, wedding } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-wedding-hero">
      {/* Torii-gate hero photo */}
      <Image
        src={home.heroImage}
        alt="Jacquelyn and Tommy beneath a torii gate in Kyoto"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55" />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center">
        {/* Engaged stamp */}
        <Image
          src={home.stampEngaged}
          alt="Engaged"
          width={140}
          height={200}
          className="absolute -left-2 top-8 w-16 rotate-[-8deg] drop-shadow-lg sm:left-4 sm:w-24 md:w-28"
        />
        {/* Married stamp */}
        <Image
          src={home.stampMarried}
          alt="Married"
          width={200}
          height={150}
          className="absolute -right-2 bottom-4 w-20 rotate-[6deg] drop-shadow-lg sm:right-4 sm:w-28 md:w-32"
        />

        <h1 className="font-script text-7xl leading-[0.9] text-wedding-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-8xl md:text-9xl">
          {wedding.names.one}
        </h1>
        <span className="my-2 font-serif text-2xl italic text-wedding-gold/90 drop-shadow-md sm:text-3xl">
          and
        </span>
        <h1 className="font-script text-7xl leading-[0.9] text-wedding-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-8xl md:text-9xl">
          {wedding.names.two}
        </h1>

        <p className="mt-10 font-sans text-lg font-medium tracking-wide text-wedding-gold drop-shadow-md sm:text-xl">
          {wedding.tagline}
        </p>
        <span className="mt-4 animate-bounce text-wedding-gold/80">▼</span>
      </div>
    </section>
  );
}
