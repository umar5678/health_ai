import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { UserProfile } from "../models/profile.model.js";

const getUserProfile = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).populate("profile").exec();

  if (!user) throw new ApiError(404, "user not found");

  return res.status(200).json(new ApiResponse(200, user));
});

const createUserProfile = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  console.log("createUserProfile, user id :", userId);
  res.send(userId);
});

const updateUserProfile = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  console.log("updateUserProfile, user id :", userId);
  res.send(userId);
});

export { getUserProfile, updateUserProfile, createUserProfile };
