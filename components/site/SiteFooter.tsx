import Link from "next/link";
import { nav, wedding } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-wedding-ink px-6 py-14 text-center text-wedding-cream/70">
      <p className="font-script text-4xl text-wedding-gold">
        {wedding.names.one} &amp; {wedding.names.two}
      </p>
      <p className="mt-2 font-serif text-sm tracking-[0.2em] text-wedding-cream/60">
        {wedding.city.toUpperCase()} · {wedding.date.display.toUpperCase()}
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-serif text-sm">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-wedding-cream/60 transition-colors hover:text-wedding-gold"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs tracking-wide text-wedding-cream/40">
        With love, Jacquelyn &amp; Tommy
      </p>
    </footer>
  );
}
