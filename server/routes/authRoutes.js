import express from "express";
import {registerUser,loginUser,getProfile,adminDashboard} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router=express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/profile",authMiddleware,getProfile);
router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    adminDashboard
);


export default router; 
