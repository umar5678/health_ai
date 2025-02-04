import mongoose from "mongoose";

const allergyEnums = [
  "Dairy",
  "Eggs",
  "Wheat",
  "Soy",
  "Tree Nuts",
  "Peanuts",
  "Shellfish",
  "Fish",
  "Gluten",
  "Lactose",
  "Other",
];

const dietaryPrefEnums = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Paleo",
  "Keto",
  "Intermittent Fasting",
  "Low-Carb",
  "High-Protein",
  "Gluten-Free",
  "Lactose-Free",
  "Other",
];

const weightGoalsEnums = ["loseFat", "maintain", "buildMuscle"];

const activityLevelEnums = [
  "sedentary",
  "light",
  "moderate",
  "heavy",
  "extreme",
];

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  height: { type: Number },

  weight: { type: Number },

  age: { type: Number },

  gender: { type: String, enum: ["male", "female", "other"] },

  country: { type: String },

  dietPlan: { type: String },

  exerciseRoutine: { type: String },

  dietaryPreferences: [{ type: String, enum: dietaryPrefEnums }],

  allergies: [{ type: String, enum: allergyEnums }],

  activityLevel: { type: String, enum: activityLevelEnums },

  weightGoals: { type: String, enum: weightGoalsEnums },

  // ... other profile fields
});

export const UserProfile = mongoose.model("UserProfile", userProfileSchema);
