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
  // External links. Set airbnb/vrbo to a URL to show those buttons on /stay.
  links: {
    registry: "https://www.zola.com/registry/jacquelynandtommy",
    hostHotel: "https://www.bellevue.it/en/",
    otherHotels: "https://mcguire-wedding-accomodations.netlify.app/",
    airbnb: "",
    vrbo: "",
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

/** Asset paths — optimized (resized + compressed) copies committed to /public/media. */
export const asset = (hash: string) => `/media/${hash}`;

export const home = {
  heroImage: asset("590ebe11828ebd0cd82371bd1b0e5a36.jpg"), // torii gate + couple
  // TODO: the original "Engaged" Osaka/Japan stamp is drawn as vector art in the
  // Canva hero and has no standalone file — using the passport as a stand-in for now.
  stampEngaged: asset("a53da8b60346352c158630b890c286cc.png"), // passport (stand-in)
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
    asset("1dcda1235b9a939cc6159717e1ea1b8e.jpg"),
    asset("d5afcbedc140b93c683e813470bad33d.jpg"),
    asset("bcbea3ee8ad7cc523b547589edb46f81.jpg"),
    asset("22828e8730062a7985090301e256a670.jpg"),
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

/* ============================================================
   Interior pages
   ============================================================ */

export const events = {
  heroImage: asset("5035ce311d7589e7f0ecfa7941b53908.jpg"), // Sorrento coast banner
  intro: {
    kicker: "Wedding Weekend",
    title: "at a glance",
    subtitle: "Itinerary of special events",
  },
  days: [
    {
      day: "Thursday",
      date: "June 3rd",
      title: "Welcome Party!",
      note: "Special Guest TBD",
      items: [],
    },
    {
      day: "Friday",
      date: "June 4th",
      title: "Wedding Day!",
      items: [
        {
          time: "5:30 PM",
          name: "Wedding Ceremony",
          desc: "Tommy and Jacquelyn will be saying “I Do” on the famous pier overlooking the Amalfi Coast.",
          photos: [asset("b81207fa625d3a8efe5281fb0faf1769.jpg"), asset("ae423cce0a85009a4f4ddab27e2461b1.jpg")],
        },
        {
          time: "6:30 PM",
          name: "Cocktail Hour",
          desc: "After the ceremony, please proceed to the indoor hospitality suite for drinks and light bites. Feel free to use this time to explore the terrace, take photos, and catch up with friends and family before the evening celebration continues.",
          photos: [asset("13ca3dd95fe65c62e21c907d877c288f.jpg"), asset("a04f88336702f2c19c301940f56da524.jpg")],
        },
        {
          time: "8:00 PM",
          name: "Dinner and Dancing",
          desc: "Dinner and dancing will be hosted at the Michelin-awarded restaurant, La Pergola. Expect authentic Italian cuisine, live music, and plenty of dancing throughout the evening, with a live saxophonist, bongos, and more.",
          photos: [asset("67826313f0524f49781a4ac93ff951a3.jpg"), asset("fa29d3c9a56259cd669df149b971483a.jpg")],
        },
        {
          time: "11:30 PM",
          name: "CAVE RAVE!!",
          desc: "Just when you think the night is over, the real party begins. Join us in the hidden cave beneath the venue for a late-night cave rave with great music, a special musical guest, flowing drinks, and an unforgettable celebration with our favorite people.",
          photos: [asset("15bc3574fadd0f2154368c9d9860347b.jpg")],
        },
      ],
    },
    {
      day: "Saturday",
      date: "June 5th",
      title: "Morning After!",
      note: "More Information Coming Soon!",
      items: [],
    },
  ],
};

export const travel = {
  title: "Travel",
  heroImage: asset("858e4f48de8d5936c9e5b2595c7a66fa.jpg"), // Capri / Faraglioni
  stripeBg: asset("78ead2ca6550595dd7d4cbadbf96cfbb.jpg"), // blue/green cabana stripe
  intro: {
    heading: "Travel to Sorrento",
    body: "We are so excited to celebrate with you in Sorrento, Italy, on June 4, 2027. All wedding events will take place at Bellevue Syrene, a beautiful cliffside hotel overlooking the Bay of Naples. We encourage guests to arrive a few days early and enjoy everything Sorrento, Capri, Naples, and the Amalfi Coast have to offer.",
  },
  sections: [
    {
      heading: "Flying to Italy",
      body: "The closest airport to Sorrento is Naples International Airport (NAP). Most guests traveling from the United States will connect through a major European city such as Rome, Milan, London, Paris, Amsterdam, or Frankfurt before arriving in Naples. For guests planning additional travel within Italy, Rome is also a convenient arrival or departure airport, with easy high-speed train connections to Naples.",
    },
    {
      heading: "Suggested Arrival",
      body: "We recommend arriving between May 31 and June 2, 2027. This will provide plenty of time to settle in, adjust to the time difference, and explore the area before the wedding weekend.",
    },
  ],
  transfers: {
    heading: "Getting from Naples to Sorrento",
    options: [
      {
        name: "Private Transfer",
        body: "The easiest and most comfortable option is arranging a private transfer directly from Naples Airport to your accommodations in Sorrento. Ideal for guests traveling with luggage or arriving after overnight flights. Most hotels, villas, and rental hosts can arrange transfers upon request.",
        meta: ["Travel time: 60–75 minutes", "Cost: ≈ €120–€180 per vehicle"],
      },
      {
        name: "Ferry",
        body: "For a scenic arrival, high-speed ferries operate between Naples and Sorrento, offering beautiful views of the Bay of Naples and Mount Vesuvius. Please note that ferry schedules vary seasonally and are weather dependent.",
        meta: ["Travel time: 35–45 minutes", "Cost: ≈ €20"],
      },
      {
        name: "Train",
        body: "Guests looking for a budget-friendly option can take the Circumvesuviana train from Naples to Sorrento. While safe and widely used, trains can become crowded during peak travel periods.",
        meta: ["Travel time: ≈ 70 minutes", "Cost: typically under €10"],
      },
    ],
  },
  tips: [
    {
      heading: "Getting Around Sorrento",
      body: "One of the best things about Sorrento is that a car is not necessary. The town is highly walkable, and most restaurants, shops, beach clubs, and attractions are easily accessible on foot. Transportation options include walking, local taxis, hotel-arranged drivers, and private car services. Please note that Uber is extremely limited in Southern Italy and should not be relied upon during your stay.",
    },
    {
      heading: "Weather in Early June",
      body: "Early June is one of the most beautiful times of year in Sorrento. Expect warm sunny days, comfortable evenings, and beautiful Mediterranean weather. High: 78–82°F (26–28°C) · Low: 64–68°F (18–20°C).",
    },
    {
      heading: "Accommodations",
      body: "Please visit the Stay page for our recommended hotels and accommodation options. We have partnered with Dahlia Travel Co. to provide a curated selection of properties at a variety of price points, all conveniently located near the wedding venue.",
    },
    {
      heading: "Travel Tips",
      body: "Currency: Euro (€) · Language: Italian. Credit cards are widely accepted. Travelers should bring a passport valid for international travel. Italy uses Type C, F, and L electrical outlets; U.S. guests should bring a plug adapter.",
    },
  ],
};

export const stay = {
  title: "Hotels and Rentals",
  heroImage: asset("2ac2a81b815b3ea40c6792e763e6a235.jpg"), // Bellevue Syrene
  hostHotel: {
    label: "Host Hotel",
    name: "Bellevue Syrene",
    location: "Sorrento, Italy · Amalfi Coast",
    photo: asset("39368e7580dd7eafdaf45cd7699e19de.jpg"), // Hôtel de la Syrène / palms
  },
  otherHotels: {
    heading: "Other Recommended Hotels",
    body: "We have partnered with Dahlia Travel Co. to provide a curated selection of properties at a variety of price points, all conveniently located near the wedding venue.",
    cta: "Find Other Recommended Hotels",
    photos: [asset("951e6df73d145523115c72b5247061b7.jpg"), asset("9fcb0c79c4f39fdd0ee2a577c17c77ca.jpg")],
  },
  rentals: {
    heading: "Rentals",
    body: "Wishlist: Sorrento, Italy — Wedding June 2027. (Change dates accordingly.)",
    airbnbCta: "See my list of Airbnbs",
    vrboCta: "See my list of VRBOs",
    note: "More options coming soon.",
  },
};

export const dressCode = {
  title: "What to Wear",
  heroImage: asset("75692a0c7e2ee192ebd9c5abe3f37f04.jpg"), // Amalfi glamour moodboard
  intro:
    "Inspired by the colorful glamour of the Amalfi Coast, we invite guests to wear playful prints, sun-soaked hues, breezy fabrics, and statement accessories. Think Missoni, Pucci, raffia, crochet, linen, and effortless Mediterranean elegance.",
  events: [
    {
      event: "Welcome Party",
      code: "Dolce Vita",
      moodboards: [asset("92e65a509f244dbea902dcc97871338c.jpg"), asset("cf0ac04dd460006d34f84083f8e1cd64.jpg")],
      girls:
        "Think effortless Mediterranean style with linen, knit polos, tailored shorts, and relaxed tailoring. Your swimsuit should be part of the look — we'll be in and out of the water all afternoon.",
      boys:
        "Think effortless Mediterranean style with linen, knit polos, tailored shorts, and relaxed tailoring. Swim trunks are encouraged as part of your outfit, as we'll be in and out of the water all afternoon.",
    },
    {
      event: "Wedding Day",
      code: "Creative Black Tie",
      moodboards: [asset("0fd055771626ef273f2554c7e24f49ca.jpg"), asset("402e8b35f58c5edc00fb60c584e725d5.jpg")],
      girls:
        "Creative Black Tie is your invitation to embrace bold color, luxurious fabrics, dramatic silhouettes, couture-inspired details, and unforgettable accessories. The more fashion-forward, the better.",
      boys:
        "Creative Black Tie calls for impeccably tailored tuxedos, statement dinner jackets, rich textures, and elevated accessories. Bow ties are required. Neckties and standard business suits are kindly left at home.",
    },
  ],
  note:
    "We invite guests to wear their most glamorous, over-the-top outfits. There is no need to hold back — go all out with dramatic silhouettes, sequins, feathers, and statement accessories.",
};

export const faqHeroImage = asset("858e4f48de8d5936c9e5b2595c7a66fa.jpg"); // Capri

export const faq = [
  {
    q: "What is the date and time of the wedding?",
    a: "The wedding will take place on Friday, June 4th, 2027 in Sorrento, Italy. This is part of a full wedding weekend experience, with events beginning on the afternoon of Wednesday, June 2nd and continuing through Saturday, June 5th, 2027.",
  },
  {
    q: "Where is the wedding taking place?",
    a: "The wedding will be held in Sorrento, Italy, along the Amalfi Coast. The ceremony and reception will take place at a breathtaking cliffside venue overlooking the Mediterranean Sea, with additional events hosted at nearby coastal locations throughout Sorrento.",
  },
  {
    q: "How do I RSVP?",
    a: "RSVPs can be submitted directly under the RSVP tab on our wedding website. Once invitations are sent, guests will be able to confirm attendance and submit their details through the online form.",
  },
  {
    q: "Can I bring a plus-one?",
    a: "Plus-ones are reserved for guests specifically named on the invitation. If a guest is invited with a plus-one, it will be clearly indicated when you RSVP.",
  },
  {
    q: "Are children allowed?",
    a: "To ensure all guests can fully enjoy the weekend experience, this will be an adults-only celebration, unless otherwise noted on your invitation.",
  },
  {
    q: "What should I wear?",
    a: "For each event, please refer to the Dress Code tab on our website, where you'll find curated moodboards for both women and men to help guide outfit inspiration for the entire wedding weekend.",
  },
  {
    q: "What is the wedding itinerary?",
    a: "A full schedule with timing and locations will be shared closer to the wedding date. See the Events page for the current at-a-glance itinerary.",
  },
  {
    q: "Is there parking available?",
    a: "Parking in central Sorrento is very limited and not recommended for guests. Most accommodations will be within walking distance to the venue.",
  },
  {
    q: "What should I know about the venue?",
    a: "Expect stone pathways, stairs, and uneven terrain typical of Amalfi Coast venues. We recommend comfortable footwear for moving between event spaces while still embracing elegant destination attire.",
  },
];

export const registry = {
  title: "Registry",
  heroImage: asset("2f1ff169c226909368b3558eb71757e8.jpg"), // couple / Sorrento
  body: "Your presence in Sorrento is the greatest gift of all. For those who have asked, we've put together a registry to help us begin our next chapter.",
  cta: "View Our Registry",
};

export const gallery = {
  title: "Memories",
  subtitle: "2019 – 2026",
  photos: [
    "906bd0565ef4167e56cf5bb871daccfb","d2a89976967fae297c1cf0fec603e25d","c92a6b8eba4a1195e1c19f39e326f709","f5441c8c641f2905f538d83cdd912f71","50922e119f2a9643f1856751a69c44f4","114b86c17a15ed89eaf943fd27ef267c","d1a55d93603f29e9c568a3dbb9abc8e2","ae558cabf97d3762de95ac658e196198","c80b61772424d339de212506178421fb","3e147346b2959cd60f44cd225d079958","3a0515239b86c7113f4815eadaa9c8c4","1771a2553a0cdfdfc0bf4eb6387ea263","162ce4e25f1e4cafc347abf2acf93014","0fb653d447f1ec3b663b7cd7358a0fdc","6193c152fd088bd4d13726cbc7ebb70f","f494fbf960a8a7693485834e6c83bda6","e748c373ced3d1b4f95f716aad814dda","8a1c26d2c1f0ee58d833e5922400fbb5","4552832d4534ca698279ee22e3a5b36e","4e90335ee35bb474334d8eeae8927236","2c7e5124e202e9d9057f05fa61816290","fe9ddf83473832c123a46087222ba540","ffb40deaad04f35e1c3dd3653789ebda","9939855640e201a9497455b2585f8193","f253dbb8c3eb0d6c317ca676c9f26890","ad67cf127ba8dea9fcee8371b4be7bf6","1fd9154958f9a89913acdfce253e70b4","4cb92833f984f7c915db3e4028098b52","811ab4b3d676bc1d487bafbf598ce3d7","a9dbf17200bbefa7aa8548e515d8389d","249bfc53981f134d4a9ba263d1df0fda","1befbd7b29ac290d2269e6b3c1be6580","7317da049327e9bcb047d487bd76fdf2","466bc63e532fa732e4a2e06a24674076","3c0cf71f23f0e323dd8fd45ad684586a","0489f07286a974be5ba7dc63bacc8f79","1869087c227839e85630458fc567d694","4d10f660351c1a6dade446e09130ec4c","cecddf873bdd35f521c5dd6ce0219eba","9e0d8716504119860e847af95c822625","d6ff1c375163b5c3c8d3f9842a4182f0","42764ed3cd9588912bf1effd407e70a0","6c8568107fb068b08bcaa3296f1b02d4","b2b69cbe8e583400622720f8ea4823bd","6b14f8ef13c97072f7abb7858a904c81","032afdf2e423229d39e17d9ca09d7864","d298b950ab8cf290ac74cc78c72228ca","8552f82f9b3534cb45513235034fc31f","5d07161fe883722dca4de94304c1f881","f89d42a5b421ebd0ce14e177f9c40b3e","63169cdf3218cfe26ff9e4bbeaa14c39","986afb1e713f621206579cc0862f0267","d426a6fc4789e1a5f1cc379da856d9ac",
  ].map((h) => asset(h + ".jpg")),
};
