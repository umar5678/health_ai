import express from "express";
import passport from "passport";

const router = express.Router();

import {
  register,
  login,
  logout,
  verify,
  refreshAccessToken,
  handleSocialLogin,
  forgetPasswordReq,
  resetForgottenPassword,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(verifyToken, logout);
router.route("/verify").get(verifyToken, verify);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(forgetPasswordReq);
router.route("/rest-password/:token").post(resetForgottenPassword);

// router.route("/change-password").post(verifyToken, changePassword)
// verify email get req

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }), () =>
    console.log("called")
  );
router
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    handleSocialLogin
  );

export default router;
