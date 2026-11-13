import { photos } from "./photos";

export const site = {
  name: "Upper House & Spa",
  tagline: "Tranquillity on a unique country estate",
  description:
    "Two luxury converted barns and a private sauna and spa, high on Black Hill in Craswall near Hay-on-Wye, on the Herefordshire and Wales border.",
  address: ["Upper House & Spa", "Craswall", "Herefordshire", "HR2 0PN"],
  phone: "07871 766500",
  phoneHref: "tel:+447871766500",
  email: "reservations@upperhouseandspa.co.uk",
  what3words: "rigs.bumps.pothole",
  /** From the original site's geo metadata (Craswall, HR2 0PN). */
  coords: { lat: 52.013271, lng: -3.041781 },
  host: "Marnie Black",
};

export const nav = [
  { label: "Cottages", href: "/cottages", children: [
    { label: "Starlight Cottage", href: "/cottages/starlight-cottage", note: "Sleeps 2 · romantic retreat", photo: photos.bedroom },
    { label: "Black Hill Barn", href: "/cottages/black-hill-barn", note: "Sleeps 4 · family barn", photo: photos.barnExterior },
  ] },
  { label: "Experience", href: "/experience" },
  { label: "Spa", href: "/spa" },
  { label: "Reviews", href: "/reviews" },
  { label: "Location", href: "/location" },
  { label: "Contact", href: "/contact" },
] as const;
