import { fetchAPI, type Anime, type StrapiListResponse } from "./api";

const animePopulate = "populate[image]=true&populate[bannerImage]=true&populate[genre]=true";

function normalizeAnime(anime?: Anime | null): Anime | null {
  if (!anime) return null;

  return {
    ...anime,
    status: anime?.status ?? anime?.Running,
  };
}

export async function getAnimeList(): Promise<Anime[]> {
  const response = await fetchAPI<StrapiListResponse<Anime>>(
    `/animes?${animePopulate}&sort[0]=createdAt:desc&pagination[pageSize]=100`,
  );

  return response?.data?.map((anime) => normalizeAnime(anime))?.filter(Boolean) as Anime[] ?? [];
}

export async function getFeaturedAnime(): Promise<Anime[]> {
  const response = await fetchAPI<StrapiListResponse<Anime>>(
    `/animes?${animePopulate}&filters[featured][$eq]=true&sort[0]=createdAt:desc`,
  );

  return response?.data?.map((anime) => normalizeAnime(anime))?.filter(Boolean) as Anime[] ?? [];
}

export async function getAnimeBySlug(slug?: string): Promise<Anime | null> {
  if (!slug) return null;

  const response = await fetchAPI<StrapiListResponse<Anime>>(
    `/animes?${animePopulate}&filters[slug][$eq]=${encodeURIComponent(slug)}`,
  );

  return normalizeAnime(response?.data?.[0]);
}

export async function getAnimeByGenre(
  genreSlug?: string,
  excludedDocumentId?: string,
): Promise<Anime[]> {
  if (!genreSlug) return [];

  const exclude = excludedDocumentId
    ? `&filters[documentId][$ne]=${encodeURIComponent(excludedDocumentId)}`
    : "";
  const response = await fetchAPI<StrapiListResponse<Anime>>(
    `/animes?${animePopulate}&filters[genre][slug][$eq]=${encodeURIComponent(genreSlug)}${exclude}&pagination[pageSize]=10`,
  );

  return response?.data?.map((anime) => normalizeAnime(anime))?.filter(Boolean) as Anime[] ?? [];
}
