import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CreateSongPayload, Song, SongsData, UpdateSongPayload } from "@/types";
import { toast } from "sonner";
import { updateToastToError, updateToastToSuccess } from "@/utils";

type SongOperation =
  | "getSongs"
  | "getSong"
  | "createSong"
  | "updateSong"
  | "deleteSong";

type SongStatus = Record<
  SongOperation,
  "idle" | "loading" | "success" | "error"
>;
type SongErrors = Record<SongOperation, string | null>;

interface SongState {
  songs: Song[];
  total: number;
  page?: number;
  perPage?: number;
  song: Song | null;
  status: SongStatus;
  errors: SongErrors;
}

const initialState: SongState = {
  songs: [],
  total: 0,
  page: undefined,
  perPage: undefined,
  song: null,
  status: {
    getSongs: "idle",
    getSong: "idle",
    createSong: "idle",
    updateSong: "idle",
    deleteSong: "idle",
  },
  errors: {
    getSongs: null,
    getSong: null,
    createSong: null,
    updateSong: null,
    deleteSong: null,
  },
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongs: (state) => {
      state.status.getSongs = "loading";
      state.errors.getSongs = null;
    },
    getSongsSuccess: (state, action: PayloadAction<SongsData>) => {
      state.songs = action.payload.songs;
      state.total = action.payload.total;
      state.status.getSongs = "success";
    },
    getSongsFailure: (state, action: PayloadAction<string>) => {
      state.status.getSongs = "error";
      state.errors.getSongs = action.payload;
    },

    getSong: (state, action: PayloadAction<{ id: string }>) => {
      state.status.getSong = "loading";
      state.errors.getSong = null;
    },
    getSongSuccess: (state, action: PayloadAction<Song>) => {
      state.song = action.payload;
      state.status.getSong = "success";
    },
    getSongFailure: (state, action: PayloadAction<string>) => {
      state.status.getSong = "error";
      state.errors.getSong = action.payload;
    },

    createSong: (state, action: PayloadAction<CreateSongPayload>) => {
      state.status.createSong = "loading";
      state.errors.createSong = null;
    },
    createSongSuccess: (
      state,
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
      state,
      {
        payload: { message, toastId },
      }: PayloadAction<{ message: string; toastId?: string | number }>
    ) => {
      state.status.createSong = "error";
      state.errors.createSong = message;

      updateToastToError(message, toastId);
    },

    updateSong: (state, action: PayloadAction<UpdateSongPayload>) => {
      state.status.updateSong = "loading";
      state.errors.updateSong = null;
    },
    updateSongSuccess: (
      state,
      {
        payload: { updatedSong, toastId },
      }: PayloadAction<{ updatedSong: Song; toastId?: string | number }>
    ) => {
      state.songs = state.songs.map((song) =>
        song.id === updatedSong.id ? updatedSong : song
      );
      if (state.song && state.song.id === updatedSong.id) {
        state.song = updatedSong;
      }
      state.status.updateSong = "success";

      updateToastToSuccess("Song updated successfully", toastId);
    },
    updateSongFailure: (
      state,
      {
        payload: { message, toastId },
      }: PayloadAction<{ message: string; toastId?: string | number }>
    ) => {
      state.status.updateSong = "error";
      state.errors.updateSong = message;

      updateToastToError(message, toastId);
    },

    deleteSong: (state, action: PayloadAction<{ id: string }>) => {
      state.status.deleteSong = "loading";
      state.errors.deleteSong = null;
    },
    deleteSongSuccess: (
      state,
      {
        payload: { id, toastId },
      }: PayloadAction<{ id: string; toastId?: string | number }>
    ) => {
      state.songs = state.songs.filter((song) => song.id !== id);
      state.total -= 1;
      state.status.deleteSong = "success";

      updateToastToSuccess("Song deleted successfully", toastId);
    },
    deleteSongFailure: (
      state,
      {
        payload: { message, toastId },
      }: PayloadAction<{ message: string; toastId?: string | number }>
    ) => {
      state.status.deleteSong = "error";
      state.errors.deleteSong = message;

      updateToastToError(message, toastId);
    },

    changePage: (state, { payload: page }: PayloadAction<number>) => {
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
    changePerPage: (state, { payload: perPage }: PayloadAction<number>) => {
      if (perPage < 1) {
        console.error(
          "Items per page cannot be less than 1. Defaulting to 10."
        );
        perPage = 10;
      }

      state.perPage = perPage;
      if (state.status.getSongs !== "loading") {
        state.status.getSongs = "idle";
        state.errors.getSongs = null;
      }
    },
  },
});

export const {
  getSongs,
  getSongsSuccess,
  getSongsFailure,
  getSong,
  getSongSuccess,
  getSongFailure,
  createSong,
  createSongSuccess,
  createSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  changePage,
  changePerPage,
} = songsSlice.actions;

export default songsSlice.reducer;
