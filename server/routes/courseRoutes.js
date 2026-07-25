import express from "express";
import {createCourse, getAllCourses, getSingleCourse,updateCourse,deleteCourse} from "../controllers/courseController.js";
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

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher","admin"),
    updateCourse
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher","admin"),
    deleteCourse
);

export default router;
