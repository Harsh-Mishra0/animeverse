const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
).replace(/\/$/, "");

export type StrapiImage = {
  id?: number;
  documentId?: string;
  url?: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, { url?: string }>;
};

export type Genre = {
  id?: number;
  documentId?: string;
  name?: string;
  slug?: string;
};

export type Anime = {
  id?: number;
  documentId?: string;
  title?: string;
  slug?: string;
  description?: string;
  rating?: number | string;
  episodes?: number;
  releaseYear?: number | string;
  status?: string;
  Running?: string;
  studio?: string;
  featured?: boolean;
  image?: StrapiImage | null;
  bannerImage?: StrapiImage | null;
  genre?: Genre | null;
  genres?: Genre[] | null;
};

export type StrapiListResponse<T> = {
  data?: T[];
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data?: T | null;
  meta?: Record<string, unknown>;
};

export async function fetchAPI<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const response = await fetch(`${STRAPI_URL}/api${normalizedPath}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(process.env.STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
        : {}),
      ...options?.headers,
    },
    next: options?.next ?? { revalidate: 60 },
  });

  if (!response?.ok) {
    throw new Error(
      `Strapi request failed (${response?.status} ${response?.statusText}) for ${normalizedPath}`,
    );
  }

  return (await response?.json()) as T;
}

export function getImageUrl(
  media?: string | StrapiImage | null,
  format?: string,
): string | null {
  if (!media) return null;

  let url: string | undefined;
  if (typeof media === "string") {
    url = media;
  } else {
    url = format ? media?.formats?.[format]?.url ?? media?.url : media?.url;
  }

  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export function getStrapiMedia(
  media?: StrapiImage | null,
  format?: string,
): string | null {
  return getImageUrl(media, format);
}
