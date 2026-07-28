import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

// Course route register
app.use("/api/course", courseRoutes);
app.use("/api/certificate", certificateRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});