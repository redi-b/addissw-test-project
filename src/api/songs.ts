import { CreateSongPayload, Song, SongsData, UpdateSongPayload } from "@/types";

const BASE_API_URL = process.env.BASE_API_URL;
if (!BASE_API_URL) {
  console.error("BASE_API_URL is not defined in the environment variables");
  throw new Error("BASE_API_URL is not defined in the environment variables");
}

export const fetchSongs = async (
  page = 1,
  perPage = 10
): Promise<SongsData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  const res = await fetch(
    `${BASE_API_URL}/songs?page=${page}&pageSize=${perPage}`
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch songs");

  return data as SongsData;
};

export const fetchSongById = async (id: string): Promise<Song> => {
  const res = await fetch(`${BASE_API_URL}/songs/${id}`);

  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new Error("Song not found");
      default:
        throw new Error("Failed to fetch song");
    }
  }

  const song: Song = await res.json();

  return song;
};

export const postSong = async (song: CreateSongPayload): Promise<Song> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  const res = await fetch(`${BASE_API_URL}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });

  const data = await res.json();

  if (!res.ok) {
    switch (res.status) {
      case 400:
        throw new Error("Invalid song data");
      default:
        throw new Error(data.message || "Failed to create song");
    }
  }

  return data as Song;
};

export const updateSong = async (
  songInfo: UpdateSongPayload
): Promise<Song> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  const res = await fetch(`${BASE_API_URL}/songs/${songInfo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songInfo),
  });

  const data = await res.json();
  if (!res.ok) {
    switch (res.status) {
      case 400:
        throw new Error("Invalid song data");
      case 404:
        throw new Error("Song not found");
      default:
        throw new Error(data.message || "Failed to update song");
    }
  }

  return data as Song;
};

export const deleteSong = async (id: string): Promise<{ id: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  const res = await fetch(`${BASE_API_URL}/songs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new Error("Song not found");
      default:
        throw new Error("Failed to delete song");
    }
  }

  return { id };
};
