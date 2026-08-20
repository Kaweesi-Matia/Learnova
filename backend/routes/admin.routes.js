import { Router } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Category from "../models/Category.js";
import Review from "../models/Review.js";
import Enrollment from "../models/Enrollment.js";
import { auth, roles } from "../middleware/auth.js";

const r = Router();
r.use(auth, roles("ADMIN"));

r.get("/stats", async (req, res, next) => {
  try {
    const [users, students, instructors, courses, enrollments, reviews, revenue] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "STUDENT" }),
      User.countDocuments({ role: "INSTRUCTOR" }),
      Course.countDocuments(),
      Enrollment.countDocuments(),
      Review.countDocuments(),
      Enrollment.aggregate([
        { $lookup: { from: "courses", localField: "course", foreignField: "_id", as: "course" } },
        { $unwind: { path: "$course", preserveNullAndEmptyArrays: true } },
        { $group: { _id: null, total: { $sum: { $ifNull: ["$course.price", 0] } } } },
      ]),
    ]);
    res.json({ users, students, instructors, courses, enrollments, reviews, revenue: revenue[0]?.total || 0 });
  } catch (e) { next(e); }
});

r.get("/users", async (req, res, next) => {
  try {
    const search = String(req.query.search || "").trim();
    const role = String(req.query.role || "").trim();
    const q = {};
    if (search) q.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
    if (role) q.role = role;
    const users = await User.find(q).select("-password").sort({ createdAt: -1 }).limit(500);
    res.json({ users, count: users.length });
  } catch (e) { next(e); }
});

r.put("/users/:id", async (req, res, next) => {
  try {
    const allowed = {};
    if (req.body.name !== undefined) allowed.name = req.body.name;
    if (req.body.role !== undefined) allowed.role = req.body.role;
    if (req.body.isApproved !== undefined) allowed.isApproved = Boolean(req.body.isApproved);
    const user = await User.findByIdAndUpdate(req.params.id, allowed, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (e) { next(e); }
});

r.delete("/users/:id", async (req, res, next) => {
  try {
    if (String(req.user._id) === String(req.params.id)) return res.status(400).json({ message: "You cannot delete your own admin account" });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (e) { next(e); }
});

r.get("/courses", async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate("category", "name slug")
      .populate("instructor", "name email")
      .sort({ createdAt: -1 }).limit(500);
    res.json({ courses, count: courses.length });
  } catch (e) { next(e); }
});

r.put("/courses/:id", async (req, res, next) => {
  try {
    const allowed = {};
    ["title","description","thumbnail","level","price","duration","published","category","instructor","objectives","requirements"].forEach(k => {
      if (req.body[k] !== undefined) allowed[k] = req.body[k];
    });
    const course = await Course.findByIdAndUpdate(req.params.id, allowed, { new: true, runValidators: true })
      .populate("category", "name slug").populate("instructor", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ course });
  } catch (e) { next(e); }
});

r.delete("/courses/:id", async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    await Review.deleteMany({ course: course._id });
    await Enrollment.deleteMany({ course: course._id });
    res.json({ message: "Course deleted" });
  } catch (e) { next(e); }
});

r.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ categories });
  } catch (e) { next(e); }
});

r.post("/categories", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const description = String(req.body.description || "").trim();
    if (!name) return res.status(400).json({ message: "Category name is required" });
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const category = await Category.create({ name, slug, description });
    res.status(201).json({ category });
  } catch (e) { next(e); }
});

r.put("/categories/:id", async (req, res, next) => {
  try {
    const allowed = {};
    if (req.body.name !== undefined) {
      const name = String(req.body.name).trim();
      allowed.name = name;
      allowed.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }
    if (req.body.description !== undefined) allowed.description = req.body.description;
    const category = await Category.findByIdAndUpdate(req.params.id, allowed, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ category });
  } catch (e) { next(e); }
});

r.delete("/categories/:id", async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const used = await Course.exists({ category: id });
    if (used) return res.status(409).json({ message: "This category is used by one or more courses" });
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (e) { next(e); }
});

r.get("/reviews", async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("student", "name email")
      .populate("course", "title")
      .sort({ createdAt: -1 }).limit(500);
    res.json({ reviews });
  } catch (e) { next(e); }
});

r.delete("/reviews/:id", async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (e) { next(e); }
});

export default r;
