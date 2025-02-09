import dotenv from "dotenv";
dotenv.config();
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserLoginType, AvailableSocialLogins } from "../constants.js";

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
        url: `https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=`,
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

    profile: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
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
