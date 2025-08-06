import { AlbumCount, ArtistCount, MonthlyCount, YearCount } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AnalyticsStatus = "idle" | "loading" | "success" | "error";

interface AnalyticsStateEntry<T> {
  data: T;
  status: AnalyticsStatus;
  error: string | null;
}

export interface AnalyticsState {
  songsPerArtist: AnalyticsStateEntry<ArtistCount[]>;
  songsPerYear: AnalyticsStateEntry<YearCount[]>;
  monthlySongCreation: AnalyticsStateEntry<MonthlyCount[]>;
  topAlbums: AnalyticsStateEntry<AlbumCount[]>;
}

const initialEntry = {
  data: [],
  status: "idle" as AnalyticsStatus,
  error: null,
};

const initialState: AnalyticsState = {
  songsPerArtist: { ...initialEntry },
  songsPerYear: { ...initialEntry },
  monthlySongCreation: { ...initialEntry },
  topAlbums: { ...initialEntry },
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    fetchSongsPerArtist(state) {
      state.songsPerArtist.status = "loading";
      state.songsPerArtist.error = null;
    },
    fetchSongsPerArtistSuccess(state, action: PayloadAction<ArtistCount[]>) {
      state.songsPerArtist.status = "success";
      state.songsPerArtist.data = action.payload;
    },
    fetchSongsPerArtistFailure(state, action: PayloadAction<string>) {
      state.songsPerArtist.status = "error";
      state.songsPerArtist.error = action.payload;
    },

    fetchSongsPerYear(state) {
      state.songsPerYear.status = "loading";
      state.songsPerYear.error = null;
    },
    fetchSongsPerYearSuccess(state, action: PayloadAction<YearCount[]>) {
      state.songsPerYear.status = "success";
      state.songsPerYear.data = action.payload;
    },
    fetchSongsPerYearFailure(state, action: PayloadAction<string>) {
      state.songsPerYear.status = "error";
      state.songsPerYear.error = action.payload;
    },

    fetchMonthlySongCreation(state) {
      state.monthlySongCreation.status = "loading";
      state.monthlySongCreation.error = null;
    },
    fetchMonthlySongCreationSuccess(
      state,
      action: PayloadAction<MonthlyCount[]>
    ) {
      state.monthlySongCreation.status = "success";
      state.monthlySongCreation.data = action.payload;
    },
    fetchMonthlySongCreationFailure(state, action: PayloadAction<string>) {
      state.monthlySongCreation.status = "error";
      state.monthlySongCreation.error = action.payload;
    },

    fetchTopAlbums(state) {
      state.topAlbums.status = "loading";
      state.topAlbums.error = null;
    },
    fetchTopAlbumsSuccess(state, action: PayloadAction<AlbumCount[]>) {
      state.topAlbums.status = "success";
      state.topAlbums.data = action.payload;
    },
    fetchTopAlbumsFailure(state, action: PayloadAction<string>) {
      state.topAlbums.status = "error";
      state.topAlbums.error = action.payload;
    },
  },
});

export const {
  fetchSongsPerArtist,
  fetchSongsPerArtistSuccess,
  fetchSongsPerArtistFailure,
  fetchSongsPerYear,
  fetchSongsPerYearSuccess,
  fetchSongsPerYearFailure,
  fetchMonthlySongCreation,
  fetchMonthlySongCreationSuccess,
  fetchMonthlySongCreationFailure,
  fetchTopAlbums,
  fetchTopAlbumsSuccess,
  fetchTopAlbumsFailure,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
