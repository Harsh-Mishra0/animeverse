import Link from "next/link";
import type { Anime } from "@/lib/api";
import { getAnimeList, getFeaturedAnime } from "@/lib/getAnime";
import type { PageSection } from "@/lib/getPage";
import { bgClass, colClass, textClass } from "@/lib/styleMap";
import AnimeCard from "@/components/shared/AnimeCard";





export type AnimeSectionProps = {
  
  section?: PageSection;
  
  title?: string;
  subtitle?: string;
  anime?: Anime[];
  viewAllHref?: string;
  layout?: "grid" | "scroll";
};





async function resolveAnime(section?: PageSection): Promise<Anime[]> {
  if (!section) return [];

  const sectionType = section?.type;

  switch (sectionType) {
    case "featured":
      return getFeaturedAnime().catch(() => []);
    case "latest":
      return getAnimeList().catch(() => []);
    case "manual":
      return section?.animes ?? [];
    default:
      if (section?.showFeaturedOnly) {
        return getFeaturedAnime().catch(() => []);
      }
      return getAnimeList().catch(() => []);
  }
}





export default async function AnimeSection({
  section,
  title,
  subtitle,
  anime,
  viewAllHref,
  layout = "grid",
}: AnimeSectionProps) {
  
  const resolvedAnime = anime ?? (await resolveAnime(section));
  if (!resolvedAnime?.length) return null;

  
  const displayTitle = title ?? (section?.showTitle !== false ? section?.title : undefined);
  const displaySubtitle = subtitle;
  const columns = section?.columns;
  const bg = bgClass(section?.backgroundColor);
  const text = textClass(section?.textColor);

  
  const gridClasses = layout === "scroll"
    ? "flex snap-x gap-4 overflow-x-auto pb-5 [scrollbar-width:thin]"
    : `grid gap-4 ${colClass(columns)}`;

  return (
    <section className={`mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16 ${bg} ${text}`}>
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          {displayTitle ? (
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{displayTitle}</h2>
          ) : null}
          {displaySubtitle ? (
            <p className="mt-2 text-sm text-white/50">{displaySubtitle}</p>
          ) : null}
        </div>
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            className="shrink-0 text-sm font-semibold text-fuchsia-300 hover:text-fuchsia-200"
          >
            View all
          </Link>
        ) : null}
      </div>
      <div className={gridClasses}>
        {resolvedAnime.map((item, index) => (
          <AnimeCard
            key={item?.documentId ?? item?.id ?? `${item?.slug}-${index}`}
            anime={item}
          />
        ))}
      </div>
    </section>
  );
}
