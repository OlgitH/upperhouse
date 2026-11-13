import Link from "next/link";
import { getCottages, getReviews, photos, site } from "@/content";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SplashImage } from "@/components/SplashImage";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export default async function Home() {
  const [cottages, reviews] = await Promise.all([getCottages(), getReviews()]);
  const featured = reviews.find((r) => r.ratings && r.property === "Black Hill Barn") ?? reviews[0];

  return (
    <>
      <PageHero
        photo={photos.blackHill}
        position="50% 8%"
        mobilePosition="50% 8%"
        title="A tranquil mountainside retreat"
        tall
        actions={
          <>
            <ButtonLink href="/cottages">Book now</ButtonLink>
            <ButtonLink href="/spa" variant="light">The spa</ButtonLink>
          </>
        }
      >
        Two luxury converted barns in the heart of rugged Welsh countryside, a private sauna and spa, and 70 acres of your own hillside.
      </PageHero>

      {/* Intro */}
      <section className="py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase leading-tight tracking-[0.06em] text-brand-900 sm:text-4xl">
              {site.tagline}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/85">
              <p>
                Arriving at Upper House &amp; Spa, the spirit of the place transports you into a different
                world, where the past meets the present. The views are breathtaking. You immediately feel
                a sense of calm.
              </p>
              <p>
                High on Black Hill, the landmark that forms the border between Wales and Herefordshire, it
                is a retreat to escape from it all in style and comfort: contemporary interiors set in
                traditional stone barns, with ancient springs, old drovers’ roads and even a Bronze Age
                tumulus across our 70 acres.
              </p>
              <p>
                With Dark Sky status overhead, the Black Mountains and Offa’s Dyke Path underfoot, and Hay-on-Wye
                twenty minutes away, you can unwind in total peace. Well behaved dogs are welcome too.
              </p>
            </div>
            <ButtonLink href="/experience" variant="blue" className="mt-10">Discover the area</ButtonLink>
          </div>
          <Photo photo={photos.barnExterior} sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5]" />
        </Container>
      </section>

      <SplashImage photo={photos.patioView} />

      {/* Cottages */}
      <section className="bg-brand-700 py-24 text-white">
        <Container>
          <Eyebrow className="text-sand">Where you’ll stay</Eyebrow>
          <h2 className="mb-14 max-w-2xl font-display text-2xl font-semibold sm:text-4xl">Two barns, two very different breaks.</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {cottages.map((c) => (
              <Link key={c.slug} href={`/cottages/${c.slug}`} className="group overflow-hidden rounded-3xl bg-brand-900 transition-colors hover:bg-brand-800">
                <Photo photo={c.hero} sizes="(min-width:768px) 50vw, 100vw" className="aspect-[4/3]" />
                <div className="p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-sand">
                    Sleeps {c.sleeps} (+{c.sleepsExtra}) · {c.audience}
                  </p>
                  <h3 className="mt-3 font-display uppercase tracking-[0.06em] text-2xl font-semibold">{c.name}</h3>
                  <p className="mt-3 text-base text-brand-100">{c.strapline}</p>
                  <span className="mt-6 inline-block rounded-full bg-sand px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink group-hover:bg-white">
                    View &amp; check dates →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Spa */}
      <section className="grid lg:grid-cols-2">
        <Photo photo={photos.spa} sizes="(min-width:1024px) 50vw, 100vw" className="min-h-[420px]" />
        <div className="flex flex-col justify-center bg-sand p-10 text-ink sm:p-16">
          <Eyebrow>Sauna &amp; spa</Eyebrow>
          <h2 className="font-display text-2xl font-semibold leading-tight sm:text-4xl">Slow down. Steam. Look out at the hills.</h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed">
            A custom-built Finnish sauna for up to four, a lounger room with floor-to-ceiling valley views,
            and local therapists for massage, reflexology and reiki.
          </p>
          <ButtonLink href="/spa" variant="blue" className="mt-8 self-start">See the spa</ButtonLink>
        </div>
      </section>

      <SplashImage photo={photos.sunsetSnow} />

      {/* Quote */}
      {featured && (
        <section className="bg-cream py-24">
          <Container className="max-w-4xl text-center">
            <p className="font-medium text-2xl italic leading-snug text-brand-900 sm:text-3xl">“{featured.quote}”</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-brand-700">
              Guest at {featured.property}, {featured.date}
            </p>
            <ButtonLink href="/reviews" variant="blue" className="mt-10">Read all reviews</ButtonLink>
          </Container>
        </section>
      )}

      {/* Experience strip */}
      <section className="grid md:grid-cols-3">
        {[
          { t: "Walk", d: "Black Mountains & Offa’s Dyke from the door", p: photos.cabinView },
          { t: "Stargaze", d: "International Dark Sky skies", p: photos.blackHill },
          { t: "Explore", d: "Hay-on-Wye, Abergavenny & the Marches", p: photos.barnInterior },
        ].map((x) => (
          <Link key={x.t} href="/experience" className="group relative block">
            <Photo photo={x.p} sizes="(min-width:768px) 33vw, 100vw" className="aspect-square md:aspect-[4/5]" />
            <div className="absolute inset-x-0 bottom-0 bg-brand-900 p-6 text-white transition-colors group-hover:bg-accent group-hover:text-white">
              <p className="font-display uppercase tracking-[0.06em] text-xl font-semibold">{x.t}</p>
              <p className="mt-1 text-sm opacity-80">{x.d}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
