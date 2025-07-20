import { Song } from "@/types";
import { toast } from "sonner";

export const updateToastToSuccess = (
  message: string,
  toastId?: string | number
): void => {
  if (toastId)
    toast.success(message, {
      id: toastId,
    });
};

export const updateToastToError = (
  message: string,
  toastId?: string | number
): void => {
  if (toastId)
    toast.error(message, {
      id: toastId,
    });
};

export const sortSongs = (
  songs: Song[],
  sortBy?: keyof Omit<Song, "id">,
  sortOrder: "asc" | "desc" = "asc"
): Song[] => {
  if (!sortBy) return songs;

  return [...songs].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};
