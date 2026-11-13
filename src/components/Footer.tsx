import Image from "next/image";
import { site } from "@/content";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2">
        <div>
          <Image src="/brand/logo.png" alt={site.name} width={600} height={137} className="h-16 w-auto" />
          <address className="mt-6 not-italic leading-relaxed text-brand-200">
            {site.address.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
        </div>
        <div>
          <p className="mb-4 text-base font-bold text-sand">Reservations</p>
          <p><a href={site.phoneHref} className="text-lg font-bold hover:bg-accent hover:text-white">{site.phone}</a></p>
          <p className="mt-2"><a href={`mailto:${site.email}`} className="break-all hover:bg-accent hover:text-white">{site.email}</a></p>
          <p className="mt-6 text-sm text-brand-200">Well behaved dogs welcome.</p>
        </div>
      </Container>
      <div className="bg-brand-800 py-5 text-center text-xs text-brand-200">
        © {site.name}. Craswall, Herefordshire.
      </div>
    </footer>
  );
}
