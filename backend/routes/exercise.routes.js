import express from "express";

const router = express.Router();

import {
  createExerciseRoutine,
  getUserExerciseRoutine,
} from "../controllers/exercise.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router
  .route("/:userId")
  .post(verifyToken, createExerciseRoutine)
  .get(verifyToken, getUserExerciseRoutine);

// this will create and update exercise routine , when update , previous routine will be deleted

export default router;
