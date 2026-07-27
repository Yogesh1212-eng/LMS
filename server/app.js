import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/lecture", lectureRoutes);
app.use("/api/enroll", enrollmentRoutes);

app.get("/", (req, res) => {
  res.send("LMS API Running");
});

export default app;