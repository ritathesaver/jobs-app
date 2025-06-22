import { combineReducers, type Reducer } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobs";
import profileReducer from "./slices/profile";
import type store from "./store";

const rootReducer: Reducer = combineReducers({
  jobs: jobsReducer,
  profile: profileReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
