import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, passwordHash, role: "patient" });
    await newUser.save();

    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});
 
// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token, role: user.role });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
