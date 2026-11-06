/* Off the Clock — Photography. Real frames only, resized into
   public/media/photography; width/height are those files' pixel sizes.
   The grid is masonry (CSS columns), so order sets which column a frame
   lands in: this order keeps the three desktop columns about level.
   `year` is optional and shown when known. */

export type Photo = {
  src: string;
  title: string;
  location: string;
  year?: string;
  alt: string;
  width: number;
  height: number;
};

const dir = "/media/photography";

export const photos: Photo[] = [
  { src: `${dir}/half-dome.jpg`, title: "Half Dome", location: "Yosemite", width: 1200, height: 1600, alt: "Half Dome rising over Yosemite Valley under a grey sky, seen from Glacier Point" },
  { src: `${dir}/tea-eggs.jpg`, title: "Tea Eggs", location: "Hong Kong", width: 1600, height: 1066, alt: "A roadside kiosk in Hong Kong with Coca-Cola signage, drink fridges and hand-lettered signs for tea eggs and siu mai" },
  { src: `${dir}/control-tower.jpg`, title: "Control Tower", location: "Newark", width: 1200, height: 1600, alt: "An airport control tower silhouetted against an orange sunset, seen from the taxiway" },
  { src: `${dir}/sapporo.jpg`, title: "City Lights", location: "Sapporo", width: 1600, height: 1066, alt: "Sapporo's city lights at night, seen from high above" },
  { src: `${dir}/daruma.jpg`, title: "Daruma", location: "Takasaki", width: 1066, height: 1600, alt: "A large red Takasaki daruma figure with gold calligraphy on a bridge railing" },
  { src: `${dir}/kilimanjaro-summit.jpg`, title: "Above the Clouds", location: "Kilimanjaro", width: 1600, height: 1066, alt: "A climber silhouetted against a bright sun near Kilimanjaro's snowy summit, with a sea of clouds below" },
  { src: `${dir}/red-boat.jpg`, title: "Red Boat", location: "Hong Kong", width: 1066, height: 1600, alt: "A small red boat moored in a blue Hong Kong bay below a row of apartment buildings" },
  { src: `${dir}/manhattanhenge.jpg`, title: "Manhattanhenge", location: "New York", width: 1200, height: 1600, alt: "The setting sun framed between Manhattan buildings at the end of a crowded street" },
  { src: `${dir}/serengeti.jpg`, title: "Elephants", location: "Serengeti", width: 1066, height: 1600, alt: "Two elephants grazing on the green Serengeti plains under a pale sky" },
  { src: `${dir}/kilimanjaro-camp.jpg`, title: "Camp", location: "Kilimanjaro", width: 1200, height: 1600, alt: "Lit tents beneath a star-filled night sky on Kilimanjaro" },
];
