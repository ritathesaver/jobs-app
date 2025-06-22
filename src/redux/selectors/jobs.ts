import { type RootState } from "../rootReducer";

export const jobsLoadingSelector = (state: RootState) =>
  state.jobsReducer.jobs.isLoading;
export const jobsDataSelector = (state: RootState) => state.jobs.jobs.data;
export const jobsErrorSelector = (state: RootState) =>
  state.jobsReducer.jobs.error;
