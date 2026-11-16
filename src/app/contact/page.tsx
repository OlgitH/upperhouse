import type { Metadata } from "next";
import { getCottages, photos, site } from "@/content";
import { ButtonLink, Container } from "@/components/ui";
import { LocationMap } from "@/components/LocationMap";
import { PageHero } from "@/components/PageHero";
import { SplashImage } from "@/components/SplashImage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Upper House & Spa in Craswall, Herefordshire, to reserve a cottage, the sauna or a treatment.",
};

export default async function ContactPage() {
  const cottages = await getCottages();
  return (
    <>
      <PageHero
        photo={photos.cabinView}
        position="50% 50%"
        mobilePosition="50% 50%"
        title="We’d love to hear from you."
        aside={
          <div className="space-y-8 text-brand-900">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Phone</p>
              <a href={site.phoneHref} className="mt-2 block font-display text-2xl font-semibold hover:text-accent">{site.phone}</a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Email</p>
              <a href={`mailto:${site.email}`} className="mt-2 block whitespace-nowrap font-display text-[clamp(0.8rem,3.6vw,1.25rem)] font-bold hover:text-accent">{site.email}</a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Address</p>
              <address className="mt-2 not-italic leading-relaxed">{site.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">what3words</p>
              <a
                href={`https://what3words.com/${site.what3words}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block font-display text-xl font-bold hover:text-accent"
              >
                {"///"}{site.what3words}
              </a>
            </div>
          </div>
        }
      >
        All the details you need to reach us, and a quick way in to check dates.
      </PageHero>
      <section className="pb-16">
        <Container>
          <LocationMap />
        </Container>
      </section>
      <section className="pb-20">
        <Container>
          <div className="rounded-3xl bg-sand p-10">
            <h2 className="font-display text-xl font-semibold">Ready to book? Choose your cottage.</h2>
            <p className="mt-2 max-w-2xl">Each cottage has its own live availability calendar and enquiry form.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {cottages.map((c) => (
                <ButtonLink key={c.slug} href={`/cottages/${c.slug}#book`} variant="slate">{c.name}</ButtonLink>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SplashImage photo={photos.valleyHeather} position="50% 50%" mobilePosition="50% 50%" />
    </>
  );
}
