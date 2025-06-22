import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { jobsInitialState } from "./slices/jobs";
import { profileInitialState } from "./slices/profile";
import rootSaga from "./rootSaga";
const createSagaMiddleware = require("redux-saga").default;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    jobs: jobsInitialState,
    profile: profileInitialState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
