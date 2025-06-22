import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { PROFILE, ProfileStateType, TProfileType } from "../types/profileTypes";

export const profileInitialState: ProfileStateType = {
  profile: {
    data: null,
    isLoading: false,
    errors: null,
  },
};

export const profileSlice = createSlice({
  name: PROFILE,
  initialState: profileInitialState,
  reducers: {
    getProfileAction: (state: ProfileStateType) => {
      return {
        ...state,
        profile: {
          ...state.profile,
          isLoading: true,
          errors: null,
        },
      };
    },
    getProfileSuccessAction: (
      state: ProfileStateType,
      { payload }: PayloadAction<TProfileType>
    ) => {
      return {
        ...state,
        profile: {
          ...state.profile,
          data: payload,
          isLoading: false,
          errors: null,
        },
      };
    },
    getProfileErrorAction: (
      state: ProfileStateType,
      { payload }: PayloadAction<string>
    ) => {
      return {
        ...state,
        profile: {
          ...state.profile,
          isLoading: false,
          errors: payload,
        },
      };
    },
  },
});

export const {
  getProfileAction,
  getProfileSuccessAction,
  getProfileErrorAction,
} = profileSlice.actions;

export default profileSlice.reducer;
