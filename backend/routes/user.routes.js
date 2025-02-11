import express from "express";

const router = express.Router();

import {
  getCurrentUser,
  updateUserProfile,
  createUserProfile,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router.route("/:userId").get(verifyToken, getCurrentUser);
router
  .route("/profile/:userId")
  .post(verifyToken, createUserProfile)
  .put(verifyToken, updateUserProfile);

export default router;

// router.route("/profile/:userId").get(verifyToken, getUserProfile);
