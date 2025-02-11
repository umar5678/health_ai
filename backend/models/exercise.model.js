import mongoose, { Schema } from "mongoose";

const exerciseSchema = Schema({
  day: { type: Number, required: true },
  exercise: { type: String, required: true },
  setsAndVariation: [{ type: mongoose.Schema.Types.Mixed, required: true }],
});

const exerciseRoutineSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routineName: { type: String, default: "My Workout Routine" },
    days: [exerciseSchema],
  },
  { timestamps: true }
);

export const ExerciseRoutine = mongoose.model(
  "ExerciseRoutine",
  exerciseRoutineSchema
);
