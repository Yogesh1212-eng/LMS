import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

// Course & Certificate routes
app.use("/api/course", courseRoutes);
app.use("/api/certificate", certificateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});