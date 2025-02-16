import express from "express";
import { upload } from "../config/multer.config.js";

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
  .post(verifyToken, upload.single("avatar"), createUserProfile)
  .put(verifyToken, upload.single("avatar"), updateUserProfile);

export default router;

// router.route("/profile/:userId").get(verifyToken, getUserProfile);
