import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBookedRanges, getCottage, getCottages, getReviews } from "@/content";
import { BookingPanel } from "@/components/BookingPanel";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SplashImage } from "@/components/SplashImage";
import { RatesTable } from "@/components/RatesTable";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export async function generateStaticParams() {
  return (await getCottages()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cottages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCottage(slug);
  return c ? { title: c.name, description: c.strapline } : {};
}

export default async function CottagePage({ params }: PageProps<"/cottages/[slug]">) {
  const { slug } = await params;
  const cottage = await getCottage(slug);
  if (!cottage) notFound();

  const [booked, reviews, all] = await Promise.all([
    getBookedRanges(cottage.slug),
    getReviews(cottage.name),
    getCottages(),
  ]);
  const other = all.find((c) => c.slug !== cottage.slug)!;
  const [a, b, c] = cottage.gallery;
  const [band, band2] = cottage.splash;

  return (
    <>
      <PageHero photo={cottage.hero} position={cottage.heroPosition} mobilePosition={cottage.heroMobilePosition} title={cottage.name} tall />

      {/* Facts + jump links */}
      <section className="bg-sand text-ink">
        <Container className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-6">
          <dl className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              ["Sleeps", `${cottage.sleeps} (+${cottage.sleepsExtra} by arrangement)`],
              ["Bedrooms", cottage.bedrooms],
              ["Bathrooms", cottage.bathrooms],
              ["Dogs", "1 welcome"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-70">{k}</dt>
                <dd className="font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-3">
            <a href="#book" className="rounded-full bg-brand-700 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-white hover:text-ink">Availability</a>
            <a href="#rates" className="rounded-full bg-brand-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-white hover:text-ink">Rates</a>
          </div>
        </Container>
      </section>

      {/* Story + gallery */}
      <section className="py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5 text-base leading-relaxed text-ink/85">
            <p className="font-display text-balance text-2xl font-bold leading-[1.5] text-brand-900 sm:text-3xl sm:leading-[1.5]">{cottage.strapline}</p>
            {cottage.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Photo photo={a} sizes="(min-width:1024px) 30vw, 100vw" className="col-span-2 aspect-[16/10]" />
            <Photo photo={b} sizes="(min-width:1024px) 15vw, 50vw" className="aspect-square" />
            <Photo photo={c} sizes="(min-width:1024px) 15vw, 50vw" className="aspect-square" />
          </div>
        </Container>
      </section>

      {/* Details: boxes in three columns; dog friendly is plain typography, beside a lone last box or below a full row */}
      <section className="pb-24">
        <Container>
          {(() => {
            const boxes = [
              ...cottage.layout,
              { title: "Facilities", items: cottage.facilities },
              { title: "Outdoor living", items: cottage.outdoor },
            ];
            const lone = boxes.length % 3 === 1;
            const dogs = (
              <div className={lone ? "p-8 sm:p-10 lg:col-span-2" : "mt-20 max-w-3xl"}>
                <h3 className="mb-6 font-display text-xl font-semibold uppercase tracking-[0.06em] text-brand-900">Dog friendly</h3>
                <ul className="space-y-4 font-display text-lg font-bold leading-snug text-ink">
                  {cottage.dogs.map((it) => (
                    <li key={it} className="flex gap-3"><span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-brand-700" />{it}</li>
                  ))}
                </ul>
              </div>
            );
            return (
              <>
                <div className="grid gap-4 lg:grid-cols-3">
                  {boxes.map((blk, i) => {
                    const dark = i % 3 === 0;
                    return (
                      <div key={blk.title} className={`rounded-3xl p-8 sm:p-10 ${dark ? "bg-brand-700 text-white" : i % 3 === 1 ? "bg-sand text-ink" : "bg-brand-100 text-ink"}`}>
                        <h3 className="mb-6 font-display text-xl font-semibold uppercase tracking-[0.06em]">{blk.title}</h3>
                        <ul className="space-y-4 font-display text-lg font-bold leading-snug">
                          {blk.items.map((it) => (
                            <li key={it} className="flex gap-3"><span className={`mt-[9px] h-2 w-2 shrink-0 rounded-full ${dark ? "bg-accent" : "bg-brand-700"}`} />{it}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  {lone && dogs}
                </div>
                {!lone && dogs}
              </>
            );
          })()}
        </Container>
      </section>

      {cottage.slug === "black-hill-barn" && (
        <section className="pb-24">
          <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow className="text-accent">Floor plan</Eyebrow>
              <h2 className="font-display text-2xl font-semibold text-brand-900 sm:text-3xl">Find your way around the barn.</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/85">
                A light, open kitchen and reception room sits at the heart of the barn, with bedrooms and bathrooms either side and a short flight of stairs down to the lower ground floor.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/black-hill-barn-floorplan.svg" alt="Black Hill Barn floor plan, showing the ground floor and lower ground floor" className="mx-auto h-auto w-full max-w-xl" />
          </Container>
        </section>
      )}

      <SplashImage photo={band} />

      {/* Availability + enquiry (no prices) */}
      <BookingPanel cottage={cottage} booked={booked} />

      {/* Rates (separate from availability) */}
      <RatesTable cottage={cottage} />

      {band2 && <SplashImage photo={band2} />}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-24">
          <Container>
            <Eyebrow className="text-accent">Guest reviews</Eyebrow>
            <h2 className="mb-12 font-display text-2xl font-semibold text-brand-900">What guests say about {cottage.name}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.slice(0, 3).map((r) => (
                <figure key={r.date + r.quote.slice(0, 10)} className="rounded-3xl bg-white p-8">
                  <blockquote className="font-display text-xl font-normal leading-[1.55]">“{r.quote}”</blockquote>
                  <figcaption className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-700">{r.date}</figcaption>
                </figure>
              ))}
            </div>
            <ButtonLink href="/reviews" variant="blue" className="mt-10">All reviews</ButtonLink>
          </Container>
        </section>
      )}

      {/* Cross-sell */}
      <section className="bg-brand-900 py-16 text-white">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-display text-xl font-semibold">Looking for something {other.sleeps > cottage.sleeps ? "bigger" : "more intimate"}?</p>
          <ButtonLink href={`/cottages/${other.slug}`}>See {other.name}</ButtonLink>
        </Container>
      </section>
    </>
  );
}
