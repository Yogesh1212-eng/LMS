import express from "express";
import { enrollCourse, getMyCourses, unenrollCourse } from "../controllers/enrollmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("student"),
    enrollCourse
);

router.get(
    "/my-courses",
    authMiddleware,
    roleMiddleware("student"),
    getMyCourses
);

router.delete(
    "/:courseId",
    authMiddleware,
    roleMiddleware("student"),
    unenrollCourse
);
export default router;