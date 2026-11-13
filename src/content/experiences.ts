import type { Experience } from "./types";
import { photos } from "./photos";

export const experiences: Experience[] = [
  {
    id: "star-gazing",
    title: "Star gazing",
    summary: "Dark Sky skies, not a light to be seen after dark.",
    body: "In 2012 the Brecon Beacons National Park became the first area in Wales to gain International Dark Sky Reserve status. From the terraces at Upper House there is not a light to be seen after dark.",
    photo: photos.starsChimney,
  },
  {
    id: "walking",
    title: "Walking",
    summary: "The Black Mountains and Offa's Dyke from your door.",
    body: "Upper House & Spa sits directly at the foot of the Black Mountains, on the edge of the Brecon Beacons National Park. Offa's Dyke is one of many routes, and three walks wind through our own 70 acres past ancient springs, old drovers' roads and a Bronze Age tumulus.",
    photo: photos.boots,
  },
  {
    id: "cycling",
    title: "Cycling & mountain biking",
    summary: "Epic road and off-road riding, Gospel Pass included.",
    body: "Epic off road and road riding in the Black Mountains and Brecon Beacons. Bring your own or hire a bike and let a local guide show you the hidden gems and famous routes and climbs.",
    photo: photos.barnExterior,
  },
  {
    id: "craswall",
    title: "Craswall & the Marches",
    summary: "An authentic border village on the River Monnow.",
    body: "Craswall is an authentic rural village set along the Monnow River in the old border area between Wales and England, known as the Marches, a free zone where local yeomen ruled until the 16th century. Hay-on-Wye's famous bookshops, the farmers' market and the Hay Festival are about twenty minutes away.",
    photo: photos.blackHill,
  },
];
