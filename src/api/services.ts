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
    console.log(response.data, "data1");
    return response;
  } catch (error) {
    return error;
  }
};

export const rejectJobByProfile = async (workerID: string, jobId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/${workerID}/job/${jobId}/reject`
    );
    console.log(response.data, "data1");
    return response;
  } catch (error) {
    return error;
  }
};
