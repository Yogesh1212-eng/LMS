import express from "express";
import { createLecture,getCourseLectures, getLectureById, updateLecture, deleteLecture} from "../controllers/lectureController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = express.Router();

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("teacher","admin"),
    createLecture
);

router.get("/:courseId", getCourseLectures);
router.get("/single/:id", getLectureById);
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    updateLecture
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    deleteLecture
);

export default router;