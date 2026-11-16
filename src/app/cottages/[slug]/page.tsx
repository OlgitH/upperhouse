import { ListIcon } from "@/components/ListIcon";
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
          <div className="space-y-5 text-[1.125rem] leading-relaxed text-ink/85">
            <p className="font-display text-balance text-2xl font-bold leading-[1.5] text-brand-900 sm:text-3xl sm:leading-[1.5]">{cottage.strapline}</p>
            {cottage.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Photo photo={a} sizes="(min-width:1024px) 30vw, 100vw" className="col-span-2 aspect-[16/10] rounded-3xl" />
            <Photo photo={b} sizes="(min-width:1024px) 15vw, 50vw" className="aspect-square rounded-3xl" />
            <Photo photo={c} sizes="(min-width:1024px) 15vw, 50vw" className="aspect-square rounded-3xl" />
          </div>
        </Container>
      </section>

      {/* Details: sand band. Facilities sits first, in a rounded white panel; the other lists follow on the 12-column grid, three per row */}
      <section className="bg-sand-light py-20 text-ink">
        <Container>
          {(() => {
            const groups = [
              ...cottage.layout,
              { title: "Outdoor living", items: cottage.outdoor },
              { title: "Dog friendly", items: cottage.dogs },
            ];
            const list = "space-y-7 text-base font-normal leading-snug";
            const item = (it: string) => (
              <li key={it} className="flex gap-3"><ListIcon text={it} className="mt-px h-5 w-5 shrink-0" />{it}</li>
            );
            // A group left alone on its own row would sit under the tallest list above it. From lg up, tuck it under the
            // left-hand list instead; below lg it keeps its normal place at the end (the copy that isn't wanted is display:none).
            const lone = groups.length % 3 === 1 && groups.length > 1;
            const block = (blk: (typeof groups)[number]) => (
              <>
                <span aria-hidden className="mb-4 block h-1 w-4 bg-accent" />
                <h3 className="mb-6 font-display text-xl font-semibold uppercase tracking-[0.005em]">{blk.title}</h3>
                <ul className={list}>{blk.items.map(item)}</ul>
              </>
            );
            const tucked = lone ? groups[groups.length - 1] : undefined;
            return (
              <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
                <div className="relative z-10 -mt-28 rounded-3xl bg-white p-8 text-ink sm:p-12 lg:col-span-12">
                  <span aria-hidden className="mb-4 block h-1 w-4 bg-accent" />
                  <h3 className="mb-8 font-display text-xl font-semibold uppercase tracking-[0.005em] text-brand-900">Facilities</h3>
                  <ul className={`${list} lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-7 lg:space-y-0`}>
                    {cottage.facilities.map(item)}
                  </ul>
                </div>
                {groups.map((blk, i) => {
                  if (blk === tucked) return <div key={blk.title} className="lg:hidden">{block(blk)}</div>;
                  return (
                    <div key={blk.title} className="lg:col-span-4">
                      <div>{block(blk)}</div>
                      {i === 0 && tucked && <div className="mt-14 hidden lg:block">{block(tucked)}</div>}
                    </div>
                  );
                })}
              </div>
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
