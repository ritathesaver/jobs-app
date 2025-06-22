import { type RootState } from "../rootReducer";

export const profileLoadingSelector = (state: RootState) =>
  state.profile.profile.isLoading;
export const profileDataSelector = (state: RootState) =>
  state.profile.profile.data;
export const profileErrorSelector = (state: RootState) =>
  state.profile.profile.error;
