import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimeDetailClient from "@/components/shared/AnimeDetailClient";
import AnimeSection from "@/components/sections/AnimeSection";
import { getImageUrl } from "@/lib/api";
import { getAnimeByGenre, getAnimeBySlug } from "@/lib/getAnime";

type Props = {
  params: Promise<{ slug?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const anime = await getAnimeBySlug(slug)?.catch(() => null);

  return {
    title: anime?.title ? `${anime.title} - AnimeVerse` : "Anime - AnimeVerse",
    description: anime?.description || `Watch and browse details for ${anime?.title || "anime"}.`,
  };
}

export default async function AnimePage({ params }: Props) {
  const { slug } = await params;
  const anime = await getAnimeBySlug(slug)?.catch(() => null);
  if (!anime) notFound();

  const related = await getAnimeByGenre(anime?.genre?.slug, anime?.documentId)?.catch(() => []);
  const bannerUrl = getImageUrl(anime?.bannerImage);

  return (
    <main className="min-h-screen">
      <section className="relative h-[54vh] min-h-96 overflow-hidden bg-white/5">
        {bannerUrl ? <Image src={bannerUrl} alt={anime?.bannerImage?.alternativeText ?? anime?.title ?? ""} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/20 to-black/30" />
        <Link href="/browse" className="absolute left-5 top-7 rounded-full bg-black/50 px-4 py-2 text-sm text-white/80 backdrop-blur hover:text-white lg:left-8">Back to browse</Link>
      </section>
      <AnimeDetailClient anime={anime} />
      <AnimeSection title="Related anime" anime={related} layout="scroll" />
    </main>
  );
}
