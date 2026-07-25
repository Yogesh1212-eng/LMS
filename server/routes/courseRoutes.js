import express from "express";
import {createCourse, getAllCourses, getSingleCourse} from "../controllers/courseController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    "/create",
    authMiddleware,
    roleMiddleware("teacher","admin"),
    createCourse
);

router.get("/",getAllCourses);
router.get("/:id", getSingleCourse);

export default router;
