import Link from "next/link";
import type { Anime } from "@/lib/api";
import AnimeCard from "./AnimeCard";

export default function AnimeSection({ title, subtitle, anime, viewAllHref, layout = "grid" }: {
  title?: string;
  subtitle?: string;
  anime?: Anime[];
  viewAllHref?: string;
  layout?: "grid" | "scroll";
}) {
  if (!anime?.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          {title ? <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h2> : null}
          {subtitle ? <p className="mt-2 text-sm text-white/50">{subtitle}</p> : null}
        </div>
        {viewAllHref ? <Link href={viewAllHref} className="shrink-0 text-sm font-semibold text-fuchsia-300 hover:text-fuchsia-200">View all</Link> : null}
      </div>
      <div className={layout === "scroll" ? "flex snap-x gap-4 overflow-x-auto pb-5 [scrollbar-width:thin]" : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"}>
        {anime?.map((item, index) => <AnimeCard key={item?.documentId ?? item?.id ?? `${item?.slug}-${index}`} anime={item} />)}
      </div>
    </section>
  );
}
