import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body uppercase tracking-[0.22em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-journey-goldWarm focus-visible:ring-offset-2 focus-visible:ring-offset-journey-navyDeep disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid:
    "bg-journey-goldWarm text-journey-navyDeep hover:bg-journey-gold hover:shadow-[0_0_28px_-6px_rgba(246,197,107,0.7)]",
  outline:
    "border border-journey-goldWarm/70 text-journey-goldWarm hover:border-journey-goldWarm hover:bg-journey-goldWarm/10",
  ghost: "text-journey-ivory/80 hover:text-journey-ivory",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-[0.7rem]",
  md: "px-7 py-3 text-xs",
  lg: "px-9 py-4 text-sm",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

/** Button that renders as a link when `href` is given, otherwise a <button>. */
export function Button({
  variant = "solid",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: CommonProps & { href?: string } & Partial<ComponentProps<"button">>) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
