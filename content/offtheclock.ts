/* Chapter 3 — Off the Clock. One chapter, three hobbies, told the same way.
   Each block's data lives in photos.ts / places.ts / eats.ts. */

export const offTheClock = {
  label: "Travel · Food · Photography",
  intro:
    "Outside of work, I'm happiest on the move: training for a race, planning the next trip, or tracking down a meal worth the detour. A camera usually comes along for all of it.",
  // Beside "A life in motion" at the top of the chapter.
  photo: {
    src: "/media/nyc-marathon-2025.jpg",
    alt: "Michael at the 2025 New York City Marathon finish, wearing his medal and a Success Academy shirt",
    caption: "TCS NYC Marathon",
    date: "November 2, 2025",
  },
  hobbies: ["Running", "Volleyball", "Pickleball", "Guitar", "Texas Hold'em", "Reading"],
  interests: ["Subway design", "Peruvian food", "Costco", "Dallas Mavs", "Coldplay", "Christopher Nolan"],
  licenses: ["Texas Real Estate", "Class M Motorcycle", "PADI Open Water Scuba Diving"],
  licensesNote: "On a mission to keep learning and get one new license/certification every year!",
  blocks: {
    photography: {
      title: "Photography",
      lede: "Some of my favorite shots I've taken around the world.",
    },
    travel: {
      title: "Travel",
      lede: "68 flights and 6 continents last year. Always looking for the next adventure.",
    },
    food: {
      title: "Food",
      lede: "I rank everywhere I go and am a top 0.5% diner globally.",
    },
  },
};
