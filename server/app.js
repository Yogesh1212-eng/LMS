import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const app = express();

app.use(cors({
    origin: "https://lms-5-k9q6.onrender.com/",
    credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/lecture", lectureRoutes);
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/progress", progressRoutes);


app.get("/", (req, res) => {
  res.send("LMS API Running");
});

export default app;
