import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { JOBS, JobStateType, TJobType } from "../types/jobsTypes";

export const jobsInitialState: JobStateType = {
  jobs: {
    data: null,
    isLoading: false,
    errors: "",
  },
};

export const jobsSlice = createSlice({
  name: JOBS,
  initialState: jobsInitialState,
  reducers: {
    getJobsAction: (state: JobStateType) => {
      return {
        ...state,
        jobs: {
          ...state.jobs,
          isLoading: true,
          errors: "",
        },
      };
    },
    getJobsSuccessAction: (
      state: JobStateType,
      { payload: data }: PayloadAction<TJobType[]>
    ) => {
      return {
        ...state,
        jobs: {
          ...state.jobs,
          data,
          isLoading: false,
          errors: "",
        },
      };
    },
    getJobsErrorAction: (
      state: JobStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      return {
        ...state,
        jobs: {
          ...state.jobs,
          isLoading: false,
          errors: error,
        },
      };
    },
  },
});

export const { getJobsAction, getJobsSuccessAction, getJobsErrorAction } =
  jobsSlice.actions;

export default jobsSlice.reducer;
