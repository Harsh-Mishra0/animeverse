import AnimeSection from "@/components/AnimeSection";
import { getAnimeByGenre, getAnimeList } from "@/lib/getAnime";

export default async function BrowsePage({ searchParams }: { searchParams: Promise<{ genre?: string }> }) {
  const { genre } = await searchParams;
  const anime = genre
    ? await getAnimeByGenre(genre)?.catch(() => [])
    : await getAnimeList()?.catch(() => []);

  return (
    <main className="min-h-[70vh] pt-10">
      <AnimeSection title={genre ? `Anime by genre` : "Browse anime"} anime={anime} layout="grid" />
    </main>
  );
}
