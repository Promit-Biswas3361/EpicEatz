const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

// Get All Food Items
router.get("/", async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a New Food Item (Admin)
router.post("/", async (req, res) => {
  try {
    const foodItem = new Food(req.body);
    await foodItem.save();
    res.status(201).json({ message: "Food item added", foodItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
