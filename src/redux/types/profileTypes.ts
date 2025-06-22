export interface TProfileType {
  workerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  maxJobDistance: number;
  address: {
    formattedAddress: string;
    zoneId: string;
  };
}

export interface TProfileState {
  data: TProfileType | null;
  isLoading: boolean;
  errors: string | null;
}

export interface ProfileStateType {
  profile: TProfileState;
}

export const PROFILE = "profile";
export type TPROFILE = typeof PROFILE;

export const GET_PROFILE = `${PROFILE}/getProfileAction`;
export type TGET_PROFILE = typeof GET_PROFILE;
