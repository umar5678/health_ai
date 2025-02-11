import mongoose, { Schema } from "mongoose";

const mealSchema = Schema({
  mealName: { type: String, required: true },
  foodItems: [{ type: String, required: true }],
});

const dietPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: { type: String, default: "My Diet Plan" }, // Add a name for the plan
    days: [
      {
        day: { type: Number, required: true },
        meals: [mealSchema], // Array of meal objects
      },
    ],
  },
  { timestamps: true }
);

export const DietPlan = mongoose.model("DietPlan", dietPlanSchema);
