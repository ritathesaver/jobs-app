import { all, fork } from "redux-saga/effects";
import { watchGetJobs } from "./sagas/jobs";
import { watchGetProfile } from "./sagas/profile";

const rootSaga = function* () {
  yield all([fork(watchGetJobs), fork(watchGetProfile)]);
};

export default rootSaga;
