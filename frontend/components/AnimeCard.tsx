"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, type Anime } from "@/lib/api";

export default function AnimeCard({ anime }: { anime?: Anime | null }) {
  const posterUrl = getStrapiMedia(anime?.image, "medium");
  if (!anime?.slug) return null;

  return (
    <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="group h-full min-w-44 sm:min-w-52">
      <Link href={`/anime/${anime?.slug}`} className="block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-fuchsia-400/40 hover:bg-white/[0.07]">
        <div className="relative aspect-[2/3] overflow-hidden bg-white/5">
          {posterUrl ? (
            <Image src={posterUrl} alt={anime?.image?.alternativeText ?? anime?.title ?? ""} fill sizes="(max-width: 640px) 45vw, 220px" className="object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 to-zinc-900" />
          )}
          {anime?.rating ? <span className="absolute right-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-xs font-bold text-amber-300 backdrop-blur">{anime?.rating}</span> : null}
        </div>
        <div className="p-4">
          {anime?.genre?.name ? <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-300">{anime?.genre?.name}</p> : null}
          {anime?.title ? <h3 className="mt-1 line-clamp-1 font-bold text-white">{anime?.title}</h3> : null}
          <p className="mt-2 flex gap-2 text-xs text-white/45">
            {anime?.releaseYear ? <span>{anime?.releaseYear}</span> : null}
            {anime?.episodes ? <span>{anime?.episodes} episodes</span> : null}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
