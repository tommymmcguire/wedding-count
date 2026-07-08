"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/journey/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  // Recede on scroll down, return on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY.current && y > 120) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/preview" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"} ${
          scrolled ? "bg-journey-navyDeep/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/preview" className="font-script text-2xl text-journey-ivory sm:text-3xl" aria-label="Home">
            {SITE.monogram}
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.filter((n) => n.href !== "/preview").map((item) =>
              item.label === "RSVP" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-journey-goldWarm/70 px-5 py-2 font-body text-[0.68rem] uppercase tracking-[0.22em] text-journey-goldWarm transition-colors hover:bg-journey-goldWarm/10"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive(item.href)}
                  className="jr-navlink font-body text-[0.68rem] uppercase tracking-[0.22em] text-journey-ivory/80 transition-colors hover:text-journey-ivory"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* mobile toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Open menu"
          >
            <span className="h-px w-6 bg-journey-ivory" />
            <span className="h-px w-6 bg-journey-ivory" />
            <span className="h-px w-4 self-end bg-journey-ivory" />
          </button>
        </div>
      </header>

      {/* full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-journey-navyDeep/95 backdrop-blur-lg transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <nav className="relative flex h-full flex-col items-center justify-center gap-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-6 text-3xl text-journey-ivory/80"
            aria-label="Close menu"
          >
            ×
          </button>
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-title text-3xl text-journey-ivory transition-all duration-500"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${menuOpen ? 120 + i * 55 : 0}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
