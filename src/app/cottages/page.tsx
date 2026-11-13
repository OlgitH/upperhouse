import type { Metadata } from "next";
import Link from "next/link";
import { getCottages, photos } from "@/content";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Luxury holiday cottages",
  description: "Starlight Cottage (sleeps 2) and Black Hill Barn (sleeps 4): two converted stone barns on Black Hill, Craswall.",
};

export default async function CottagesPage() {
  const cottages = await getCottages();
  return (
    <>
      <PageHero photo={photos.barnExterior} position="50% 55%" mobilePosition="50% 55%" title="Two beautifully restored mountain barns.">
        Wood burners, wonderfully comfortable beds, designer furniture, original art and WiFi, with the sauna and spa a few steps away.
      </PageHero>
      <section className="pb-20 pt-16 sm:pt-24">
        <Container className="space-y-6">
          {cottages.map((c, i) => (
            <article key={c.slug} className={`grid overflow-hidden rounded-3xl lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Photo photo={c.hero} sizes="(min-width:1024px) 50vw, 100vw" className="min-h-[360px]" />
              <div className={`flex flex-col justify-center p-8 sm:p-14 bg-brand-700 text-white`}>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-sand">Sleeps {c.sleeps} (+{c.sleepsExtra} by arrangement)</p>
                <h2 className="mt-3 font-display uppercase tracking-[0.06em] text-3xl font-semibold">{c.name}</h2>
                <p className="mt-4 text-base text-brand-100">{c.strapline}</p>
                <p className="mt-4 text-sm text-brand-200">{c.bedrooms} · {c.bathrooms}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/cottages/${c.slug}`} className="rounded-full bg-sand px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink hover:bg-white">Explore</Link>
                  <Link href={`/cottages/${c.slug}#book`} className="rounded-full bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-900 hover:bg-accent hover:text-white">Check availability</Link>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
