import type { Metadata } from "next";
import { getReviews, photos } from "@/content";
import { PageHero } from "@/components/PageHero";
import { ReviewsGrid } from "@/components/ReviewsGrid";

export const metadata: Metadata = {
  title: "Guest reviews",
  description: "What guests say about Starlight Cottage and Black Hill Barn at Upper House & Spa.",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();
  return (
    <>
      <PageHero photo={photos.barnInterior} position="50% 50%" mobilePosition="50% 50%" title="In our guests’ words.">
        Discover the reviews our guests post.
      </PageHero>
      <section className="pb-20 pt-16 sm:pt-24">
        <ReviewsGrid reviews={reviews} />
      </section>
    </>
  );
}
