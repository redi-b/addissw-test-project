import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CreateSongPayload, Song, SongsData, UpdateSongPayload } from "@/types";

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
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      state.total += 1;
      state.status.createSong = "success";
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.status.createSong = "error";
      state.errors.createSong = action.payload;
    },

    updateSong: (state, action: PayloadAction<UpdateSongPayload>) => {
      state.status.updateSong = "loading";
      state.errors.updateSong = null;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs = state.songs.map((song) =>
        song.id === action.payload.id ? action.payload : song
      );
      if (state.song && state.song.id === action.payload.id) {
        state.song = action.payload;
      }
      state.status.updateSong = "success";
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.status.updateSong = "error";
      state.errors.updateSong = action.payload;
    },

    deleteSong: (state, action: PayloadAction<{ id: string }>) => {
      state.status.deleteSong = "loading";
      state.errors.deleteSong = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<{ id: string }>) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload.id);
      state.total -= 1;
      state.status.deleteSong = "success";
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.status.deleteSong = "error";
      state.errors.deleteSong = action.payload;
    },

    changePage: (state, { payload: page }: PayloadAction<number>) => {
      state.page = page;
      if (state.status.getSongs !== "loading") {
        state.status.getSongs = "idle";
        state.errors.getSongs = null;
      }
    },
    changePerPage: (state, { payload: perPage }: PayloadAction<number>) => {
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
