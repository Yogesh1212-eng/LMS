import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.post(
  "/:quizId",
  authMiddleware,
  roleMiddleware("teacher"),
  addQuestion
);

router.get(
  "/:quizId",
  authMiddleware,
  roleMiddleware("teacher"),
  getQuestions
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  updateQuestion
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  deleteQuestion
);

export default router;