import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getCurrentUser = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, { user }, "User fetched"));
});

const createUserProfile = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const {
    height,
    weight,
    age,
    gender,
    country,
    activityLevel,
    goal, // Corrected to weightGoals (plural)
    dietaryPreferences,
    allergies,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          height,
          weight,
          age,
          gender,
          country,
          activityLevel,
          goal, 
          dietaryPreferences,
          allergies,
          isProfileSetupDone: true, // Mark profile as complete
        },
      },
      { new: true, runValidators: true } // Return updated user and validate
    ).select("-password -accessToken")

    if (!updatedUser) {
      throw new ApiError(404, "User not found"); // Handle if user doesn't exist
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { user: updatedUser },
          "User profile created/updated"
        )
      );
  } catch (error) {
    if (error.name === "ValidationError") {
      // Mongoose validation error (e.g., incorrect enum values)
      throw new ApiError(400, error.message);
    }
    // Other errors (e.g., database errors)
    console.error("Error creating/updating profile:", error);
    throw new ApiError(500, "Failed to create/update profile");
  }
});

const updateUserProfile = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const {
    height,
    weight,
    age,
    gender,
    country,
    activityLevel,
    goal,
    dietaryPreferences,
    allergies,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          height,
          weight,
          age,
          gender,
          country,
          activityLevel,
          goal,
          dietaryPreferences,
          allergies,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { user: updatedUser }, "User profile updated")
      );
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new ApiError(400, error.message);
    }
    console.error("Error updating profile:", error);
    throw new ApiError(500, "Failed to update profile");
  }
});

export { getCurrentUser, updateUserProfile, createUserProfile };
