import express from "express";

const router = express.Router();

import {
  createExerciseRoutine,
  getUserExerciseRoutine,
  updateExercisePlan
} from "../controllers/exercise.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router
  .route("/:userId")
  .post(verifyToken, createExerciseRoutine)
  .put(verifyToken, updateExercisePlan)
  .get(verifyToken, getUserExerciseRoutine);

// this will create and update exercise routine , when update , previous routine will be deleted

export default router;
