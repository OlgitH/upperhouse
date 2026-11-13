import { site } from "@/content";

/** Keyless OpenStreetMap embed centred on the estate, plus links out to Google Maps and what3words. */
export function LocationMap({ className = "" }: { className?: string }) {
  const { lat, lng } = site.coords;
  const d = 0.03; // roughly 3km each side
  const bbox = [lng - d, lat - d / 2, lng + d, lat + d / 2].join("%2C");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className={className}>
      <iframe
        title={`Map showing ${site.name}, ${site.address.slice(1).join(", ")}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="block h-[380px] w-full bg-brand-100 sm:h-[460px]"
      />
      <p className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-accent"
        >
          Open in Google Maps →
        </a>
        <a
          href={`https://what3words.com/${site.what3words}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-accent"
        >
          Open in what3words →
        </a>
      </p>
    </div>
  );
}
