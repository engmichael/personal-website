/* Chapter 3 — Off the Clock. One chapter, three hobbies, told the same way.
   Each block's data lives in photos.ts / places.ts / eats.ts. */

export const offTheClock = {
  label: "Travel · Food · Photography",
  intro:
    "The same instincts as the day job — curiosity, a plan, and a high bar — pointed somewhere else. I keep a running list of cities, plan more trips around dinner than I'd like to admit, and carry a camera everywhere I go.",
  // Beside "A life in motion" at the top of the chapter.
  photo: {
    src: "/media/nyc-marathon-2025.jpg",
    alt: "Michael at the 2025 New York City Marathon finish, wearing his medal and a Success Academy shirt",
    caption: "TCS NYC Marathon",
    date: "November 2, 2025",
  },
  hobbies: ["Running", "Volleyball", "Pickleball", "Guitar", "Texas Hold'em", "Reading"],
  interests: ["Subway design", "Peruvian food", "Costco", "Dallas Mavs", "Coldplay", "Christopher Nolan"],
  licenses: [
    "Texas Real Estate",
    "Class M Motorcycle",
    "PADI Open Water Scuba Diving",
    "Ordained Wedding Officiation",
  ],
  blocks: {
    photography: {
      title: "Photography",
      lede: "Mostly cities, mostly on foot. A few frames from a 2020 semester in Prague and the trips since.",
    },
    travel: {
      title: "Travel",
      lede: "Fourteen places that shaped me, from Plano to Hong Kong — and one summit.",
    },
    food: {
      title: "Food",
      lede: "Four years of eating my way through New York, ranked. The Chicago list is in progress.",
    },
  },
};
