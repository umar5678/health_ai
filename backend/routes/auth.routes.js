import express from "express";

const router = express.Router();

import {
  register,
  login,
  logout,
  verify,
  refreshAccessToken,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(verifyToken, logout);
router.route("/verify").get(verifyToken, verify);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
