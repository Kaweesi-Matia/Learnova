import { Router } from "express";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import Category from "../models/Category.js";
import { auth, roles } from "../middleware/auth.js";

const r = Router();

r.get("/meta/categories", async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 }).select("name slug description");
    res.json({ categories });
  } catch (e) {
    next(e);
  }
});

r.get("/", async (req, res, next) => {
  try {
    const { search = "", level = "", category = "", sort = "", minPrice, maxPrice } = req.query;
    const q = { published: true };

    if (search.trim()) {
      q.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }
    if (level) q.level = level;
    if (category) {
      const categoryDoc = await Category.findOne({
        $or: [
          { slug: category.toLowerCase().trim() },
          { name: { $regex: `^${category.trim()}$`, $options: "i" } },
          { name: { $regex: category.trim(), $options: "i" } },
        ],
      }).select("_id");
      if (categoryDoc) q.category = categoryDoc._id;
      else q.category = new mongoose.Types.ObjectId();
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      q.price = {};
      if (minPrice !== undefined && minPrice !== "") q.price.$gte = Number(minPrice);
      if (maxPrice !== undefined && maxPrice !== "") q.price.$lte = Number(maxPrice);
    }

    let sortBy = { createdAt: -1 };
    if (sort === "popular") sortBy = { studentsCount: -1 };
    if (sort === "rating") sortBy = { rating: -1, reviewCount: -1 };
    if (sort === "price-low") sortBy = { price: 1 };
    if (sort === "price-high") sortBy = { price: -1 };

    const courses = await Course.find(q)
      .populate("category", "name slug")
      .populate("instructor", "name avatar bio")
      .sort(sortBy)
      .limit(100);

    res.json({ courses, count: courses.length });
  } catch (e) {
    next(e);
  }
});

r.get("/:id", async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("category", "name slug")
      .populate("instructor", "name avatar bio");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ course });
  } catch (e) {
    next(e);
  }
});

r.post("/", auth, roles("INSTRUCTOR", "ADMIN"), async (req, res, next) => {
  try {
    const c = await Course.create({ ...req.body, instructor: req.user._id });
    res.status(201).json({ course: c });
  } catch (e) {
    next(e);
  }
});

r.put("/:id", auth, roles("INSTRUCTOR", "ADMIN"), async (req, res, next) => {
  try {
    const c = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!c) return res.status(404).json({ message: "Course not found" });
    res.json({ course: c });
  } catch (e) {
    next(e);
  }
});

r.delete("/:id", auth, roles("INSTRUCTOR", "ADMIN"), async (req, res, next) => {
  try {
    const c = await Course.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (e) {
    next(e);
  }
});

export default r;
