import { User } from "../models/user.model.js";
import { ExerciseRoutine } from "../models/exercise.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createExerciseRoutine = AsyncHandler(async (req, res) => {
  const userId = req.params.userId; // Get userId from URL parameters
  const { routineName = "My Workout Routine", days } = req.body; // Get routineName and days from body, default routineName ,
  // days = array of 7 objects

  if (!days || !Array.isArray(days) || days.length !== 7) {
    throw new ApiError(400, "Days array must be provided and contain 7 days.");
  }

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Delete previous routines (if any)
  await ExerciseRoutine.deleteMany({ userId }); // Delete all routines for this user

  const savedRoutine = await ExerciseRoutine.create({
    userId,
    routineName,
    days,
  });

  // Update the user's exerciseRoutines array (important!)
  await User.findByIdAndUpdate(userId, {
    exerciseRoutines: [savedRoutine._id], // Replace the array with the new routine ID
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { savedRoutine }, "Exercise Routine Created"));
});

const getUserExerciseRoutine = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  // Find the user and populate their exerciseRoutines (crucial!)
  const user = await User.findById(userId).populate({
    path: "exerciseRoutines", // Name of the field to populate
    model: "ExerciseRoutine", // Model to use for population
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (!user.exerciseRoutines || user.exerciseRoutines.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "No exercise routine found for this user.")
      ); // Or a 204 No Content
  }

  // Assuming a user can have only one routine (as per your create controller)
  const exerciseRoutine = user.exerciseRoutines[0]; // Access the first element of the array

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        exerciseRoutine,
        "Exercise routine retrieved successfully."
      )
    );
});

export { createExerciseRoutine, getUserExerciseRoutine };
