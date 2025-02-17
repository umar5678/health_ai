import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uplaodProfileImg } from "../helpers/uploadProfileImg.js";

const getCurrentUser = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  console.log("get user called");

  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, { user }, "User fetched"));
});

const createUserProfile = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const avatar = req.file; // From multer middleware
  const body = req.body; // Other form data fields

  // Create an object to hold the data to update the user
  let updateData = {};

  // Handle avatar if present
  if (avatar) {
    const uploadResult = await uplaodProfileImg(avatar);

    if (uploadResult.success) {
      updateData = {
        ...updateData,
        avatar: { url: uploadResult.result.url, localPath: "" },
      };
    } else {
      throw new ApiError(400, `${uploadResult.message}`);
    }
  }

  // Iterate over each key in the request body
  for (const key in body) {
    let value = body[key];

    // Attempt to parse the value, in case it's a JSON string representing an array
    try {
      const parsedValue = JSON.parse(value);
      // If the parsed value is an array, assign it to updateData
      if (Array.isArray(parsedValue)) {
        updateData[key] = parsedValue;
        continue; // Move to the next key
      }
    } catch (error) {
      // If parsing fails, it means value is a regular string, so we'll just assign it as is.
    }

    updateData[key] = value;
  }

  // Mark profile as complete
  updateData.isProfileSetupDone = true;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateData, // Use the updateData object
      },
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
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
      throw new ApiError(400, error.message);
    }
    console.error("Error creating/updating profile:", error);
    throw new ApiError(500, "Failed to create/update profile");
  }
});

const updateUserProfile = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const avatar = req.file; // From multer middleware
  const body = req.body; // Other form data fields

  // Create an object to hold the data to update the user
  let updateData = {};

  // Handle avatar if present
  if (avatar) {
    const uploadResult = await uplaodProfileImg(avatar);

    if (uploadResult.success) {
      updateData = {
        ...updateData,
        avatar: { url: uploadResult.result.url, localPath: "" },
      };
    } else {
      throw new ApiError(400, `${uploadResult.message}`);
    }
  }

  // Iterate over each key in the request body
  for (const key in body) {
    let value = body[key];

    // Attempt to parse the value, in case it's a JSON string representing an array
    try {
      const parsedValue = JSON.parse(value);
      // If the parsed value is an array, assign it to updateData
      if (Array.isArray(parsedValue)) {
        updateData[key] = parsedValue;
        continue; // Move to the next key
      }
    } catch (error) {
      // If parsing fails, it means value is a regular string, so we'll just assign it as is.
    }

    updateData[key] = value;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateData, // Use the updateData object
      },
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, { user: updatedUser }, "User profile updated")
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
