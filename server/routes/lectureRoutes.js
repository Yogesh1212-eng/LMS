import express from "express";
import {
  createLecture,
  getCourseLectures,
  getLectureById,
  updateLecture,
  deleteLecture,
} from "../controllers/lectureController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/:courseId",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  upload.single("video"),
  createLecture
);

router.get("/:courseId", getCourseLectures);

router.get("/single/:id", getLectureById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  upload.single("video"),
  updateLecture
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  deleteLecture
);

export default router;