import express from "express";

const router = express.Router();

import { getCurrentUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router.route("/:userId").get(verifyToken, getCurrentUser);

export default router;
