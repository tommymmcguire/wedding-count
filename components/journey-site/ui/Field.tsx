"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

/** Text input with a luggage-label floating caption and a gold focus bloom. */
export const Field = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label: string }>(
  function Field({ label, id, className = "", ...rest }, ref) {
    const inputId = id ?? rest.name;
    return (
      <label htmlFor={inputId} className="block">
        <span className="mb-2 block font-body text-[0.6rem] uppercase tracking-[0.28em] text-journey-ivory/55">{label}</span>
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 font-serif text-lg text-journey-ivory placeholder:text-journey-ivory/30 outline-none transition-all duration-300 focus:border-journey-goldWarm/70 focus:bg-white/[0.07] focus:shadow-[0_0_24px_-8px_rgba(246,197,107,0.6)] ${className}`}
          {...rest}
        />
      </label>
    );
  },
);
