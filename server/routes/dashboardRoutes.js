import express from "express";
import { teacherDashboard } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getStudentDashboard } from "../controllers/dashboardController.js";


const router = express.Router();

router.get(
    "/teacher",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    teacherDashboard
);


router.get(
  "/student",
  authMiddleware,
  roleMiddleware("student"),
  getStudentDashboard
);



export default router;