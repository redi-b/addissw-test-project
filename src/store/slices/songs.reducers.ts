import { PayloadAction } from "@reduxjs/toolkit";
import { Song, SongsData, UpdateSongPayload, CreateSongPayload } from "@/types";
import { SongState } from "@/store/slices/songsSlice";
import { sortSongs, updateToastToError, updateToastToSuccess } from "@/utils";

export const songGetReducers = {
  getSongs: (state: SongState) => {
    state.status.getSongs = "loading";
    state.errors.getSongs = null;
  },
  getSongsSuccess: (state: SongState, action: PayloadAction<SongsData>) => {
    state.allSongs = action.payload.songs;
    state.songs = action.payload.songs;
    state.total = action.payload.total;
    state.status.getSongs = "success";
  },
  getSongsFailure: (state: SongState, action: PayloadAction<string>) => {
    state.status.getSongs = "error";
    state.errors.getSongs = action.payload;
  },

  getSong: (state: SongState, action: PayloadAction<{ id: string }>) => {
    state.status.getSong = "loading";
    state.errors.getSong = null;
  },
  getSongSuccess: (state: SongState, action: PayloadAction<Song>) => {
    state.song = action.payload;
    state.status.getSong = "success";
  },
  getSongFailure: (state: SongState, action: PayloadAction<string>) => {
    state.status.getSong = "error";
    state.errors.getSong = action.payload;
  },
};

export const songCreateReducers = {
  createSong: (state: SongState, action: PayloadAction<CreateSongPayload>) => {
    state.status.createSong = "loading";
    state.errors.createSong = null;
  },
  createSongSuccess: (
    state: SongState,
    {
      payload: { newSong, toastId },
    }: PayloadAction<{ newSong: Song; toastId?: string | number }>
  ) => {
    state.songs.push(newSong);
    state.total += 1;
    state.status.createSong = "success";

    updateToastToSuccess("Song created successfully", toastId);
  },
  createSongFailure: (
    state: SongState,
    {
      payload: { message, toastId },
    }: PayloadAction<{ message: string; toastId?: string | number }>
  ) => {
    state.status.createSong = "error";
    state.errors.createSong = message;

    updateToastToError(message, toastId);
  },
};

export const songUpdateReducers = {
  updateSong: (state: SongState, action: PayloadAction<UpdateSongPayload>) => {
    state.status.updateSong = "loading";
    state.errors.updateSong = null;
  },
  updateSongSuccess: (
    state: SongState,
    {
      payload: { updatedSong, toastId },
    }: PayloadAction<{ updatedSong: Song; toastId?: string | number }>
  ) => {
    state.songs = state.songs.map((song) =>
      song.id === updatedSong.id ? updatedSong : song
    );
    state.allSongs = state.allSongs.map((song) =>
      song.id === updatedSong.id ? updatedSong : song
    );
    if (state.song && state.song.id === updatedSong.id) {
      state.song = updatedSong;
    }
    state.status.updateSong = "success";

    updateToastToSuccess("Song updated successfully", toastId);
  },
  updateSongFailure: (
    state: SongState,
    {
      payload: { message, toastId },
    }: PayloadAction<{ message: string; toastId?: string | number }>
  ) => {
    state.status.updateSong = "error";
    state.errors.updateSong = message;

    updateToastToError(message, toastId);
  },
};

export const songDeleteReducers = {
  deleteSong: (state: SongState, action: PayloadAction<{ id: string }>) => {
    state.status.deleteSong = "loading";
    state.errors.deleteSong = null;
  },
  deleteSongSuccess: (
    state: SongState,
    {
      payload: { id, toastId },
    }: PayloadAction<{ id: string; toastId?: string | number }>
  ) => {
    state.songs = state.songs.filter((song) => song.id !== id);
    state.allSongs = state.allSongs.filter((song) => song.id !== id);
    state.total -= 1;
    state.status.deleteSong = "success";

    updateToastToSuccess("Song deleted successfully", toastId);
  },
  deleteSongFailure: (
    state: SongState,
    {
      payload: { message, toastId },
    }: PayloadAction<{ message: string; toastId?: string | number }>
  ) => {
    state.status.deleteSong = "error";
    state.errors.deleteSong = message;

    updateToastToError(message, toastId);
  },
};

export const pageParamReducers = {
  changePage: (state: SongState, { payload: page }: PayloadAction<number>) => {
    if (page < 1) {
      console.error("Page number cannot be less than 1. Defaulting to 1.");
      page = 1;
    }

    state.page = page;
    if (state.status.getSongs !== "loading") {
      state.status.getSongs = "idle";
      state.errors.getSongs = null;
    }
  },
  changePerPage: (
    state: SongState,
    { payload: perPage }: PayloadAction<number>
  ) => {
    if (perPage < 1) {
      console.error("Items per page cannot be less than 1. Defaulting to 5.");
      perPage = 5;
    }

    state.perPage = perPage;
    if (state.status.getSongs !== "loading") {
      state.status.getSongs = "idle";
      state.errors.getSongs = null;
    }
  },
};

export const filterReducers = {
  setSearch: (state: SongState, { payload }: PayloadAction<string>) => {
    state.search = payload;
    state.status.getSongs = "idle";
    state.errors.getSongs = null;

    const search = payload.toLowerCase();
    const filtered = state.allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(search) ||
        song.artist.toLowerCase().includes(search)
    );

    state.songs = sortSongs(filtered, state.sortBy, state.sortOrder);
  },

  setSort: (
    state: SongState,
    {
      payload,
    }: PayloadAction<{
      sortBy: keyof Omit<Song, "id">;
      sortOrder: "asc" | "desc";
    }>
  ) => {
    state.sortBy = payload.sortBy;
    state.sortOrder = payload.sortOrder;
    state.status.getSongs = "idle";
    state.errors.getSongs = null;

    state.songs = sortSongs(state.songs, state.sortBy, state.sortOrder);
  },

  resetFilters: (state: SongState) => {
    state.search = undefined;
    state.sortBy = undefined;
    state.sortOrder = undefined;
    state.status.getSongs = "idle";
    state.errors.getSongs = null;
  },
};
