/* Off the Clock — Travel. Cities Michael has spent time in; lng/lat are real
   coordinates, projected onto the world map. Ported from the live site. */

export type Place = {
  id: string;
  name: string;
  lng: number;
  lat: number;
  desc: string;
  featured?: boolean;
  stat?: string;
};

export const places: Place[] = [
  { id: "chicago", name: "Chicago", lng: -87.6298, lat: 41.8781, desc: "Where I live now, for Booth. New territory, two years to figure it out.", featured: true },
  { id: "nyc", name: "New York City", lng: -74.006, lat: 40.7128, desc: "Home from 2022 to 2026. No city can match the energy, and most days I think no city ever will.", featured: true },
  { id: "hk", name: "Hong Kong", lng: 114.1694, lat: 22.3193, desc: "My dad's home, and the city I keep planning to move back to. Dense, fast, completely itself.", featured: true },
  { id: "london", name: "London", lng: -0.1278, lat: 51.5074, desc: "Where my girlfriend lives, which means I'm there often. A second city that's slowly becoming its own home." },
  { id: "paris", name: "Paris", lng: 2.3522, lat: 48.8566, desc: "I love art, and Paris keeps giving. The kind of city I never get enough of, no matter how many times I land at CDG." },
  { id: "tokyo", name: "Tokyo", lng: 139.6503, lat: 35.6762, desc: "I keep going back. The food is reason enough, but it's the discipline of how the whole city is run that gets me." },
  { id: "copenhagen", name: "Copenhagen", lng: 12.5683, lat: 55.6761, desc: "The most quietly excellent city I've eaten in. Small, walkable, and confident about what it's doing." },
  { id: "prague", name: "Prague", lng: 14.4378, lat: 50.0755, desc: "A semester abroad in 2020. The city where I learned to be alone in a place." },
  { id: "plano", name: "Plano, TX", lng: -96.6989, lat: 33.0198, desc: "Where I grew up. Quiet, suburban, and the baseline I keep measuring other places against." },
  { id: "singapore", name: "Singapore & Malaysia", lng: 103.8198, lat: 1.3521, desc: "My mom's side. Hot, layered, and the closest I get to a second hometown." },
  { id: "tanzania", name: "Tanzania", lng: 37.3556, lat: -3.0674, desc: "Seven days up Kilimanjaro, then a safari to come back down to earth. The trip I'll be telling stories about for a while.", featured: true, stat: "19,341 ft" },
  { id: "sf", name: "San Francisco", lng: -122.4194, lat: 37.7749, desc: "Where the work keeps sending me. The center of gravity for tech, and a city I find easier to admire than to love." },
  { id: "hawaii", name: "Hawaii", lng: -157.8583, lat: 21.3069, desc: "Where my cousin lives, which is the best reason to keep going back." },
  { id: "la", name: "Los Angeles", lng: -118.2437, lat: 34.0522, desc: "Friends, food, and the kind of sprawl that takes effort to like. I've put in the effort." },
];
