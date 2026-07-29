import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { downloadCertificate, getMyCertificates } from "../controllers/certificateController.js";

const router = express.Router();

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("student"),
  getMyCertificates
);

router.get(
  "/:courseId",
  authMiddleware,
  roleMiddleware("student"),
  downloadCertificate
);

export default router;