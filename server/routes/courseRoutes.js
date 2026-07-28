import express from "express";
import {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    getMyCourses
} from "../controllers/courseController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  upload.single("thumbnail"),
  createCourse
);

router.get("/", getAllCourses);

router.get(
  "/my-courses",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  getMyCourses
);

router.get("/:id", getSingleCourse);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  upload.single("thumbnail"),
  updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher", "admin"),
  deleteCourse
);



export default router;