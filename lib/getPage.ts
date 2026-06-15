import { fetchAPI, type StrapiImage, type StrapiListResponse } from "./api";

export type RichTextNode = {
  type?: string;
  text?: string;
  children?: RichTextNode[];
};

export type PageSection = {
  id?: number;
  __component?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  description?: string | RichTextNode[];
  image?: StrapiImage | null;
  missionTitle?: string;
  missionText?: RichTextNode[];
  visionTitle?: string;
  visionText?: RichTextNode[];
  showFeaturedOnly?: boolean;
};

export type CmsPage = {
  id?: number;
  documentId?: string;
  title?: string;
  slug?: string;
  content?: PageSection[];
  seoTitle?: string;
  seoDescription?: string;
};

export async function getPageBySlug(slug?: string): Promise<CmsPage | null> {
  if (!slug) return null;

  const response = await fetchAPI<StrapiListResponse<CmsPage>>(
    `/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[content][on][sections.hero][populate][image]=true&populate[content][on][sections.about-section][populate][image]=true&populate[content][on][sections.mission-vision]=true&populate[content][on][sections.cta-section]=true&populate[content][on][sections.anime-section]=true`,
  );

  return response?.data?.[0] ?? null;
}
