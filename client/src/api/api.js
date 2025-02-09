import axios from "axios";

// Create a common base configuration
const baseConfig = {
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
};

// General API client
const generalApi = axios.create(baseConfig);

// Intercepted API client
const interceptedApi = axios.create(baseConfig);

// Request interceptor to attach accessToken to headers
interceptedApi.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log("client accesss: ", accessToken)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
interceptedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("Attempting to refresh token");

        // Call the refresh-token endpoint
        const { data } = await generalApi.post("/user/refresh-token");

        if (data?.data?.accessToken) {
          const newAccessToken = data.data.accessToken;

          // Store the new accessToken in sessionStorage
          sessionStorage.setItem("accessToken", newAccessToken);

          // Update the Authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return interceptedApi(originalRequest);
        }
      } catch (refreshError) {
        console.error(
          "Token refresh failed, redirecting to login",
          refreshError
        );

        // Optional: Redirect user to login page
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { generalApi, interceptedApi };
