import express from "express";
import { addReview, getCourseReviews } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("student"),
    addReview
);
router.get("/:courseId", getCourseReviews);

export default router;