import express from "express";

const router = express.Router();

import {
  createDietPlan,
  getDietPlan,
} from "../controllers/diet.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router
  .route("/:userId")
  .post(verifyToken, createDietPlan)
  .get(verifyToken, getDietPlan);

export default router;
