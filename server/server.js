import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

const PORT = process.env.PORT || 5000;
app.use("/api/course", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});