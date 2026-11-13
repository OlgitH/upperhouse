import type { Photo } from "./types";

/**
 * Central image library. Swap files in /public/images (or point `src` at a CMS
 * media URL later) without touching any page.
 */
export const photos = {
  blackHill: { src: "/images/black-hill.jpg", alt: "Patchwork fields and hedgerows beneath the escarpment of Black Hill", focus: "50% 40%" },
  barnExterior: { src: "/images/barn-exterior.jpg", alt: "The stone and slate converted barn under a blue sky", focus: "50% 55%" },
  barnInterior: { src: "/images/barn-interior.jpg", alt: "Oak-beamed living space with mezzanine, wood burner and sofa", focus: "50% 50%" },
  bedroom: { src: "/images/bedroom.jpg", alt: "Bedroom with a turquoise quilted throw and a window onto the hills", focus: "40% 50%" },
  cabinView: { src: "/images/cabin-view.jpg", alt: "Wood burner and open windows looking over the green Herefordshire fields", focus: "50% 50%" },
  spa: { src: "/images/spa-relax.jpg", alt: "Spa relaxation room with loungers facing floor-to-ceiling views of the hills", focus: "50% 55%" },

  // Splash / feature photography
  patioView: { src: "/images/patio-view.jpg", alt: "The barn's stone terrace looking out over the green Herefordshire valley under a big sky", focus: "50% 55%" },
  gardenView: { src: "/images/garden-view.jpg", alt: "Terraced lawns and clipped bay trees above the rolling valley", focus: "50% 45%" },
  snowBarn: { src: "/images/snow-barn.jpg", alt: "The stone barn and gardens under deep snow", focus: "50% 55%" },
  sunsetSnow: { src: "/images/sunset-snow.jpg", alt: "Sun setting orange behind a bare oak over snowy fields", focus: "50% 55%" },
  starsWide: { src: "/images/stars-wide.jpg", alt: "The Milky Way and a sky full of stars above the barn roofline", focus: "50% 40%" },
  starsChimney: { src: "/images/stars-chimney.jpg", alt: "Stars above a stone chimney and trees, a lit window glowing below", focus: "50% 40%" },
  craswallSign: { src: "/images/craswall-sign.jpg", alt: "A bicycle leaning on the Craswall village sign, a quiet lane running towards Black Hill", focus: "50% 45%" },
  valleyHeather: { src: "/images/valley-heather.jpg", alt: "A green Black Mountains valley striped with purple heather under a blue sky", focus: "50% 50%" },
  walkBlackMountains: { src: "/images/black-mountains-walk.jpg", alt: "A family and their dog walking a red earth path across the heather of the Black Mountains", focus: "50% 55%" },
  aurora: { src: "/images/aurora.jpg", alt: "Purple and green aurora glowing above the silhouetted trees and hills at night", focus: "50% 55%" },
  riverWye: { src: "/images/river-wye.jpg", alt: "A broad river winding between autumn-coloured trees under a soft blue sky", focus: "50% 50%" },
  bikeHeather: { src: "/images/bike-heather.jpg", alt: "A mountain bike lying on a bank of purple heather above a green valley", focus: "40% 50%" },
  spaTerrace: { src: "/images/spa-terrace.jpg", alt: "Two loungers on the spa terrace with towels, lavender and flowering tobacco plants, the valley soft behind the railings", focus: "50% 55%" },
  spaSauna: { src: "/images/spa-sauna.jpg", alt: "The Finnish sauna with robes hanging beside it, and a lounger by a picture window over the valley", focus: "40% 50%" },
  boots: { src: "/images/boots.jpg", alt: "Walking boots and wellies by a pot of red geraniums on the gravel", focus: "50% 50%" },
  churchConcert: { src: "/images/church-concert.jpg", alt: "A flute and guitar duo playing in a candle-lit, carved-oak church", focus: "50% 45%" },
  hydrangeaBarn: { src: "/images/hydrangea-barn.jpg", alt: "Hydrangeas in front of the stone barn, terraced gardens rising behind", focus: "50% 50%" },
  living: { src: "/images/living.jpg", alt: "Open-plan living area with wood burner, striped sofa and oak mezzanine", focus: "50% 50%" },
  kitchen: { src: "/images/kitchen.jpg", alt: "Kitchen and dining area with a tall glazed door onto the garden", focus: "50% 50%" },
  bedroomBlue: { src: "/images/bedroom-blue.jpg", alt: "Double bedroom with whitewashed stone wall, blue-and-white linen and a deep-set window", focus: "50% 50%" },
  summerhouse: { src: "/images/summerhouse.jpg", alt: "Summer house with a lit wood burner, shelves of books and framed prints", focus: "50% 50%" },
} satisfies Record<string, Photo>;
