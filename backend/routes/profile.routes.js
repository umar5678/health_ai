import express from "express";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/profile.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// get Profile

router.route("/:userId").get(verifyToken, getUserProfile);
router.route("/:userId/create").post(verifyToken, createUserProfile);
router.route("/:userId/update").post(verifyToken, updateUserProfile);

export default router;
