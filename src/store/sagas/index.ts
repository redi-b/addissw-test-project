import { all, fork } from "redux-saga/effects";

import songsSaga from "@/store/sagas/songsSaga";

export default function* rootSaga() {
  yield all([fork(songsSaga)]);
}
