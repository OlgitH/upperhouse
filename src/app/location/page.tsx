import type { Metadata } from "next";
import { photos, site } from "@/content";
import { PageHero } from "@/components/PageHero";
import { SplashImage } from "@/components/SplashImage";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Location & directions",
  description: "Find Upper House & Spa in Craswall, HR2 0PN: directions from London, Hay-on-Wye and Abergavenny station.",
};

export default function LocationPage() {
  return (
    <>
      <PageHero photo={photos.blackHill} position="50% 8%" mobilePosition="50% 8%" title="How to find us.">
        On Black Hill in Craswall, where Herefordshire meets Wales. Hay-on-Wye is 20 minutes away.
      </PageHero>
      <section className="pb-20 pt-16 sm:pt-24">
        <Container className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl bg-brand-700 p-10 text-white">
            <Eyebrow className="text-sand">Sat nav</Eyebrow>
            <p className="font-display text-3xl font-semibold">HR2 0PN</p>
            <p className="mt-2 text-brand-100">The address is “Hill Road”.</p>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-sand">what3words</p>
            <p className="text-xl font-semibold">{"///"}{site.what3words}</p>
            <address className="mt-8 not-italic text-brand-100">{site.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
          </div>
          <div className="rounded-3xl bg-brand-100 p-10 lg:col-span-2">
            <h2 className="font-display uppercase tracking-[0.06em] text-xl font-semibold text-brand-900">Driving from London (3½ hours)</h2>
            <p className="mt-4 leading-relaxed">Take the M4 west to Newport (junction 24). At the roundabout, pass under the M4 and take the A449 towards the Midlands and Monmouth. Exit towards Raglan and Abergavenny onto the A40. At the double roundabout on the outskirts of Abergavenny, follow the A465 towards Hereford. After approximately 6 miles, turn left at the Old Pandy Inn, signposted “Longtown”. Continue along the Monnow Valley. In Longtown take the left lane at the fork. After several miles you enter Craswall, the longest village in England. After White Haywood Farm, look for the sign and left turn to Upper House &amp; Spa.</p>
            <h2 className="mt-10 font-display uppercase tracking-[0.06em] text-xl font-semibold text-brand-900">From Hay-on-Wye (20 minutes)</h2>
            <p className="mt-4 leading-relaxed">Go up Forest Road towards Capel-y-Ffin. At the Y-junction turn left towards Craswall. Once you pass the Bull’s Head pub you will find Hill Road, a right turn and dead-end lane, after about a mile. Follow the signs.</p>
          </div>
          <div className="rounded-3xl bg-brand-900 p-10 text-white lg:col-span-3">
            <h2 className="font-display uppercase tracking-[0.06em] text-xl font-semibold">By train</h2>
            <p className="mt-3 max-w-2xl text-brand-100">The nearest station is Abergavenny, Wales, 30 minutes by car. We can organise a taxi transfer (about £30).</p>
          </div>
        </Container>
      </section>
      <SplashImage photo={photos.craswallSign} />

    </>
  );
}
