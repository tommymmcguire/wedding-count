"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-wedding-ink/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Monogram — visible on mobile where the full nav collapses */}
        <Link
          href="/"
          className="font-serif text-lg tracking-[0.15em] text-wedding-cream md:hidden"
          onClick={() => setOpen(false)}
        >
          J&nbsp;<span className="text-wedding-gold">&amp;</span>&nbsp;T
        </Link>

        {/* Desktop nav */}
        <ul className="hidden w-full items-center justify-end gap-6 md:flex lg:gap-8">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`font-serif text-[0.95rem] tracking-wide transition-colors hover:text-wedding-gold ${
                  isActive(item.href)
                    ? "font-semibold text-wedding-cream"
                    : "text-wedding-cream/75"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-wedding-cream md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-wedding-ink transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-[26rem]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block py-2.5 font-serif text-lg tracking-wide ${
                  isActive(item.href)
                    ? "text-wedding-gold"
                    : "text-wedding-cream/85"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
