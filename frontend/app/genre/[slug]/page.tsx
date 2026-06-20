import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimeCard from "@/components/shared/AnimeCard";
import { getAnimeByGenre } from "@/lib/getAnime";

type Props = {
  params: Promise<{ slug?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return { title: "Genre Not Found" };

  const genreTitle = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${genreTitle} Anime - AnimeVerse`,
    description: `Browse all ${genreTitle.toLowerCase()} anime titles.`,
  };
}

export default async function GenrePage({ params }: Props) {
  const { slug } = await params;
  if (!slug) notFound();

  const animes = await getAnimeByGenre(slug).catch(() => []);

  
  const fallbackTitle = slug.charAt(0).toUpperCase() + slug.slice(1);

  if (animes.length === 0) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-4 py-12 md:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 border-b border-white/10 pb-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-white/90 to-fuchsia-400 bg-clip-text text-transparent">
              {fallbackTitle} Anime
            </h1>
            <p className="text-white/45 mt-2 text-sm md:text-base">
              Browse all {fallbackTitle.toLowerCase()} titles in our collection.
            </p>
          </header>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-white/60 text-lg md:text-xl">No anime found</p>
          </div>
        </div>
      </main>
    );
  }

  
  const matchedGenre = (animes[0] as any)?.genres?.find(
    (g: any) => g.slug?.toLowerCase() === slug.toLowerCase()
  );
  const displayName = matchedGenre?.name ?? fallbackTitle;

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-12 md:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-white/90 to-fuchsia-400 bg-clip-text text-transparent">
            {displayName} Anime
          </h1>
          <p className="text-white/45 mt-2 text-sm md:text-base">
            Browse all {displayName.toLowerCase()} titles in our collection.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {animes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </main>
  );
}
