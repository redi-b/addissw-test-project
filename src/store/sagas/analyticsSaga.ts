import { call, put, takeLatest } from "redux-saga/effects";
import {
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
} from "@/store/slices/analyticsSlice";
import {
  getSongsPerArtistApi,
  getSongsPerYearApi,
  getMonthlySongCreationApi,
  getTopAlbumsApi,
} from "@/api/analytics";
import {
  MonthlySongCreationPayload,
  SongsPerArtistPayload,
  SongsPerYearPayload,
  TopAlbumsPayload,
} from "@/types";

function* handleFetchSongsPerArtist() {
  try {
    const result: SongsPerArtistPayload = yield call(getSongsPerArtistApi);
    yield put(fetchSongsPerArtistSuccess(result));
  } catch (err: any) {
    yield put(
      fetchSongsPerArtistFailure(
        err.message || "Failed to fetch songs per artist"
      )
    );
  }
}

function* handleFetchSongsPerYear() {
  try {
    const result: SongsPerYearPayload = yield call(getSongsPerYearApi);
    yield put(fetchSongsPerYearSuccess(result));
  } catch (err: any) {
    yield put(
      fetchSongsPerYearFailure(err.message || "Failed to fetch songs per year")
    );
  }
}

function* handleFetchMonthlySongCreation() {
  try {
    const result: MonthlySongCreationPayload = yield call(
      getMonthlySongCreationApi
    );
    yield put(fetchMonthlySongCreationSuccess(result));
  } catch (err: any) {
    yield put(
      fetchMonthlySongCreationFailure(
        err.message || "Failed to fetch monthly stats"
      )
    );
  }
}

function* handleFetchTopAlbums() {
  try {
    const result: TopAlbumsPayload = yield call(getTopAlbumsApi);
    yield put(fetchTopAlbumsSuccess(result));
  } catch (err: any) {
    yield put(
      fetchTopAlbumsFailure(err.message || "Failed to fetch top albums")
    );
  }
}

export default function* analyticsSaga() {
  yield takeLatest(fetchSongsPerArtist.type, handleFetchSongsPerArtist);
  yield takeLatest(fetchSongsPerYear.type, handleFetchSongsPerYear);
  yield takeLatest(
    fetchMonthlySongCreation.type,
    handleFetchMonthlySongCreation
  );
  yield takeLatest(fetchTopAlbums.type, handleFetchTopAlbums);
}
