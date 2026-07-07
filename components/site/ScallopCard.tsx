import type { CSSProperties } from "react";

/**
 * A card with a thick scalloped (cloud-bump) border, echoing the Amalfi
 * cabana/awning motif on the Travel page. The scalloped silhouette is drawn
 * with a CSS mask so it adapts to any content height.
 *
 * `border` is the scalloped frame color, `fill` the inner card color.
 */
export function ScallopCard({
  border,
  fill,
  className = "",
  children,
}: {
  border: string;
  fill: string;
  className?: string;
  children: React.ReactNode;
}) {
  const R = 26; // scallop bump radius — larger, wavier bumps to match the live cabana edge
  const scallopMask = `
    radial-gradient(${R}px at 50% 100%, #000 98%, #0000) 50% 0 / ${2 * R}px ${R}px repeat-x,
    radial-gradient(${R}px at 50% 0,    #000 98%, #0000) 50% 100% / ${2 * R}px ${R}px repeat-x,
    radial-gradient(${R}px at 100% 50%, #000 98%, #0000) 0 50% / ${R}px ${2 * R}px repeat-y,
    radial-gradient(${R}px at 0 50%,    #000 98%, #0000) 100% 50% / ${R}px ${2 * R}px repeat-y,
    linear-gradient(#000, #000) 50% 50% / calc(100% - ${2 * R}px) calc(100% - ${2 * R}px) no-repeat
  `;
  const maskStyle: CSSProperties = {
    WebkitMask: scallopMask,
    mask: scallopMask,
  };

  return (
    <div className={`relative ${className}`} style={{ background: border, padding: R, ...maskStyle }}>
      <div className="relative" style={{ background: fill, ...maskStyle }}>
        <div className="px-8 py-10 sm:px-12 sm:py-12">{children}</div>
      </div>
    </div>
  );
}
