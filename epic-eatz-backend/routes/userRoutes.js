const express = require("express");
const auth = require("../middleware/auth"); // ✅ Import middleware
const User = require("../models/User");

const router = express.Router();

// ✅ Protected Route: Get User Profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
console.log("✅ userRoutes.js loaded");
module.exports = router;

