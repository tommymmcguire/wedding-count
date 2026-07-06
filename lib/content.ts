/**
 * Central content model for the wedding site.
 *
 * Everything a non-developer might want to change — dates, links, copy — lives
 * here so pages stay layout-only. Edit these values; the pages update.
 */

export const wedding = {
  names: { one: "Jacquelyn", two: "Tommy" },
  tagline: "Join us as we say I do.",
  date: { display: "June 4th, 2027", iso: "2027-06-04" },
  venue: "Bellevue Syrene",
  city: "Sorrento, Italy",
  time: "4:00 PM 'til late",
  // External links — swap these for the real URLs.
  links: {
    registry: "#registry-link",
    hostHotel: "https://www.bellevue.it/",
    otherHotels: "#other-hotels",
    airbnb: "#airbnb-wishlist",
    vrbo: "#vrbo-wishlist",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Travel", href: "/travel" },
  { label: "Stay", href: "/stay" },
  { label: "Dress Code", href: "/dress-code" },
  { label: "FAQ", href: "/faq" },
  { label: "Gallery", href: "/gallery" },
  { label: "Registry", href: "/registry" },
  { label: "RSVP", href: "/rsvp" },
] as const;

/** Asset paths (served from /public/canva during local dev). */
export const asset = (hash: string) => `/canva/${hash}`;

export const home = {
  heroImage: asset("590ebe11828ebd0cd82371bd1b0e5a36.jpg"), // torii gate + couple
  stampEngaged: asset("05dc42021f71295bbf730e5622027227.png"), // placeholder until confirmed
  stampMarried: asset("6c07c8e043635bd0d71b443ae966ffef.png"), // Italia / Sorrento
  collage: {
    passport: asset("a53da8b60346352c158630b890c286cc.png"),
    envelope: asset("42aa6b62b8d37a47596a9a14bf6b428e.png"),
    lemons: asset("7ef565595fedf85344c94402da5bdbb9.png"),
    tomatoes: asset("f04083a414439be6485e71021f88328e.png"),
    pasta: asset("d2e95480b10f4b89afb75a775a69f9ba.png"),
    capri: asset("05dc42021f71295bbf730e5622027227.png"),
  },
  // Japan engagement-shoot polaroids for the Love Story collage (left → right).
  lovePolaroids: [
    asset("b2a8d6709ed458c0b18ff0cdd02c5ec7.jpg"),
    asset("ab7dd541e408c5cfc145c7096de3590d.jpg"),
    asset("9dd0076287193dee7e7a207469fbd47e.jpg"),
    asset("9096c547ca9945de4681f839d1b1b256.jpg"),
  ],
  loveStory: [
    "We've all experienced a first day. The kind where everything feels new, a little overwhelming, and full of possibility.",
    "For Jacquelyn and Tommy, that day was college move-in day.",
    "Surrounded by overflowing boxes, nervous excitement, and the chaos of starting a new chapter, they met for the first time in the halls of Callaway. At the time, they were simply two neighbors beginning a new adventure. Looking back, it turns out they were beginning the same one.",
    "Tommy immediately knew two things: their parents were pretty cool for putting them on the 17th floor of Callaway, and Jacquelyn was the most beautiful girl he had ever seen.",
    "Unfortunately for him, she was already in a relationship, which put a slight dent in his plans. So he did the only thing he could do. He played it cool.",
    "Thankfully, he didn't have to play it cool for very long. A few months later, the timing was finally right. What started as a friendship quickly turned into a first date, then a relationship, and eventually the life we're building together today.",
    "By the end of freshman year, we were inseparable. Throughout college and beyond, we merged friend groups, spent countless weekends together, attended more ZBT parties than we can count, added Winnie to the family, and navigated the highs and lows of our early twenties. Through it all, we always felt like a team.",
    "Our relationship has always been a balance of two very different, yet perfectly complementary, personalities.",
    "Jacquelyn was first drawn to Tommy's curiosity and the way he dives headfirst into anything that catches his interest. It's become a running joke that he can pick up a new hobby on Monday and be surprisingly good at it by Friday. Whatever he sets his mind to, he approaches with determination and enthusiasm. But what Jacquelyn loves most about Tommy is his heart. He is patient, thoughtful, and deeply caring. More than anything, Tommy wants to spend his life helping those in need and making the world a little better than he found it. He dreams big, works hard, and is always looking for ways to create a positive impact on those around him.",
    "Tommy fell in love with the way Jacquelyn approaches life. She believes experiences will always outweigh things, and she has made it her mission to find the very best places, people, food, adventures, and memories worth sharing. If there is a better restaurant, a more beautiful view, or a more unforgettable experience, rest assured Jacquelyn has already researched it.",
    "Together, we've built a life filled with adventure, laughter, encouragement, and the occasional enabling of each other's ambitious ideas. We've traveled, grown up together, celebrated wins, navigated challenges, and somehow still find that our favorite moments are often the simplest ones spent together.",
    "Which brings us to Kyoto, Japan....",
  ],
  proposal: [
    "Was anyone really surprised? Tommy isn't convinced Jacquelyn was entirely.",
    "Like many of Tommy's pursuits, what began as an idea quickly became a full-blown obsession. He spent weeks planning every detail, coordinating logistics, researching locations, and making sure everything would be exactly right. His goal was simple: create a moment as thoughtful and memorable as Jacquelyn deserved.",
    "The plan began with a trip to Hawaii for a cousin's wedding. But for Jacquelyn and Tommy, being halfway around the world somehow wasn't quite far enough, so they decided to continue on to Japan.",
    "In the weeks leading up to the trip, Jacquelyn began noticing a few subtle clues. Tommy was suddenly spending a suspicious amount of time on the phone, obsessing over reservations, and showing an unusual interest in the itinerary. Considering Jacquelyn has long held the title of Chief Planner in the relationship, this behavior was definitely not suspicious at all.",
    "Still, she wisely chose not to ask too many questions. That decision paid off on their first morning in Kyoto.",
    "Tommy announced they were going on a \"hike,\" which influenced at least one important wardrobe decision. Jacquelyn swapped out her yoga outfit for a white dress, just in case.",
    "The hike led them through a beautiful historic Japanese garden. In a quiet, tucked-away corner, surrounded by complete serenity, Tommy got down on one knee and asked Jacquelyn to marry him.",
  ],
};
