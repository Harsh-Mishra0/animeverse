"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getStrapiMedia, type Anime } from "@/lib/api";

const slideDuration = 6000;

export default function Hero({ anime }: { anime?: Anime[] }) {
  const slides = anime?.filter((item) => item?.bannerImage && item?.title) ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const changeSlide = useCallback(
    (nextIndex: number) => {
      if (!slides?.length) return;
      setDirection(nextIndex > activeIndex ? 1 : -1);
      setActiveIndex((nextIndex + slides?.length) % slides?.length);
    },
    [activeIndex, slides?.length],
  );

  useEffect(() => {
    if (isPaused || slides?.length < 2) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % slides?.length);
    }, slideDuration);

    return () => window.clearInterval(timer);
  }, [isPaused, slides?.length]);

  const safeActiveIndex = slides?.length ? activeIndex % slides?.length : 0;
  const activeAnime = slides?.[safeActiveIndex];
  const bannerUrl = getStrapiMedia(activeAnime?.bannerImage);

  if (!activeAnime) return null;

  return (
    <section
      className="relative h-[calc(100vh-5rem)] min-h-[640px] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <motion.div
          key={activeAnime?.documentId ?? activeAnime?.id ?? activeIndex}
          custom={direction}
          initial={{ opacity: 0, scale: 1.06, x: direction * 35 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 1.02, x: direction * -35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {bannerUrl ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: slideDuration / 1000, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={bannerUrl}
                alt={activeAnime?.bannerImage?.alternativeText ?? activeAnime?.title ?? ""}
                fill
                priority={safeActiveIndex === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#552070_0%,#171019_35%,#0b0b0b_70%)]" />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/40" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pb-24 pt-16 lg:px-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`content-${activeAnime?.documentId ?? activeAnime?.id ?? activeIndex}`}
            custom={direction}
            initial={{ opacity: 0, y: 36, x: direction * 18 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: direction * -18 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl space-y-4 drop-shadow-[0_12px_30px_rgba(0,0,0,0.75)]"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              {activeAnime?.releaseYear ? <span>{activeAnime?.releaseYear}</span> : null}
              {activeAnime?.genre?.name ? <span>{activeAnime?.genre?.name}</span> : null}
              {activeAnime?.rating ? <span>Rating {activeAnime?.rating}</span> : null}
            </div>
            {activeAnime?.title ? (
              <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                {activeAnime?.title}
              </h1>
            ) : null}
            {activeAnime?.description ? (
              <p className="line-clamp-3 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                {activeAnime?.description}
              </p>
            ) : null}
            {activeAnime?.slug ? (
              <Link
                href={`/anime/${activeAnime?.slug}`}
                className="inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-fuchsia-200 hover:shadow-fuchsia-500/20"
              >
                View details
              </Link>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {slides?.length > 1 ? (
        <div className="absolute bottom-6 left-5 right-5 z-20 mx-auto flex max-w-7xl items-center justify-between lg:px-3">
          <div className="flex gap-2" aria-label="Hero slides">
            {slides?.map((slide, index) => (
              <button
                key={slide?.documentId ?? slide?.id ?? index}
                type="button"
                aria-label={`Show ${slide?.title ?? `slide ${index + 1}`}`}
                aria-current={index === safeActiveIndex}
                onClick={() => changeSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === safeActiveIndex ? "w-10 bg-fuchsia-300" : "w-5 bg-white/35 hover:bg-white/65"}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => changeSlide(safeActiveIndex - 1)}
              className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => changeSlide(safeActiveIndex + 1)}
              className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
            >
              &rarr;
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
