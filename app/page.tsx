import AnimeSection from "@/components/AnimeSection";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import { getAnimeList, getFeaturedAnime } from "@/lib/getAnime";

export default async function HomePage() {
  const [featured, allAnime] = await Promise.all([
    getFeaturedAnime()?.catch(() => []),
    getAnimeList()?.catch(() => []),
  ]);
  const heroAnime = featured?.length ? featured : allAnime?.slice(0, 5);

  return (
    <main>
      <Hero anime={heroAnime} />
      <StatsBar totalAnime={allAnime?.length} />
      <AnimeSection title="Featured" anime={featured} layout="scroll" viewAllHref="/browse" />
      <AnimeSection title="All anime" anime={allAnime} layout="grid" viewAllHref="/browse" />
    </main>
  );
}
