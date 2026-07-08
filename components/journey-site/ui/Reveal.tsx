"use client";

import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in ms; use with sibling Reveals for a cascade. */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** Reveal once (default) or re-run each time it re-enters the viewport. */
  once?: boolean;
};

/**
 * Scroll-reveal primitive. Fades + slides content in when it enters the
 * viewport. Honors prefers-reduced-motion (CSS resets it to visible).
 */
export default function Reveal({ children, delay = 0, as, className = "", once = true }: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return createElement(
    Tag,
    {
      ref,
      className: `jr-reveal ${shown ? "is-in" : ""} ${className}`,
      style: { ["--jr-delay" as string]: `${delay}ms` },
    },
    children,
  );
}
