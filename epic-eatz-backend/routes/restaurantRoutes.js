const express = require("express");
const Restaurant = require("../models/Restaurant"); // Import the Restaurant model

const router = express.Router();

// 🟢 GET all restaurants
router.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate("menu"); // Fetch restaurants with food items
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🔵 GET a single restaurant by ID
router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate("menu");
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🟠 POST - Add a new restaurant
router.post("/", async (req, res) => {
    const { name, rating, menu } = req.body;
    const newRestaurant = new Restaurant({ name, rating, menu });

    try {
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 🔴 DELETE a restaurant
router.delete("/:id", async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: "Restaurant deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
