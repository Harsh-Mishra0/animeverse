import { fetchAPI } from "./api";

export async function getHomePage() {
  const data = await fetchAPI<{ data: unknown[] }>(
    "/pages?filters[slug][$eq]=home&populate[content][populate]=*"
  );

  return data.data[0];
}
