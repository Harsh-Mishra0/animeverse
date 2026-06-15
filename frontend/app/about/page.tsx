import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicPage from "@/components/DynamicPage";
import { getAnimeList } from "@/lib/getAnime";
import { getPageBySlug } from "@/lib/getPage";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about")?.catch(() => null);
  return { title: page?.seoTitle ?? page?.title, description: page?.seoDescription };
}

export default async function AboutPage() {
  const [page, anime] = await Promise.all([
    getPageBySlug("about")?.catch(() => null),
    getAnimeList()?.catch(() => []),
  ]);
  if (!page) notFound();
  return <main><DynamicPage sections={page?.content} anime={anime} /></main>;
}
