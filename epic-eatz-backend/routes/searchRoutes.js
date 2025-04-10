// routes/dish.js or wherever your routes are defined
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// Get dish by name (partial, case-insensitive)
router.get("/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const regex = new RegExp(name, "i"); // case-insensitive match

    // Find all restaurants that have matching dishes in their menu
    const restaurants = await Restaurant.find({
      menu: { $elemMatch: { name: regex } },
    });

    // Build a result containing only matching dishes
    const result = restaurants.map((restaurant) => ({
      restaurant_name: restaurant.restaurantName,
      restaurantId: restaurant._id,
      restaurant_rating: restaurant.restaurantRating,
      item: restaurant.menu.filter((item) => regex.test(item.name)),
    }));

    res.json(result);
  } catch (err) {
    console.error("Error fetching dish:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
