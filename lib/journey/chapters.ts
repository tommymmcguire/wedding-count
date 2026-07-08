/**
 * The journey data model.
 *
 * A `Chapter` is a story stop (a card fades in when the globe pauses there).
 * A `Leg` is an animated flight arc between two cities that draws while the
 * scroll travels from one chapter to the next.
 *
 * Colours come from the palette: blush + gold are the two "apart" trail
 * colours; after Houston they blend into a single warm gold.
 */

export const PALETTE = {
  navy: "#0b1026", // night-sky backdrop
  navyDeep: "#070a1c",
  blush: "#e7a6a0", // trail colour A (Jacquelyn's path)
  gold: "#f2e392", // trail colour B (Tommy's path) — shared with the existing site
  goldWarm: "#f6c56b", // the merged / finale trail
  ivory: "#f7efe2",
  petal: "#f7c6d0",
} as const;

export type City = { name: string; lat: number; lng: number };

export const CITIES = {
  austin: { name: "Austin, TX", lat: 30.2672, lng: -97.7431 },
  durham: { name: "Durham, NC", lat: 35.994, lng: -78.8986 },
  houston: { name: "Houston, TX", lat: 29.7604, lng: -95.3698 },
  kyoto: { name: "Kyoto, Japan", lat: 35.0116, lng: 135.7681 },
  sorrento: { name: "Sorrento, Italy", lat: 40.6263, lng: 14.3757 },
} as const satisfies Record<string, City>;

export type Chapter = {
  id: string;
  city: City;
  /** Scroll weight for the segment that settles on this chapter — bigger = slower. */
  weight: number;
  kicker: string;
  title: string;
  date: string;
  body: string;
  /** Optional special beat handled by the scene. */
  beat?: "apart" | "merge" | "proposal" | "home" | "finale";
};

export const CHAPTERS: Chapter[] = [
  {
    id: "austin-1",
    city: CITIES.austin,
    weight: 1.0,
    kicker: "Chapter One",
    title: "Austin, Texas",
    date: "Where it began",
    body: "Two people, one city, the start of everything. Our story opens under the Texas sky.",
  },
  {
    id: "durham",
    city: CITIES.durham,
    weight: 1.5,
    beat: "apart",
    kicker: "Chapter Two",
    title: "A Chapter Apart",
    date: "Austin ↔ Durham",
    body: "One of us stayed in Austin, the other moved to Durham. A thin thread of light stretched across the country — we stayed connected across the distance.",
  },
  {
    id: "houston-1",
    city: CITIES.houston,
    weight: 1.6,
    beat: "merge",
    kicker: "Chapter Three",
    title: "Houston, Texas",
    date: "Two paths, one",
    body: "Our two paths flew toward each other and merged into one as we moved in together — two trails becoming a single, brighter light.",
  },
  {
    id: "kyoto",
    city: CITIES.kyoto,
    weight: 2.4,
    beat: "proposal",
    kicker: "Chapter Four",
    title: "Kyoto, Japan",
    date: "The proposal",
    body: "The longest, most sweeping journey — across the Pacific to Kyoto, where a question was asked beneath drifting cherry blossoms, and answered with yes.",
  },
  {
    id: "houston-2",
    city: CITIES.houston,
    weight: 1.3,
    kicker: "Chapter Five",
    title: "Home Again",
    date: "Back to Houston",
    body: "Home again, engaged — carrying a new promise back across the ocean to where we'd built our life together.",
  },
  {
    id: "austin-2",
    city: CITIES.austin,
    weight: 1.1,
    beat: "home",
    kicker: "Chapter Six",
    title: "Austin, Again",
    date: "We bought a house",
    body: "Full circle, back to where the story began — keys in hand, a little home of our own blooming on the map.",
  },
  {
    id: "sorrento",
    city: CITIES.sorrento,
    weight: 2.4,
    beat: "finale",
    kicker: "Chapter Seven",
    title: "Sorrento, Italy",
    date: "The wedding",
    body: "The path sweeps across the Atlantic and arrives in warm Mediterranean light — the destination glows gold. We can't wait to celebrate with you here.",
  },
];

export type Leg = {
  from: City;
  to: City;
  color: string;
  height: number; // arc lift as a fraction of radius
  /** Which chapter index this leg finishes arriving at. */
  arriveAt: number;
};

/**
 * Flight legs. Before Houston there are TWO trails (blush + gold) that arrive
 * together at chapter 2 (the merge). After that, a single warm-gold trail.
 * Repeated cities layer their returning arcs at slightly different heights.
 */
export const LEGS: Leg[] = [
  // Two paths converging on Houston (drawn during the "merge" chapter).
  { from: CITIES.austin, to: CITIES.houston, color: PALETTE.gold, height: 0.16, arriveAt: 2 },
  { from: CITIES.durham, to: CITIES.houston, color: PALETTE.blush, height: 0.22, arriveAt: 2 },
  // Single blended trail from here on.
  { from: CITIES.houston, to: CITIES.kyoto, color: PALETTE.goldWarm, height: 0.5, arriveAt: 3 },
  { from: CITIES.kyoto, to: CITIES.houston, color: PALETTE.goldWarm, height: 0.42, arriveAt: 4 },
  { from: CITIES.houston, to: CITIES.austin, color: PALETTE.goldWarm, height: 0.12, arriveAt: 5 },
  { from: CITIES.austin, to: CITIES.sorrento, color: PALETTE.goldWarm, height: 0.5, arriveAt: 6 },
];

/**
 * Progress windows (0..1 over the whole scroll) for each chapter, derived from
 * the weights. `focus` is the scroll point where the globe is settled on that
 * chapter's city; the leg toward chapter i+1 draws between focus[i] and focus[i+1].
 */
export function computeTimeline() {
  const weights = CHAPTERS.map((c) => c.weight);
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  const focus: number[] = [];
  for (let i = 0; i < weights.length; i++) {
    focus.push((acc + weights[i] / 2) / total);
    acc += weights[i];
  }
  return { focus, totalWeight: total };
}
