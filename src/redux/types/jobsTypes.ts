export interface TJobType {
  jobId: string;
  branch: string;
  branchPhoneNumber: string;
  company: {
    name: string;
    address: {
      formattedAddress: string;
      zoneId: string;
    };
    reportTo: {
      name: string;
      phone: string;
    };
  };
  jobTitle: {
    name: string;
    imageUrl: string;
  };
  milesToTravel: number;
  requirements?: string[];
  shifts: {
    startDate: string;
    endDate: string;
  }[];
  wagePerHourInCents: number;
}

export interface TJobState {
  data: TJobType[] | null;
  isLoading: boolean;
  errors: string;
}
export interface JobStateType {
  jobs: TJobState;
}

export const JOBS = "jobs";
export type TJOBS = typeof JOBS;

export const GET_ALL_JOBS = `${JOBS}/getJobsAction`;
export type TGET_ALL_JOBS = typeof GET_ALL_JOBS;
