import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getCurrentUser = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) throw new ApiError(404, "user not found");
  return res.status(200).json(new ApiResponse(200, { user }, "user fetched"));
});

export { getCurrentUser };
