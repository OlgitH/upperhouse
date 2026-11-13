/**
 * Content access layer. Every page reads through these functions.
 * When Payload arrives, re-implement the bodies with `payload.find(...)`
 * (collections: cottages, reviews, experiences) and keep the signatures.
 */
import { cottages } from "./cottages";
import { experiences } from "./experiences";
import { reviews } from "./reviews";
import type { Cottage } from "./types";

export { site, nav } from "./site";
export { photos } from "./photos";
export { getBookedRanges } from "./availability";
export type * from "./types";

export async function getCottages() {
  return cottages;
}

export async function getCottage(slug: string): Promise<Cottage | undefined> {
  return cottages.find((c) => c.slug === slug);
}

export async function getReviews(property?: Cottage["name"]) {
  return property ? reviews.filter((r) => r.property === property) : reviews;
}

export async function getExperiences() {
  return experiences;
}
