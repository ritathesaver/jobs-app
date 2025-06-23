import axios, { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getProfile,
  getJobsByProfile,
  acceptJobByProfile,
  rejectJobByProfile,
} from "./services";
import { TProfileType } from "../redux/types/profileTypes";

const mock = new MockAdapter(axios);
const workerID = "7f90df6e-b832-44e2-b624-3143d428001f";
const jobId = "5775d8e18a488e6c5bb08333";
const API_URL = "https://test.swipejobs.com/api/worker";

describe("API integration", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch full profile data correctly", async () => {
    const profileData = {
      address: {
        formattedAddress: "1 Downing St, Chicago, IL 60654, USA",
        zoneId: "America/Chicago",
      },
      email: "jim.rose@gmail.com",
      firstName: "Jim",
      lastName: "Rose",
      maxJobDistance: 20,
      phoneNumber: "5096290220",
      workerId: "7f90df6e-b832-44e2-b624-3143d428001f",
    };

    mock.onGet(`${API_URL}/${workerID}/profile`).reply(200, profileData);

    const response = (await getProfile(
      workerID
    )) as AxiosResponse<TProfileType>;

    if (response == null) return;

    expect(response.status).toBe(200);
    expect(response.data).toEqual(profileData);

    expect(response.data.firstName).toBe("Jim");
    expect(response.data.address.zoneId).toBe("America/Chicago");
    expect(response.data.maxJobDistance).toBeGreaterThan(0);
  });

  it("should fetch jobs by profile", async () => {
    mock.onGet(`${API_URL}/${workerID}/matches`).reply(200);

    const response = await getJobsByProfile(workerID);
    expect(response.status).toBe(200);
  });

  it("should accept a job successfully", async () => {
    mock
      .onGet(`${API_URL}/${workerID}/job/${jobId}/accept`)
      .reply(200, { success: true });

    const response = await acceptJobByProfile(workerID, jobId);
    expect(response.success).toBe(true);
  });

  it("should reject a job successfully", async () => {
    mock
      .onGet(`${API_URL}/${workerID}/job/${jobId}/reject`)
      .reply(200, { success: true });

    const response = await rejectJobByProfile(workerID, jobId);
    expect(response.success).toBe(true);
  });

  it("should return error when profile fetch fails", async () => {
    mock.onGet(`${API_URL}/${workerID}/profile`).reply(500);

    const error = await getProfile(workerID);
    expect(error.status).toBe(500);
  });

  it("should handle failed accept job", async () => {
    mock.onGet(`${API_URL}/${workerID}/job/${jobId}/accept`).reply(500);

    const result = await acceptJobByProfile(workerID, jobId);
    expect(result.success).toBe(false);
  });
});
