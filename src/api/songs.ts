import { SongsData } from "@/types";

export const fetchSongs = async (
  page = 1,
  perPage = 10
): Promise<SongsData> => {
  const res = await fetch(
    `${process.env.BASE_API_URL}/songs?page=${page}&pageSize=${perPage}`
  );
  if (!res.ok) throw new Error("Failed to fetch songs");

  const data: SongsData = await res.json();

  return data;
};
