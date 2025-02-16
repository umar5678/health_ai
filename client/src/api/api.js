import axios from "axios";
import { getToken, setToken, clearToken } from "../utils/tokenUtils";

// Common API config
const baseConfig = {
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
};

// General API client (No interceptors)
const generalApi = axios.create(baseConfig);

// Intercepted API client (For authenticated requests)
const interceptedApi = axios.create(baseConfig);

// Request Interceptor: Attach accessToken
interceptedApi.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 & Refresh Token
interceptedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("Refreshing token...");

        // Refresh token request
        const { data } = await generalApi.post("/user/auth/refresh-token");

        if (data && data.data && data.data.accessToken) {
          const newAccessToken = data.data.accessToken;
          console.log(data.data);

          // Store new token
          setToken(newAccessToken);

          // Update request headers
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return interceptedApi(originalRequest);
        }
      } catch (refreshError) {
        console.error(
          "Token refresh failed. Redirecting to login...",
          refreshError
        );
        clearToken();
        window.location.href = "/login"; // Redirect user to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { generalApi, interceptedApi };
