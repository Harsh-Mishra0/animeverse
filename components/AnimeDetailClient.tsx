"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Anime } from "@/lib/api";
import { getStrapiMedia } from "@/lib/api";

export default function AnimeDetailClient({ anime }: { anime?: Anime | null }) {
  const posterUrl = getStrapiMedia(anime?.image, "medium");
  if (!anime) return null;

  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mx-auto -mt-24 max-w-6xl px-5 pb-20 lg:px-8">
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-[#111]/90 p-5 shadow-2xl backdrop-blur-xl md:grid-cols-[240px_1fr] md:p-8">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-white/5">
          {posterUrl ? <Image src={posterUrl} alt={anime?.image?.alternativeText ?? anime?.title ?? ""} fill sizes="240px" className="object-cover" /> : null}
        </div>
        <div className="self-center">
          {anime?.genre?.name ? <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-300">{anime?.genre?.name}</p> : null}
          {anime?.title ? <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{anime?.title}</h1> : null}
          <div className="mt-5 flex flex-wrap gap-2 text-sm text-white/65">
            {anime?.rating ? <span className="rounded-full bg-amber-400/10 px-3 py-1.5 text-amber-300">Rating {anime?.rating}</span> : null}
            {anime?.episodes ? <span className="rounded-full bg-white/5 px-3 py-1.5">{anime?.episodes} episodes</span> : null}
            {anime?.releaseYear ? <span className="rounded-full bg-white/5 px-3 py-1.5">{anime?.releaseYear}</span> : null}
            {anime?.status ? <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-emerald-300">{anime?.status}</span> : null}
          </div>
          {anime?.description ? <p className="mt-7 max-w-3xl whitespace-pre-line leading-8 text-white/65">{anime?.description}</p> : null}
          {anime?.studio ? <p className="mt-6 text-sm text-white/45">Studio: <span className="text-white/75">{anime?.studio}</span></p> : null}
        </div>
      </div>
    </motion.section>
  );
}
