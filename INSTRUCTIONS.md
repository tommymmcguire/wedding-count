# Claude Code Prompt: Wedding Website — "Our Journey Around the Globe"

This is a wedding website and the centerpiece is our love story told as a journey across the globe — the story of two people whose paths converge into one. I want a cinematic, scroll-driven flight-path experience that guests will remember, and a full site built to the same quality bar. Before changing anything, explore the codebase to understand the framework and styling setup.

## Our story, chapter by chapter

1. **Austin, TX** — where our story begins, together
2. **A chapter apart** — one of us stays in Austin, the other moves to Durham, NC. Show this visually: TWO markers/avatars on the globe at once (two soft glowing points, or two tiny planes/hearts), with a delicate thread or dotted line stretching between Austin and Durham to show we stayed connected across the distance
3. **Houston, TX** — the two paths fly toward each other and MERGE into one as we move in together. This convergence should be a real moment: two trails meeting and becoming a single, brighter path (maybe two colors blending into one)
4. **Kyoto, Japan** — the proposal. The single path makes its longest, most sweeping journey across the Pacific. When it arrives, make it magical: drifting cherry blossom petals, a soft bloom of light, maybe a ring motif
5. **Back to Houston, TX** — home again, engaged
6. **Austin, TX** — we bought a house; a little home icon blooms at the marker, full-circle back to where the story began
7. **Sorrento, Italy** — the finale: the wedding. The path sweeps across the Atlantic and arrives in warm Mediterranean light — the destination glows gold as the grandest moment of the journey

## Core experience — the globe journey

- 3D globe built with Three.js using WebGPURenderer with automatic WebGL fallback. IMPORTANT: the WebGL fallback is not an edge case — many guests will be on older iPhones without WebGPU. Treat the fallback as a first-class target: verify both paths render identically, don't use any WebGPU-exclusive features, and test on older mobile devices as the baseline
- Scroll-driven: the camera follows the path and the globe rotates to bring each destination into view
- Glowing arced flight paths with soft trailing lines; before Houston there are two distinct trails (two complementary colors, e.g., blush and gold), after Houston one unified trail (the colors blended)
- At each chapter, the globe pauses and a story card fades in elegantly — photo, date, short paragraph (I'll provide content; placeholders for now). The Durham chapter's card should sit between the two separated markers
- Repeated cities (Houston twice, Austin twice) each get their own story card and arrival moment; layer returning arcs gracefully with slightly different heights
- Pacing: quick, lively hops for the domestic legs; slow, sweeping, cinematic crossings for Kyoto and Sorrento with the camera pulling back over the ocean. With seven chapters this is a long scroll — tune the scroll distance per leg so the story never drags
- Style the globe elegantly, not realistically: soft matte tones, delicate line-art or dotted continents, atmospheric rim glow, gentle starfield or gradient backdrop matching the wedding palette
- Use accurate lat/long for Austin, Durham, Houston, Kyoto, and Sorrento

## Design direction

- Mood: [e.g., romantic and elegant, travel-journal whimsy]
- Palette: [e.g., ivory, blush, gold on a deep navy night-sky backdrop — the two pre-Houston trail colors should come from this palette]
- Typography: refined serif or script display font for headings, clean body font, animated text reveals on story cards

## Site-wide systems (build these first)

- A shared design system: color tokens, type scale, spacing scale, button/card/input components — extracted from the globe experience's aesthetic so everything matches
- Navigation: elegant fixed header that recedes on scroll down and returns on scroll up; a full-screen mobile menu with a graceful open animation; current page indicated with an animated underline motif
- Footer with names, date, monogram, and a tiny flight-path flourish
- Page transitions: smooth crossfades between routes
- A scroll-reveal system used consistently: content fades/slides in with stagger — subtle and elegant, never gimmicky
- A countdown-to-the-wedding element somewhere prominent
- Custom 404 page: "Looks like this flight was cancelled" with a link home
- OG/social meta tags with a beautiful share image; favicon with our monogram
- Carry the travel motif site-wide: dotted flight-path section dividers, boarding-pass-styled info cards, luggage-tag labels

## Pages

1. **Home / landing** — the globe journey is the hero, but open above it with our names, the date, and "Sorrento, Italy" in beautiful typography with an animated text reveal, plus a scroll cue inviting guests into the journey. After the globe, close with a warm invitation moment and a prominent RSVP call-to-action
2. **The Wedding / event details** — schedule of events (welcome dinner, ceremony, reception) presented as an elegant itinerary, like pages from a travel journal. Each event card: time, venue, dress code, map link. Consider a vertical timeline with a dotted flight-path connector and staggered scroll reveals
3. **Travel & stay** — destination wedding in Sorrento, so this page works hard: flights guidance (Naples is the nearest airport), getting from Naples to Sorrento (train/ferry/car), hotel blocks and recommendations as boarding-pass or luggage-tag styled cards, and a "things to do" mini-guide (Positano, Capri, Pompeii) with a small illustrated map of the Sorrentine peninsula. Collapsible sections so it doesn't overwhelm
4. **RSVP** — the emotional peak of guest interaction. Style the flow as filling out a boarding pass: name lookup, attendance, meal choice, song request. Graceful validation, delightful focus states, and on submit a confirmation animation — the boarding pass "stamps" and a tiny plane flies off with confetti or petals. Handle "can't attend" responses with warmth, not a dead end
5. **Our story / gallery** — photos organized by the chapters from the globe (Austin, Durham, Houston, Kyoto, Austin again), masonry layout, lightbox, lazy loading, subtle Ken Burns drift. Optionally filterable by chapter
6. **Wedding party** — cards for each member with photo, name, role, and a one-line fun fact; a gentle flip or slide reveal on hover/tap
7. **Registry** — simple and gracious, link cards out to registries, a note-from-us section; consider a honeymoon-fund framing given the destination wedding
8. **FAQ** — accordion with smooth height animations: dress code, weather in Sorrento, kids, transportation, photo-sharing policy

## Quality bar and constraints

- 60fps target; lazy-load the globe scene, pause rendering off-screen or when the tab is hidden
- Mobile-first: most guests will view on phones — the globe must work beautifully with touch scrolling, with scaled-down effects on low-end devices
- Respect prefers-reduced-motion with a graceful static fallback: a flat illustrated map showing the two paths merging and the full route
- Accessible: readable contrast, keyboard-navigable RSVP, alt text everywhere
- Micro-interactions throughout: soft hover blooms, elegant underline animations, graceful form focus states
- Propose library choices (e.g., Three.js + GSAP ScrollTrigger, or React Three Fiber + drei if React) with reasoning before installing anything
- Use tasteful placeholders where I haven't provided copy or photos

## Process

1. Start with a 2–3 sentence creative pitch for the overall experience
2. Then a phased plan
3. Build the globe journey as an isolated demo page FIRST so I can iterate on the feel (camera speed, arc heights, pacing, the Houston convergence moment) before wiring it into the full site
4. Then build the design system, then the remaining pages one at a time, showing me each for review before moving on
5. At the end, give me a single content checklist of everything I need to supply (photos, copy, venue details, hotel blocks, registry links)