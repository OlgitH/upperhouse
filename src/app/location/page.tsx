import type { Metadata } from "next";
import { photos, site } from "@/content";
import { PageHero } from "@/components/PageHero";
import { SplashImage } from "@/components/SplashImage";
import { NamedIcon } from "@/components/ListIcon";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Location & directions",
  description: "Find Upper House & Spa in Craswall, HR2 0PN: directions from London, Hay-on-Wye and Abergavenny station.",
};

export default function LocationPage() {
  return (
    <>
      <PageHero photo={photos.blackHill} position="50% 0%" mobilePosition="50% 0%" title="How to find us." />
      <section className="bg-sand-light py-20">
        <Container className="grid gap-4 lg:grid-cols-3">
          <p className="mb-8 max-w-4xl text-balance font-display text-2xl font-bold leading-[1.5] text-brand-900 sm:text-3xl sm:leading-[1.5] lg:col-span-3">
            Located on Black Hill in Craswall, where Herefordshire meets Wales. Hay-on-Wye is 20 minutes away.
          </p>
          <div className="rounded-3xl bg-white p-10 text-ink">
            <NamedIcon name="pin" className="mb-4 h-8 w-8" />
            <Eyebrow className="text-accent">Sat nav</Eyebrow>
            <p className="font-display text-3xl font-semibold">HR2 0PN</p>
            <p className="mt-2 text-ink/80">The address is “Hill Road”.</p>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-accent">what3words</p>
            <p className="text-xl font-semibold">{"///"}{site.what3words}</p>
            <address className="mt-8 not-italic text-ink/80">{site.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
          </div>
          <div className="rounded-3xl bg-white p-10 lg:col-span-2">
            <h2 className="flex items-center gap-3 font-display uppercase tracking-[0.005em] text-xl font-semibold text-brand-900"><NamedIcon name="car" className="h-7 w-7 shrink-0" />Driving from London (3½ hours)</h2>
            <p className="mt-4 text-[1.125rem] leading-relaxed">Take the M4 west to Newport (junction 24). At the roundabout, pass under the M4 and take the A449 towards the Midlands and Monmouth. Exit towards Raglan and Abergavenny onto the A40. At the double roundabout on the outskirts of Abergavenny, follow the A465 towards Hereford. After approximately 6 miles, turn left at the Old Pandy Inn, signposted “Longtown”. Continue along the Monnow Valley. In Longtown take the left lane at the fork. After several miles you enter Craswall, the longest village in England. After White Haywood Farm, look for the sign and left turn to Upper House &amp; Spa.</p>
            <h2 className="mt-10 flex items-center gap-3 font-display uppercase tracking-[0.005em] text-xl font-semibold text-brand-900"><NamedIcon name="car" className="h-7 w-7 shrink-0" />From Hay-on-Wye (20 minutes)</h2>
            <p className="mt-4 text-[1.125rem] leading-relaxed">Go up Forest Road towards Capel-y-Ffin. At the Y-junction turn left towards Craswall. Once you pass the Bull’s Head pub you will find Hill Road, a right turn and dead-end lane, after about a mile. Follow the signs.</p>
          </div>
          <div className="rounded-3xl bg-white p-10 text-ink lg:col-span-3">
            <h2 className="flex items-center gap-3 font-display uppercase tracking-[0.005em] text-xl font-semibold"><NamedIcon name="train" className="h-7 w-7 shrink-0" />By train</h2>
            <p className="mt-3 max-w-2xl text-ink/80">The nearest station is Abergavenny, Wales, 30 minutes by car. We can organise a taxi transfer (about £30).</p>
          </div>
        </Container>
      </section>
      <SplashImage photo={photos.craswallSign} />

    </>
  );
}
