import { all, fork } from "redux-saga/effects";

import songsSaga from "@/store/sagas/songsSaga";
import analyticsSaga from "./analyticsSaga";

export default function* rootSaga() {
  yield all([fork(songsSaga), fork(analyticsSaga)]);
}
