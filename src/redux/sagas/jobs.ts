import { put, takeEvery } from "redux-saga/effects";
import { type AxiosResponse } from "axios";
import { TJobType, GET_ALL_JOBS } from "../types/jobsTypes";
import {
  getJobsAction,
  getJobsErrorAction,
  getJobsSuccessAction,
} from "../slices/jobs";
import { getJobsByProfile, getProfile } from "../../api/services";

function* getJobsSaga(action: ReturnType<typeof getJobsAction>) {
  console.log("get saga");
  try {
    const response: AxiosResponse<TJobType[]> = yield getJobsByProfile(
      "7f90df6e-b832-44e2-b624-3143d428001f"
    );
    yield put(getJobsSuccessAction(response.data));
  } catch (error) {
    yield put(getJobsErrorAction(String(error)));
  }
}

export function* watchGetJobs(): Generator<any> {
  yield takeEvery(GET_ALL_JOBS, getJobsSaga);
}
