import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  getSongs,
  getSongsSuccess,
  getSongsFailure,
} from "@/store/slices/songsSlice";
import { fetchSongs } from "@/api/songs";
import { SongsData } from "@/types";

function* handleGetSongs({
  payload: { page, perPage },
}: PayloadAction<{ page: number; perPage: number }>) {
  try {
    const data: SongsData = yield call(fetchSongs, page, perPage);
    yield put(getSongsSuccess(data));
  } catch (err: any) {
    yield put(getSongsFailure(err.message || "Unknown error"));
  }
}

export default function* songsSaga() {
  yield takeLatest(getSongs.type, handleGetSongs);
}
