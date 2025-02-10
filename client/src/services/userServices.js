import { generalApi, interceptedApi } from "../api/api";

const baseEndpoint = "/user/profile";

// {http://localhost:8000/api/v1}{/user/profile}{/:userId} example

export const createUserProfile = async (data, userId) => {
  try {
    const response = await interceptedApi.post(
      `${baseEndpoint}/${userId}`,
      data
    );
    return response
  } catch (error) {
    console.error(error.message || "Create Profile Failed");
    throw error;
  }
};

export const updateUserProfile = async (data, userId) => {
  try {
    const response = await interceptedApi.put(
      `${baseEndpoint}/${userId}`,
      data
    );
    return response
  } catch (error) {
    console.error(error.message || "Create Profile Failed");
    throw error;
  }
};
