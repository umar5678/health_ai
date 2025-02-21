import express from "express";

const router = express.Router();

import {
  createDietPlan,
  getDietPlan,
  updateDietPlan
} from "../controllers/diet.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router
  .route("/:userId")
  .post(verifyToken, createDietPlan)
  .get(verifyToken, getDietPlan)
  .put(verifyToken, updateDietPlan)

export default router;
