import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ success: true, message: "LearnHub API is running" }));
app.get("/api/health", (req, res) => res.json({ success: true, message: "API healthy" }));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || "Server error" });
});

const PORT = Number(process.env.PORT || 5000);

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing in backend/.env");
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in backend/.env");

    await mongoose.connect(process.env.MONGO_URI, { dbName: "learnhub" });
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
    app.listen(PORT, () => {
      console.log(`LearnHub API running on http://localhost:${PORT}`);
      console.log(`JWT_SECRET loaded: ${Boolean(process.env.JWT_SECRET)}`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
};

startServer();
