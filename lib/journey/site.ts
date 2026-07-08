/**
 * Config for the "Our Journey" site build (routes under /preview).
 * Names, date, and navigation — the single place to edit site chrome copy.
 */

export const SITE = {
  names: { one: "Jacquelyn", two: "Tommy" },
  monogram: "J & T",
  date: { display: "June 4th, 2027", iso: "2027-06-04T16:00:00+02:00" },
  place: "Sorrento, Italy",
  venue: "Bellevue Syrene",
} as const;

export type NavItem = { label: string; href: string };

/** Primary navigation. `/preview` is home (the globe journey). */
export const NAV: NavItem[] = [
  { label: "Home", href: "/preview" },
  { label: "The Wedding", href: "/preview/wedding" },
  { label: "Travel & Stay", href: "/preview/travel" },
  { label: "Our Story", href: "/preview/story" },
  { label: "Wedding Party", href: "/preview/party" },
  { label: "Registry", href: "/preview/registry" },
  { label: "FAQ", href: "/preview/faq" },
  { label: "RSVP", href: "/preview/rsvp" },
];
