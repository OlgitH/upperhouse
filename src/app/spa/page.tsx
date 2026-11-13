import type { Metadata } from "next";
import { photos, site } from "@/content";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SplashImage } from "@/components/SplashImage";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sauna & spa",
  description: "A custom-built Finnish sauna, relaxation studio and local therapists overlooking the Monnow Valley.",
};

export default function SpaPage() {
  return (
    <>
      <PageHero photo={photos.spa} position="50% 55%" mobilePosition="50% 55%" title="Sauna, treatments & studio." tall>
        A chic, contemporary space overlooking the Monnow Valley to help you unwind, relax and revive.
      </PageHero>

      <section className="py-24">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div className="space-y-5 text-base leading-relaxed text-ink/85">
            <Eyebrow className="text-accent">The spa</Eyebrow>
            <p>The sauna is in our studio building, a small peaceful multi-purpose space which you are welcome to use to relax, for your own movement exercises or for a personalised movement or pilates session.</p>
            <p>Our Finnish sauna has been custom built and accommodates up to four people. After your sauna, rest in a lounger facing the beautiful Monnow Valley. In summer, enjoy the large wooden deck with 360 degree views of the rolling Herefordshire hills and Black Mountains.</p>
            <p>The studio is a shared space for guests of both Starlight Cottage and Black Hill Barn, with showering and rest room facilities as well as loungers.</p>
          </div>
          <Photo photo={photos.spa} sizes="(min-width:1024px) 50vw, 100vw" className="min-h-[360px]" />
        </Container>
      </section>

      <section className="pb-24">
        <Container className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-brand-700 p-10 text-white">
            <h2 className="font-display uppercase tracking-[0.06em] text-xl font-semibold">Sauna</h2>
            <p className="mt-2 text-brand-100">Open by appointment only.</p>
            <dl className="mt-8 space-y-6">
              <div><dt className="text-xs font-bold uppercase tracking-[0.2em] text-sand">Couple · 2 hours</dt><dd className="font-display text-3xl font-semibold">£70</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-[0.2em] text-sand">Up to 4 guests · 2 hours</dt><dd className="font-display text-3xl font-semibold">£100</dd></div>
            </dl>
            <p className="mt-6 text-sm text-brand-100">Includes towels, slippers, Nespresso coffee, tea and snacks.</p>
          </div>
          <div className="rounded-3xl bg-brand-900 p-10 text-white">
            <h2 className="font-display uppercase tracking-[0.06em] text-xl font-semibold">Treatments</h2>
            <p className="mt-5 leading-relaxed text-brand-100">Kelly Watkins is our local holistic therapist, offering reflexology, facial reflexology, a wide range of massages and reiki, alone or combined, including group bookings.</p>
            <p className="mt-4 leading-relaxed text-brand-100">Contact us and we’ll put you in touch so you can discuss your requirements. We reserve the studio for your treatment.</p>
          </div>
          <div className="rounded-3xl bg-sand p-10 text-ink">
            <h2 className="font-display uppercase tracking-[0.06em] text-xl font-semibold">Movement &amp; pilates</h2>
            <p className="mt-5 leading-relaxed">Jill Hollingsworth offers ballet and movement sessions including pilates. She trained in classical ballet with the Royal Ballet School and has taught dance and choreography.</p>
            <p className="mt-4 leading-relaxed">Get in touch for a personalised session.</p>
          </div>
        </Container>
      </section>

      {/* Two full-bleed photographs */}
      <SplashImage photo={photos.spaTerrace} />
      <SplashImage photo={photos.spaSauna} position="50% 88%" mobilePosition="40% 88%" className="mt-2" />

      {/* Booking banner, last thing before the footer */}
      <section className="bg-sand py-16 text-brand-900">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-display text-xl font-semibold">To book the sauna or a treatment, just ask.</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="blue">Contact us</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="light">{site.phone}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
