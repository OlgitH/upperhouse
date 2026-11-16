import { Fragment } from "react";
import type { Metadata } from "next";
import { getExperiences, photos } from "@/content";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SplashImage } from "@/components/SplashImage";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experience",
  description: "Stargazing, walking, cycling and the Marches: adventures on the doorstep of Upper House & Spa.",
};

export default async function ExperiencePage() {
  const items = await getExperiences();
  return (
    <>
      <PageHero photo={photos.cabinView} position="50% 50%" mobilePosition="50% 50%" title="The great outdoors, at your feet." />
      <section className="pb-8 pt-16 sm:pb-10 sm:pt-24">
        <Container>
          <p className="max-w-4xl text-balance font-display text-2xl font-bold leading-[1.5] text-brand-900 sm:text-3xl sm:leading-[1.5]">
            Stargazing, walking, mountain biking, kayaking and canoeing, to name but a few. The Black Mountains and Brecon Beacons lie right on the doorstep.
          </p>
        </Container>
      </section>
      {items.map((x, i) => (
        <Fragment key={x.id}>
          <section className={`${i === items.length - 1 ? "pb-20" : ""}`}>
            <Container>
              <article id={x.id} className={`grid overflow-hidden lg:grid-cols-2 ${i === 0 ? "rounded-t-3xl" : ""} ${i === items.length - 1 ? "rounded-b-3xl" : ""}`}>
                <Photo photo={x.photo} sizes="(min-width:1024px) 50vw, 100vw" className={`min-h-[340px] ${i % 2 ? "lg:order-2" : ""}`} />
                <div className={`flex flex-col justify-center p-8 sm:p-14 ${["bg-brand-500 text-white", "bg-sand", "bg-brand-500 text-white", "bg-brand-100"][i % 4]}`}>
                  <p className={`mb-3 text-base italic ${i % 4 === 1 || i % 4 === 3 ? "text-accent" : "text-sand"}`}>{x.summary}</p>
                  <h2 className="font-display uppercase tracking-[0.005em] text-2xl font-semibold">{x.title}</h2>
                  <p className="mt-5 max-w-xl text-[1.125rem] leading-relaxed opacity-90">{x.body}</p>
                </div>
              </article>
            </Container>
          </section>
        </Fragment>
      ))}

      {/* Full-bleed green landscape (mountain bike on the heather), straight above the footer */}
      <SplashImage photo={photos.bikeHeather} position="40% 80%" mobilePosition="15% 80%" />
    </>
  );
}
