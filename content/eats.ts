/* Off the Clock — Food. NYC restaurant guide, ported from the live site.
   The first three `featured` entries are shown with notes.
   `featured[].body` may contain inline <em> and is rendered as HTML. */

export type EatsRanked = { num: string; name: string; cuisine: string; hood: string };
export type EatsFeatured = { rank: string; kicker: string; name: string; info: string; body: string };

export const eats = {
  city: "New York City",
  rankedHeading: "The list, in order.",
  featuredHeading: "Three, with notes.",
  period: "2022 — 2026",
  footer: "Want the full database? Find me on Beli at @engmichael.",
  ranked: [
    { num: "01", name: "Atomix", cuisine: "Korean tasting", hood: "NoMad" },
    { num: "02", name: "Jungsik", cuisine: "Korean fine dining", hood: "Tribeca" },
    { num: "03", name: "Jua", cuisine: "Korean tasting", hood: "Flatiron" },
    { num: "04", name: "Thirteen Water", cuisine: "Omakase", hood: "East Village" },
    { num: "05", name: "Howoo", cuisine: "Korean barbecue", hood: "Midtown" },
    { num: "06", name: "Hojokban", cuisine: "Korean", hood: "Midtown" },
    { num: "07", name: "Cho Dang Gol", cuisine: "Korean tofu & stews", hood: "Koreatown" },
    { num: "08", name: "Chongqing Lao Zao", cuisine: "Sichuan", hood: "Flushing" },
    { num: "09", name: "Chalong", cuisine: "Southern Thai", hood: "East Village" },
    { num: "10", name: "Tomi Jazz", cuisine: "Japanese izakaya", hood: "Midtown East" },
    { num: "11", name: "Raku", cuisine: "Udon", hood: "East Village" },
    { num: "12", name: "Patent Pending", cuisine: "Cocktail bar", hood: "Flatiron" },
    { num: "13", name: "Gulp", cuisine: "Taiwanese", hood: "Lower East Side" },
    { num: "14", name: "Apollo Bagels", cuisine: "Bagels", hood: "East Village" },
    { num: "15", name: "Radio Bakery", cuisine: "Bakery", hood: "Greenpoint" },
  ] satisfies EatsRanked[],
  featured: [
    {
      rank: "No. 01", kicker: "the benchmark", name: "Atomix", info: "Korean tasting · NoMad",
      body: `For years this was the restaurant I hadn't been to and couldn't stop thinking about. I finally made it, and it earned the top spot. A two-Michelin-starred Korean tasting menu with a card at every course, in a dining room people fly in for. It's still the benchmark I measure everything else against — <em>now from experience.</em>`,
    },
    {
      rank: "No. 04", kicker: "the value pick", name: "Thirteen Water", info: "Omakase · East Village",
      body: `My standing answer when someone asks where to take a date or a visiting friend they want to impress. Omakase in the East Village, sharply executed, and priced like the chef hasn't yet figured out he could charge more. I've taken everyone here and no one has been disappointed. The room is small enough to feel like you've been let in on something.`,
    },
    {
      rank: "No. 08", kicker: "the pilgrimage", name: "Chongqing Lao Zao", info: "Sichuan · Flushing",
      body: `Worth the trip to Flushing, and worth the three-to-four hour wait that comes with it. <em>Order the hot pot.</em> Numbing, oily, loud, and exactly what I want when I'm tired of being well-behaved about food. Bring people who don't flinch. The wait is part of the meal — by the time you sit down, you've earned it.`,
    },
    {
      rank: "No. 05", kicker: "the hospitality", name: "Howoo", info: "Korean barbecue · Midtown",
      body: `Korean barbecue done at the level you don't expect to find anymore. The meat is excellent, but what brings me back is the hospitality — the team genuinely seems happy you're there, which sounds like a low bar until you realize how few NYC restaurants clear it. Bring people you actually like. They'll remember the meal.`,
    },
    {
      rank: "No. 14", kicker: "the casual icon", name: "Apollo Bagels", info: "Bagels · East Village",
      body: `<em>Get the salmon lox.</em> The aromatics from the dill do something I genuinely wasn't prepared for the first time — it's the kind of bite that recalibrates what you thought a bagel could be. There's a line, the line moves, the bagel is worth it. I've tried most of the contenders in the city and I'm not going back.`,
    },
  ] satisfies EatsFeatured[],
};
