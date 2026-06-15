import { fetchAPI, type Genre, type StrapiListResponse, type StrapiSingleResponse } from "./api";

export type NavChild = {
  id?: number;
  label?: string;
  url?: string;
};

export type NavLink = {
  id?: number;
  label?: string;
  url?: string;
  isExternal?: boolean;
  type?: string;
  types?: string;
  children?: NavChild[];
};

export type NavbarData = {
  id?: number;
  logo?: string;
  links?: NavLink[];
};

export type FooterData = {
  id?: number;
  title?: string;
  description?: string;
  copyright?: string;
};

export type GlobalData = {
  navbar?: NavbarData | NavbarData[] | null;
  footer?: FooterData | FooterData[] | null;
};

export async function getGlobal(): Promise<GlobalData | null> {
  const response = await fetchAPI<StrapiSingleResponse<GlobalData>>(
    "/global?populate[navbar][populate][links][populate][children]=true&populate[footer]=true",
  );

  return response?.data ?? null;
}

export async function getGenres(): Promise<Genre[]> {
  const response = await fetchAPI<StrapiListResponse<Genre>>(
    "/genres?fields[0]=name&fields[1]=slug&sort[0]=name:asc&pagination[pageSize]=100",
  );

  return response?.data ?? [];
}

export function firstComponent<T>(value?: T | T[] | null): T | null {
  return Array.isArray(value) ? value?.[0] ?? null : value ?? null;
}
