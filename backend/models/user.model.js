import dotenv from "dotenv";
dotenv.config();
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserLoginType, AvailableSocialLogins } from "../constants.js";
import {
  activityLevelEnums,
  weightGoalsEnums,
  dietaryPrefEnums,
  allergyEnums,
} from "../config/enums.js";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://via.placeholder.com/200x200.png`,
        localPath: "",
      },
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    refreshToken: { type: String },
    loginType: {
      type: String,
      enum: AvailableSocialLogins,
      default: UserLoginType.EMAIL_PASSWORD,
    },
    isProfileSetupDone: { type: Boolean, default: false },

    // Embedded Profile Information (merged)
    height: { type: Number },
    weight: { type: Number },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    country: { type: String },
    dietPlan: { type: String }, // Consider renaming to currentDietPlan if you'll store multiple plans
    exerciseRoutine: { type: String }, // Consider renaming to currentExerciseRoutine
    dietaryPreferences: [{ type: String, enum: dietaryPrefEnums }],
    allergies: [{ type: String, enum: allergyEnums }],
    activityLevel: { type: String, enum: activityLevelEnums },
    goal: { type: String, enum: weightGoalsEnums },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
