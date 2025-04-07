const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const upload = require("../utils/multerConfig");
const { handleStep1, handleStep2 } = require("../controllers/userController");

const router = express.Router();

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Step 1: Restaurant Info, Owner Info, Address
router.post("/step1", auth, handleStep1);



// ✅ Step 2: Menu and Operational Details Submission
router.post(
  "/step2",
  auth, // Get user ID from token
  upload.array("images", 20), // Accept up to 20 files from form
  handleStep2
);

console.log("✅ userRoutes.js loaded");
module.exports = router;
