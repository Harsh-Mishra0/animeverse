import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionRenderer from "@/components/SectionRenderer";
import { getPageBySlug } from "@/lib/getPage";

type Props = {
  params: Promise<{ slug?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug)?.catch(() => null);

  return {
    title: page?.seoTitle ?? page?.title ?? undefined,
    description: page?.seoDescription ?? undefined,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  return (
    <main>
      <SectionRenderer sections={page?.content} />
    </main>
  );
}
