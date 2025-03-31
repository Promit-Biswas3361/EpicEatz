const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem"); 
const Restaurant = require("../models/Restaurant");

// Search API
router.get("/", async (req, res) => {
  try {
    const { q, type } = req.query; // Get search query and type from request

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    let results = [];

    if (type === "dish") {
      results = await FoodItem.find({ name: { $regex: q, $options: "i" } }); // Case-insensitive search
    } else if (type === "restaurant") {
      results = await Restaurant.find({ name: { $regex: q, $options: "i" } });
    } else {
      return res.status(400).json({ message: "Invalid search type" });
    }

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
