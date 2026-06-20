import { getImageUrl as getImageUrlFromApi, type StrapiImage } from "./api";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function getImageUrl(
  media?: string | StrapiImage | null,
  format?: string,
): string {
  return getImageUrlFromApi(media, format) || "/fallback.jpg";
}

export function getStrapiMedia(image: StrapiImage | null | undefined): string {
  return getImageUrl(image);
}