"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, type Anime } from "@/lib/api";
import type { PageSection } from "@/lib/getPage";
import AnimeSection from "@/components/AnimeSection";
import MissionVision from "@/components/MissionVision";
import RichText from "@/components/RichText";

export default function DynamicPage({ sections, anime }: { sections?: PageSection[]; anime?: Anime[] }) {
  return (
    <>
      {sections?.map((section, index) => {
        const key = `${section?.__component ?? "section"}-${section?.id ?? "new"}-${index}`;

        if (section?.__component === "sections.hero") {
          const imageUrl = getStrapiMedia(section?.image);
          return (
            <section key={key} className="relative flex min-h-[58vh] items-end overflow-hidden px-5 py-16 lg:px-8">
              {imageUrl ? <Image src={imageUrl} alt={section?.image?.alternativeText ?? section?.title ?? ""} fill priority={index === 0} sizes="100vw" className="object-cover" /> : null}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b] via-[#0b0b0b]/70 to-transparent" />
              <div className="relative mx-auto w-full max-w-7xl">
                {section?.title ? <h1 className="max-w-3xl text-5xl font-black sm:text-6xl">{section?.title}</h1> : null}
                {section?.subtitle ? <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">{section?.subtitle}</p> : null}
              </div>
            </section>
          );
        }

        if (section?.__component === "sections.about-section") {
          const imageUrl = getStrapiMedia(section?.image);
          return (
            <section
              key={key}
              className="relative flex min-h-[calc(100vh-5rem)] w-full items-center overflow-hidden bg-[#0b0b0b] px-6 py-20 lg:px-20"
            >
              {imageUrl ? (
                <motion.div
                  initial={{ opacity: 0, scale: 1.08 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={imageUrl}
                    alt={section?.image?.alternativeText ?? section?.title ?? ""}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
              ) : null}

              <div className="absolute inset-0 bg-black/65" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/30" />

              <motion.div
                initial={{ opacity: 0, x: -50, y: 18 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="relative z-10 -translate-y-6 max-w-3xl lg:-translate-y-10"
              >
                {section?.title ? (
                  <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                    {section?.title}
                  </h1>
                ) : null}
                {section?.description ? (
                  <div className="mt-7 max-w-2xl text-base text-white/80 drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)] sm:text-lg">
                    <RichText content={section?.description} />
                  </div>
                ) : null}
              </motion.div>
            </section>
          );
        }

        if (section?.__component === "sections.mission-vision") {
          return (
            <MissionVision
              key={key}
              missionTitle={section?.missionTitle}
              missionText={section?.missionText}
              visionTitle={section?.visionTitle}
              visionText={section?.visionText}
            />
          );
        }

        if (section?.__component === "sections.cta-section") {
          return (
            <section key={key} className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
              <div className="rounded-3xl bg-gradient-to-br from-fuchsia-800 to-violet-950 p-8 text-center sm:p-12">
                {section?.title ? <h2 className="text-3xl font-black sm:text-4xl">{section?.title}</h2> : null}
                {section?.subtitle ? <p className="mx-auto mt-4 max-w-2xl text-white/70">{section?.subtitle}</p> : null}
                {section?.buttonText && section?.buttonLink ? <Link href={section?.buttonLink} className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-105">{section?.buttonText}</Link> : null}
              </div>
            </section>
          );
        }

        if (section?.__component === "sections.anime-section") {
          const selectedAnime = section?.showFeaturedOnly ? anime?.filter((item) => item?.featured) : anime;
          return <AnimeSection key={key} title={section?.title} anime={selectedAnime} layout="grid" />;
        }

        return null;
      })}
    </>
  );
}
