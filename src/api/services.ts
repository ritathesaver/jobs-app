import axios from "axios";
import { API_URL } from "../consts/routes";

export const getProfile = async (workerID: string) => {
  try {
    const response = await axios.get(`${API_URL}/${workerID}/profile`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getJobsByProfile = async (workerID: string) => {
  try {
    const response = await axios.get(`${API_URL}/${workerID}/matches`);
    return response;
  } catch (error) {
    return error;
  }
};

export const acceptJobByProfile = async (workerID: string, jobId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/${workerID}/job/${jobId}/accept`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
    };
  }
};

export const rejectJobByProfile = async (workerID: string, jobId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/${workerID}/job/${jobId}/reject`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
    };
  }
};
