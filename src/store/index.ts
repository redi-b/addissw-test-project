import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import songsReducer from "@/store/slices/songsSlice";
import rootSaga from "@/store/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
