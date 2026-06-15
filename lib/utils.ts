const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// IMAGE HELPER
type StrapiImage = {
  url?: string;
};

export function getStrapiMedia(image: StrapiImage | null | undefined): string {
  if (!image?.url) return "/fallback.jpg";

  return image.url.startsWith("http")
    ? image.url
    : `${STRAPI_URL}${image.url}`;
}