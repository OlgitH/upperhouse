import type { ReactNode } from "react";
import type { Photo as PhotoT } from "@/content";
import { Photo } from "./Photo";
import { Container } from "./ui";

/** Full-bleed photograph with centred text sitting straight on it (flat light wash for legibility, no box). */
export function PageHero({
  photo, title, children, actions, aside, tall = false, position, mobilePosition,
}: {
  photo: PhotoT;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  /** Optional content to the right of the intro paragraph (the paragraph is then left-aligned). */
  aside?: ReactNode;
  tall?: boolean;
  /** Where the photo sits in the frame from md up, as a CSS object-position, e.g. "50% 30%" (x y; lower y pushes the image down). */
  position?: string;
  /** Same, below md. Defaults to `position`. */
  mobilePosition?: string;
}) {
  return (
    <>
      <section data-hero className={`relative flex items-center justify-center text-center text-white min-h-[78vh]`}>
      <div className="absolute inset-0">
        <Photo photo={photo} priority sizes="100vw" className="h-full w-full" position={position} mobilePosition={mobilePosition} />
      </div>
      <div aria-hidden className={`absolute inset-0 ${tall ? "bg-brand-950/15" : "bg-brand-950/35"}`} />
      <div aria-hidden className="header-fade pointer-events-none absolute inset-x-0 top-0 h-40 lg:h-48" />
      <Container className="relative pb-20 pt-36">
        <h1
          className={`font-display mx-auto max-w-5xl text-balance font-bold uppercase leading-[1.15] tracking-[0em] ${
            tall ? "text-2xl sm:text-4xl lg:text-5xl" : "text-3xl sm:text-4xl lg:text-5xl"
          }`}
        >
          {title}
        </h1>
        <span aria-hidden className="mx-auto mt-6 block h-1 w-14 bg-accent" />
        {actions && <div className="mt-10 flex flex-wrap justify-center gap-3">{actions}</div>}
      </Container>
      </section>

      {/* The hero's sub text lives in its own intro section, below the image */}
      {children && (
        <section className="pt-16 sm:pt-24">
          <Container className={aside ? "grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20" : "text-center"}>
            <p
              className={`font-display text-balance text-2xl font-bold leading-[1.6] text-brand-900 sm:text-3xl sm:leading-[1.6] ${
                aside ? "" : "mx-auto max-w-3xl"
              }`}
            >
              {children}
            </p>
            {aside}
          </Container>
        </section>
      )}
    </>
  );
}
