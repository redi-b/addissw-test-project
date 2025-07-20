import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import {
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
} from "@/store/slices/songsSlice";
import {
  postSong,
  fetchSongById,
  fetchSongs,
  updateSong as updateSongApi,
  deleteSong as deleteSongApi,
} from "@/api/songs";
import { CreateSongPayload, Song, SongsData, UpdateSongPayload } from "@/types";
import { RootState } from "@/store";

function* handleGetSongs() {
  try {
    const { page, perPage } = yield select((state: RootState) => state.songs);

    const data: SongsData = yield call(fetchSongs, page, perPage);
    yield put(getSongsSuccess(data));
  } catch (err: any) {
    yield put(getSongsFailure(err.message || "Unknown error"));
  }
}

function* handleGetSong({ payload: { id } }: PayloadAction<{ id: string }>) {
  try {
    const song: Song = yield call(fetchSongById, id);
    yield put(getSongSuccess(song));
  } catch (err: any) {
    yield put(getSongFailure(err.message || "Unknown error"));
  }
}

function* handleCreateSong({
  payload: song,
}: PayloadAction<CreateSongPayload>) {
  try {
    const newSong: Song = yield call(postSong, song);

    yield put(createSongSuccess(newSong));
    yield put(getSongs());
  } catch (err: any) {
    yield put(createSongFailure(err.message || "Failed to create song"));
  }
}

function* handleUpdateSong({
  payload: songInfo,
}: PayloadAction<UpdateSongPayload>) {
  if (!songInfo.id) {
    yield put(updateSongFailure("Song ID is required for update"));
    return;
  }
  const { title, artist, album, year } = songInfo;
  if (!title && !artist && !album && typeof year !== "number") {
    yield put(updateSongFailure("At least one field must be updated"));
    return;
  }

  try {
    const updatedSong: Song = yield call(updateSongApi, songInfo);
    yield put(updateSongSuccess(updatedSong));
  } catch (err: any) {
    yield put(updateSongFailure(err.message || "Failed to update song"));
  }
}

function* handleDeleteSong({ payload: { id } }: PayloadAction<{ id: string }>) {
  try {
    yield call(deleteSongApi, id);
    yield put(deleteSongSuccess({ id }));

    const { songs, page, perPage, total }: RootState["songs"] = yield select(
      (state: RootState) => state.songs
    );

    if (songs.length === 0 && total > 0 && page) {
      // If the last song was deleted, we need to adjust the page
      const newPage = page > 1 ? page - 1 : 1;
      yield put(changePage(newPage));
    }
  } catch (err: any) {
    yield put(deleteSongFailure(err.message || "Failed to delete song"));
  }
}

export default function* songsSaga() {
  yield takeLatest(getSongs.type, handleGetSongs);
  yield takeLatest(getSong.type, handleGetSong);
  yield takeLatest(createSong.type, handleCreateSong);
  yield takeLatest(updateSong.type, handleUpdateSong);
  yield takeEvery(deleteSong.type, handleDeleteSong);
}
