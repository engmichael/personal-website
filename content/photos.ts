/* Off the clock — Photography. Real frames only; width/height are the
   original pixel dimensions. `tall` spans two rows in the desktop grid. */

export type Photo = {
  src: string;
  title: string;
  location: string;
  year: string;
  alt: string;
  width: number;
  height: number;
  tall?: boolean;
};

export const photos: Photo[] = [
  { src: "/media/prague.jpeg", title: "Vltava", location: "Prague", year: "2020", width: 3990, height: 2992, alt: "The Vltava river and riverside buildings in Prague at golden hour" },
  { src: "/media/san-diego.jpeg", title: "Palms", location: "San Diego", year: "2021", width: 3024, height: 4032, tall: true, alt: "Palm trees silhouetted against a sunset sky in San Diego" },
  { src: "/media/vienna.jpeg", title: "Stephansdom", location: "Vienna", year: "2020", width: 3809, height: 2857, alt: "Vienna's rooftops seen from St. Stephen's Cathedral" },
  { src: "/media/berlin.jpeg", title: "Alexanderplatz", location: "Berlin", year: "2020", width: 3919, height: 2938, alt: "The World Clock and TV Tower at Alexanderplatz, Berlin" },
  { src: "/media/prater.jpeg", title: "Riesenrad", location: "Vienna", year: "2020", width: 4032, height: 3024, alt: "The Riesenrad Ferris wheel at the Prater at dusk" },
];
