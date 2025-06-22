import { put, takeEvery } from "redux-saga/effects";
import { type AxiosResponse } from "axios";
import { GET_PROFILE, TProfileType } from "../types/profileTypes";
import {
  getProfileAction,
  getProfileSuccessAction,
  getProfileErrorAction,
} from "../slices/profile";
import { getProfile } from "../../api/services";

function* getProfileSaga(action: ReturnType<typeof getProfileAction>) {
  try {
    const response: AxiosResponse<TProfileType> = yield getProfile(
      "7f90df6e-b832-44e2-b624-3143d428001f"
    );
    yield put(getProfileSuccessAction(response.data));
  } catch (error) {
    yield put(getProfileErrorAction(String(error)));
  }
}

export function* watchGetProfile(): Generator {
  yield takeEvery(GET_PROFILE, getProfileSaga);
}
