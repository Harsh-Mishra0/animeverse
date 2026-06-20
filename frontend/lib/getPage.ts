import { fetchAPI, type Anime, type StrapiImage, type StrapiListResponse } from "./api";





export type RichTextNode = {
  type?: string;
  text?: string;
  children?: RichTextNode[];
};





export type FormField = {
  id?: number;
  lable?: string;          
  name?: string;
  type?: "text" | "email" | "textarea" | "select" | "checkbox" | "radio" | "submit" | "dropdown";
  placeholder?: string;
  required?: boolean;
  options?: string[] | { label: string; value: string }[] | null;
};





export type PageSection = {
  id?: number;
  __component?: string;

  
  title?: string;
  subtitle?: string;
  description?: string | RichTextNode[];
  image?: StrapiImage | null;
  buttonText?: string;
  buttonLink?: string;

  
  openInNewTab?: boolean;

  
  backgroundColor?: string;
  textColor?: string;
  align?: string;
  size?: string;

  
  missionTitle?: string;
  missionText?: RichTextNode[];
  visionTitle?: string;
  visionText?: RichTextNode[];

  
  type?: string;
  animes?: Anime[];
  columns?: string;
  cardStyle?: string;
  showTitle?: boolean;
  showFeaturedOnly?: boolean;

  
  buttonVariant?: string;
  buttonSize?: string;
  textAlignment?: string;

  
  fields?: FormField[];

  
  layout?: string;

  
  email?: string;
  message?: string;
};





export type CmsPage = {
  id?: number;
  documentId?: string;
  title?: string;
  slug?: string;
  content?: PageSection[];
  showNavbar?: boolean;
  showFooter?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};





export async function getPageBySlug(slug?: string): Promise<CmsPage | null> {
  if (!slug) return null;

  const response = await fetchAPI<StrapiListResponse<CmsPage>>(
    `/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&pLevel=5`,
  );

  return response?.data?.[0] ?? null;
}
