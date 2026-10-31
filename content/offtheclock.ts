/* Chapter 04 — Off the Clock. One chapter, three hobbies, told the same way.
   Each block's data lives in photos.ts / places.ts / eats.ts. */

export const offTheClock = {
  label: "Travel · Food · Photography",
  intro:
    "The same instincts as the day job — curiosity, a plan, and a high bar — pointed somewhere else. I keep a running list of cities, plan more trips around dinner than I'd like to admit, and carry a camera everywhere I go.",
  also: ["Guitar", "Volleyball", "Pickleball", "Design"],
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
