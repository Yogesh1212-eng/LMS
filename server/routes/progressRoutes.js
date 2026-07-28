import express from "express";

import {
  markLectureComplete,
  getProgress,
} from "../controllers/progressController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/complete/:lectureId",
  authMiddleware,
  roleMiddleware("student"),
  markLectureComplete
);

router.get(
  "/:courseId",
  authMiddleware,
  roleMiddleware("student"),
  getProgress
);

export default router;