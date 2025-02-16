import { ApiError } from "../api/ApiError";
import { ApiRequest } from "../api/ApiRequest";
import { ApiResponse } from "../api/ApiResponse";

class UserService {
  constructor() {
    this.USER_BASE_URL = "/user";
  }

  handleResponse(response) {
    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getCurrentUser(userId) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.getRequest(`/${userId}`);

    return this.handleResponse(response);
  }

  async createUserProfile(formData, userId) {
    const apiRequest = new ApiRequest(this.USER_BASE_URL);

    const response = await apiRequest.postFormDataRequest(
      `/profile/${userId}`,
      formData
    );

    return this.handleResponse(response);
  }

  async updateUserProfile(formData, userId) {
    const apiRequest = new ApiRequest(this.USER_BASE_URL);

    const response = await apiRequest.postFormDataRequest(
      `/profile/${userId}`,
      formData
    );

    return this.handleResponse(response);
  }
}

export default new UserService();

//
//
//
//
//
//
//
//

//

// import { generalApi, interceptedApi } from "../api/api";

// const baseEndpoint = "/user/profile";

// // {http://localhost:8000/api/v1}{/user/profile}{/:userId} example

// export const createUserProfile = async (data, userId) => {
//   try {
//     const response = await interceptedApi.post(
//       `${baseEndpoint}/${userId}`,
//       data
//     );
//     return response
//   } catch (error) {
//     console.error(error.message || "Create Profile Failed");
//     throw error;
//   }
// };

// export const updateUserProfile = async (data, userId) => {
//   try {
//     const response = await interceptedApi.put(
//       `${baseEndpoint}/${userId}`,
//       data
//     );
//     return response
//   } catch (error) {
//     console.error(error.message || "Create Profile Failed");
//     throw error;
//   }
// };
