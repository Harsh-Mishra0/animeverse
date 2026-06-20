import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionRenderer from "@/components/SectionRenderer";
import { getPageBySlug } from "@/lib/getPage";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home")?.catch(() => null);
  return {
    title: page?.seoTitle ?? page?.title ?? "Home - AnimeVerse",
    description: page?.seoDescription ?? "Explore our premium anime database",
  };
}

export default async function HomePage() {
  const page = await getPageBySlug("home")?.catch(() => null);

  if (!page) notFound();

  return (
    <main>
      <SectionRenderer sections={page?.content} />
    </main>
  );
}
