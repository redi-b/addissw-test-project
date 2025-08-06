import {
  ArtistCount,
  MonthlyCount,
  TopAlbumsPayload,
  YearCount,
} from "@/types";

const BASE_API_URL = process.env.BASE_API_URL;
if (!BASE_API_URL) {
  console.error("BASE_API_URL is not defined in the environment variables");
  throw new Error("BASE_API_URL is not defined in the environment variables");
}
const BASE_URL = BASE_API_URL + "/analytics";

const fetchJSON = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch analytics data");
  }

  return res.json();
};

export const getSongsPerArtistApi = () =>
  fetchJSON<ArtistCount[]>(`${BASE_URL}/per-artist`);

export const getSongsPerYearApi = () =>
  fetchJSON<YearCount[]>(`${BASE_URL}/per-year`);

export const getMonthlySongCreationApi = () =>
  fetchJSON<MonthlyCount[]>(`${BASE_URL}/monthly`);

export const getTopAlbumsApi = () =>
  fetchJSON<TopAlbumsPayload>(`${BASE_URL}/top-albums`);
