import ApiResponse from "./ApiResponse";
import ApiError from "./ApiError";

export const asyncHandler = async (func) => {
  try {
    const data = await func();
    return new ApiResponse(data.status, data.data, data.statusText, true);
  } catch (error) {
    console.error("API Error:", error);

    return new ApiError(
      error.response?.data?.message || error.message,
      error,
      error.response?.data
    );
  }
};
