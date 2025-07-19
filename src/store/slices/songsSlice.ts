import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Song, SongsData } from "@/types";

interface SongState {
  songs: Song[];
  total: number;
  status: Record<string, "idle" | "loading" | "success" | "error">;
  errors: Record<string, string | null>;
}

const initialState: SongState = {
  songs: [],
  total: 0,
  status: {
    getSongs: "idle",
  },
  errors: {
    getSongs: null,
  },
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongs: (
      state,
      action: PayloadAction<{ page?: number; perPage?: number }>
    ) => {
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

    // TODO: add rest actions
  },
});

export const { getSongs, getSongsSuccess, getSongsFailure } =
  songsSlice.actions;

export default songsSlice.reducer;
