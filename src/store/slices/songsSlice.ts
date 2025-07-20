import { createSlice } from "@reduxjs/toolkit";
import {
  pageParamReducers,
  songCreateReducers,
  songDeleteReducers,
  songGetReducers,
  songUpdateReducers,
} from "./songs.reducers";
import { Song } from "@/types";

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

export interface SongState {
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
    ...songGetReducers,
    ...songCreateReducers,
    ...songUpdateReducers,
    ...songDeleteReducers,
    ...pageParamReducers,
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
