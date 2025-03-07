import { User } from "../models/user.model.js";
import { DietPlan } from "../models/diet.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createDietPlan = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { planName = "My Diet Plan", days } = req.body;

  // Input validation (check days array structure)
  if (!days || !Array.isArray(days) || days.length !== 7) {
    throw new ApiError(400, "Days array must be provided and contain 7 days.");
  }

  days.forEach((day) => {
    if (!day.meals || !Array.isArray(day.meals)) {
      throw new ApiError(400, "Each day must have a 'meals' array.");
    }
  });

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Delete previous diet plans for the user
  await DietPlan.deleteMany({ userId });

  const newDietPlan = new DietPlan({
    userId,
    planName,
    days,
  });

  const savedDietPlan = await newDietPlan.save();

  await User.findByIdAndUpdate(userId, {
    dietPlans: [savedDietPlan._id],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, savedDietPlan, "Diet plan created."));
});

const getDietPlan = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).populate({
    path: "dietPlans",
    model: "DietPlan",
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (!user.dietPlans || user.dietPlans.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No diet plan found for this user.")); // 204 No Content is also a good option
  }

  const dietPlan = user.dietPlans[0]; // Assuming user has only one diet plan

  return res
    .status(200)
    .json(new ApiResponse(200, dietPlan, "Diet plan retrieved successfully."));
});

const updateDietPlan = AsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const dietPlanId = req.body.dietPlanData._id;
  const { planName = "My Diet Plan", dietPlanData } = req.body;


  if (!dietPlanId) {
    throw new ApiError(400, "Diet plan ID is required for update.");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const existingDietPlan = await DietPlan.findOne({
    userId,
  });
  if (!existingDietPlan) {
    throw new ApiError(404, "Diet plan not found.");
  }

  if (existingDietPlan.userId.toString() !== userId) {
    // Important security check
    throw new ApiError(403, "You are not authorized to update this diet plan.");
  }

  const planToUpdate = existingDietPlan.days?.find(
    (Plan) => Plan._id.toString() === dietPlanId
  );

  const planToUpdateIndex = existingDietPlan.days.findIndex(
    (plan) => plan._id.toString() === dietPlanId
  );

  if (planToUpdateIndex === -1) {
    throw new ApiError(404, "Specific Diet plan not found for this id.");
  }

  existingDietPlan.days[dietPlanData.day] = dietPlanData;
  existingDietPlan.markModified("days");

  const updatedDietPlan = await existingDietPlan.save(); // Save the entire document

  if (!updatedDietPlan) {
    throw new ApiError(500, "Failed to update diet plan.");
  }

  // i khow i am returning aenire document, ant its a bad practice,
  //  i will improve this in future

  return res
    .status(200)
    .json(new ApiResponse(200, updatedDietPlan, "Diet plan updated."));
});

export { getDietPlan, createDietPlan, updateDietPlan };
