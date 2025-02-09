import {generalApi, interceptedApi} from '../api/api'

const baseEndpoint = "/user/auth";

// Service for user signup
export const signupService = async (data) => {
  try {
    const response = await generalApi.post(`${baseEndpoint}/register`, data);
    return response;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error;
  }
};

// Service for user login
export const loginService = async (data) => {
  try {
    const response = await generalApi.post(`${baseEndpoint}/login`, data);

    // Handle token storage
    const accessToken = response?.data?.data?.accessToken;
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
    } else {
      console.warn("No access token found in login response");
    }
    return response;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// Service for user logout
export const logoutService = async () => {
  try {
    const response = await interceptedApi.get(`${baseEndpoint}/logout`);

    // Clear session storage and redirect
    sessionStorage.clear();
    window.location.href = "/login";

    return response;
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
};
