import { ApiError } from "../api/ApiError";
import { ApiRequest } from "../api/ApiRequest";
import { GeneralApiRequest } from "../api/GeneralApiRequest";
import { ApiResponse } from "../api/ApiResponse";

class AuthService {
  constructor() {
    this.USER_BASE_URL = "/user/auth";
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

  async login(email, password) {
    const apiRequest = new GeneralApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.postRequest("/login", {
      email,
      password,
    });
    return this.handleResponse(response);
  }

  async register(fullName, email, password) {
    const apiRequest = new GeneralApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.postRequest("/register", {
      fullName,
      email,
      password,
    });

    return this.handleResponse(response);
  }

  async logout() {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}`);
    const response = apiRequest.getRequest("/logout");
    return this.handleResponse(response);
  }

  async changePassword(fields) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/change-password`);
    const response = await apiRequest.postRequest({
      newPassword: fields.newPassword,
      oldPassword: fields.oldPassword,
    });

    return this.handleResponse(response);
  }

  async forgotPassword(email) {
    const apiRequest = new GeneralApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.postRequest("/forgot-password", {
      email,
    });

    return this.handleResponse(response);
  }

  async resetForgottenPassword(token, newPassword) {
    const apiRequest = new GeneralApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.postRequest(`/rest-password/${token}`, {
      newPassword,
    });

    return this.handleResponse(response);
  }

  async refreshAccessToken() {
    const apiRequest = new GeneralApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.postRequest("/refresh-token");
    return this.handleResponse(response);
  }

  async resendEmailVerification(userId) {
    const apiRequest = new GeneralApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.postRequest("resend-verification-email", {
      userId,
    });

    return this.handleResponse(response);
  }
}

export default new AuthService();
