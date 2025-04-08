const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ✅ Missing import added
const User = require("../models/User");
require("dotenv").config(); // ✅ Ensure env variables are loaded

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User Found:", user); // Debugging

    // Generate JWT Token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env file!");
      return res
        .status(500)
        .json({ message: "Server error: JWT Secret is missing" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error("Error in Login Route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    console.log("User Registered:", newUser); // Debugging

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in Signup Route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
