import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createQuiz,
  addQuestion,
  getQuizByCourse,
  getQuizQuestions,
  submitQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

// Create Quiz
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("teacher"),
  createQuiz
);

// Add Question
router.post(
  "/:quizId/question",
  authMiddleware,
  roleMiddleware("teacher"),
  addQuestion
);

router.get(
  "/course/:courseId",
  authMiddleware,
  roleMiddleware("student"),
  getQuizByCourse
);

router.get(
  "/:quizId/questions",
  authMiddleware,
  roleMiddleware("student"),
  getQuizQuestions
);

router.post(
  "/:quizId/submit",
  authMiddleware,
  roleMiddleware("student"),
  submitQuiz
);


export default router;