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
  setSort,
  setSearch,
  seedSongs,
  seedSongsSuccess,
  seedSongsFailure,
} from "@/store/slices/songsSlice";
import {
  postSong,
  fetchSongById,
  fetchSongs,
  updateSong as updateSongApi,
  deleteSong as deleteSongApi,
  seedSongs as seedSongsApi,
} from "@/api/songs";
import { CreateSongPayload, Song, SongsData, UpdateSongPayload } from "@/types";
import { RootState } from "@/store";
import { toast } from "sonner";

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

    yield put(createSongSuccess({ newSong }));
    yield put(getSongs());
    toast.success("Song created successfully");
  } catch (err: any) {
    yield put(createSongFailure(err.message || "Failed to create song"));
    toast.error(err.message || "Failed to create song");
  }
}

function* handleUpdateSong({
  payload: songInfo,
}: PayloadAction<UpdateSongPayload>) {
  try {
    if (!songInfo.id) {
      throw new Error("Song ID is required for update");
    }

    const currentSong: Song | undefined = yield select((state: RootState) =>
      state.songs.songs.find((s) => s.id === songInfo.id)
    );

    if (!currentSong) {
      throw new Error("Song not found");
    }

    const fieldsToCheck: (keyof Omit<Song, "id">)[] = [
      "title",
      "artist",
      "album",
      "year",
    ];

    const isChanged = fieldsToCheck.some((field) => {
      return (
        songInfo[field] !== undefined && songInfo[field] !== currentSong[field]
      );
    });

    if (!isChanged) {
      throw new Error("No changes detected in the song data");
    }

    const updatedSong: Song = yield call(updateSongApi, songInfo);
    yield put(updateSongSuccess({ updatedSong }));
    toast.success("Song updated successfully");

    const { search, sortBy, sortOrder } = yield select(
      (state: RootState) => state.songs
    );
    if (search) yield put(setSearch(search));
    if (sortBy || sortOrder) yield put(setSort({ sortBy, sortOrder }));
  } catch (err: any) {
    yield put(updateSongFailure(err.message || "Failed to update song"));
    toast.error(err.message || "Failed to update song");
  }
}

function* handleDeleteSong({ payload: { id } }: PayloadAction<{ id: string }>) {
  const toastId = toast.loading("Deleting song...");

  try {
    yield call(deleteSongApi, id);
    yield put(deleteSongSuccess({ id, toastId: toastId }));

    const { songs, page, total }: RootState["songs"] = yield select(
      (state: RootState) => state.songs
    );

    if (songs.length === 0 && total > 0 && page) {
      // If the last song in a page was deleted,
      // we need to adjust the page
      const newPage = page > 1 ? page - 1 : 1;

      if (newPage !== page) {
        yield put(changePage(newPage));
      } else {
        yield put(getSongs());
      }
    }
  } catch (err: any) {
    yield put(
      deleteSongFailure({
        message: err.message || "Failed to delete song",
        toastId,
      })
    );
  }
}

export function* handleSeedSongs() {
  const toastId = toast.loading("Seeding songs...");

  try {
    yield call(seedSongsApi);

    yield put(seedSongsSuccess({ toastId }));
    yield put(getSongs());
  } catch (err: any) {
    yield put(
      seedSongsFailure({
        message: err.message || "Failed to seed songs",
        toastId,
      })
    );
  }
}

export default function* songsSaga() {
  yield takeLatest(getSongs.type, handleGetSongs);
  yield takeLatest(getSong.type, handleGetSong);
  yield takeLatest(createSong.type, handleCreateSong);
  yield takeLatest(updateSong.type, handleUpdateSong);
  yield takeEvery(deleteSong.type, handleDeleteSong);
  yield takeLatest(seedSongs.type, handleSeedSongs);
}
