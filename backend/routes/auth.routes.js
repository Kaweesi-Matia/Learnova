import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const r = Router();

const token = (u) =>
  jwt.sign(
    { id: u._id, role: u.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
});

r.post("/register", async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (await User.findOne({ email })) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const u = await User.create({
      name: String(name).trim(),
      email,
      password: await bcrypt.hash(password, 12),
    });

    res.status(201).json({ token: token(u), user: publicUser(u) });
  } catch (e) {
    next(e);
  }
});

r.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const u = await User.findOne({ email }).select("+password");

    if (!u || !(await bcrypt.compare(password, u.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ token: token(u), user: publicUser(u) });
  } catch (e) {
    next(e);
  }
});

/*
 * Forgot password
 *
 * The email is intentionally not revealed as registered/not registered.
 * In local development, a reset URL is returned so the feature can be
 * tested without configuring an email provider. In production, connect
 * this token to an email service and do not return resetUrl to the client.
 */
r.post("/forgot-password", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const generic = {
      message: "If an account exists for that email, a password reset link has been created.",
    };

    const u = await User.findOne({ email }).select("+resetPasswordToken +resetPasswordExpires");

    if (!u) {
      return res.json(generic);
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    u.resetPasswordToken = hashedToken;
    u.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000);
    await u.save();

    const frontendUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const resetUrl = `${frontendUrl}/reset-password/${rawToken}`;

    if (process.env.NODE_ENV !== "production") {
      return res.json({ ...generic, resetUrl });
    }

    return res.json(generic);
  } catch (e) {
    next(e);
  }
});

r.post("/reset-password/:resetToken", async (req, res, next) => {
  try {
    const resetToken = String(req.params.resetToken || "");
    const password = String(req.body.password || "");
    const confirmPassword = String(req.body.confirmPassword || "");

    if (!resetToken) {
      return res.status(400).json({ message: "Invalid reset link" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const u = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    }).select("+password +resetPasswordToken +resetPasswordExpires");

    if (!u) {
      return res.status(400).json({
        message: "This password reset link is invalid or has expired. Please request a new one.",
      });
    }

    u.password = await bcrypt.hash(password, 12);
    u.resetPasswordToken = undefined;
    u.resetPasswordExpires = undefined;
    await u.save();

    res.json({ message: "Password reset successfully. You can now sign in." });
  } catch (e) {
    next(e);
  }
});

r.get("/me", auth, async (req, res) => res.json({ user: req.user }));
r.post("/logout", (req, res) => res.json({ message: "Logged out" }));

export default r;
