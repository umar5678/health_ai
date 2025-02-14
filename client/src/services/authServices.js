import ApiError from "../api/ApiError";
import ApiRequest from "../api/generalApiRequest";
import generalApiRequest from "../api/generalApiRequest";
import ApiResponse from "../api/ApiResponse";

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
    const apiRequest = new generalApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.postRequest("/login", {
      email,
      password,
    });
    return this.handleResponse(response);
  }

  async register(fullName, email, password) {
    const apiRequest = new generalApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.postRequest("/register", {
      fullName,
      email,
      password,
    });

    return this.handleResponse(response);
  }

  async logout() {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/logout`);
    const response = apiRequest.getRequest();
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

  async forgotPassword(fields) {
    const apiRequest = new generalApiRequest(
      `${this.USER_BASE_URL}/forgot-password`
    );
    const response = await apiRequest.postRequest({ email: fields.email });

    return this.handleResponse(response);
  }

  async resetForgottenPassword(token, fields) {
    const apiRequest = new generalApiRequest(
      `${this.USER_BASE_URL}/rest-password/${token}`
    );
    const response = await apiRequest.postRequest({
      newPassword: fields.newPassword,
    });

    return this.handleResponse(response);
  }
}

export default new AuthService();

// // Service for user signup
// export const signupService = async (data) => {
//   try {
//     const response = await generalApi.post(`${baseEndpoint}/register`, data);
//     return response;
//   } catch (error) {
//     console.error("Signup error:", error.message);
//     throw error;
//   }
// };

// // Service for user login
// export const loginService = async (data) => {
//   try {
//     const response = await generalApi.post(`${baseEndpoint}/login`, data);

//     // Handle token storage
//     const accessToken = response?.data?.data?.accessToken;
//     if (accessToken) {
//       sessionStorage.setItem("accessToken", accessToken);
//     } else {
//       console.warn("No access token found in login response");
//     }
//     return response;
//   } catch (error) {
//     console.error("Login error:", error.message);
//     throw error;
//   }
// };

// // Service for user logout
// export const logoutService = async () => {
//   try {
//     const response = await interceptedApi.get(`${baseEndpoint}/logout`);

//     // Clear session storage and redirect
//     sessionStorage.clear();
//     window.location.href = "/login";

//     return response;
//   } catch (error) {
//     console.error("Logout error:", error.message);
//     throw error;
//   }
// };
