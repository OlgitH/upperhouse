/**
 * Content types. These mirror the Payload collections we expect to create
 * later (Cottages, Reviews, Experiences, Pages) so migrating is a matter of
 * replacing the getters in ./index.ts, not touching components.
 */

export type Photo = {
  src: string;
  alt: string;
  /** Optional CSS object-position, e.g. "50% 30%" */
  focus?: string;
};

export type RateRow = {
  nights: number;
  low: number;
  mid: number;
  high: number;
};

export type Cottage = {
  slug: "starlight-cottage" | "black-hill-barn";
  name: string;
  strapline: string;
  audience: string;
  sleeps: number;
  sleepsExtra: number;
  bedrooms: string;
  bathrooms: string;
  hero: Photo;
  /** Hero photo position (CSS object-position) on desktop / mobile. */
  heroPosition?: string;
  heroMobilePosition?: string;
  gallery: Photo[];
  /** Full-bleed splash photos placed down the page (availability sits after the first). */
  splash: Photo[];
  intro: string[];
  layout: { title: string; items: string[] }[];
  facilities: string[];
  outdoor: string[];
  dogs: string[];
  /** Price per stay (GBP), keyed by length of stay. */
  rates: RateRow[];
};

export type Review = {
  property: "Starlight Cottage" | "Black Hill Barn";
  date: string;
  quote: string;
  ratings?: { comfort: number; cleanliness: number; equipment: number; location: number };
};

export type Experience = {
  id: string;
  title: string;
  summary: string;
  body: string;
  photo: Photo;
};

export type BookedRange = {
  /** First occupied night (check-in day), YYYY-MM-DD */
  from: string;
  /** Check-out day, YYYY-MM-DD. The night before it is the last occupied night. */
  to: string;
};
