const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../utils/multerConfig");
const Restaurant = require("../models/Restaurant");
const Orders = require("../models/Orders");
const { registerRestaurant } = require("../controllers/restaurantController");

// restaurantRoutes.js
router.post(
  "/register-partner",
  upload.fields([
    { name: "images", maxCount: 20 }, // for images
    { name: "menuImages", maxCount: 20 }, // for menu images
    { name: "fssai", maxCount: 1 },
    { name: "gst", maxCount: 1 },
    { name: "shopAct", maxCount: 1 },
    { name: "bankProof", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log(req.files); // Debugging: Log uploaded files
    next();
  },
  registerRestaurant
);

router.get("/orders", auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user.userId,
    }).select("_id");

    const orders = await Orders.find({ restaurantId: restaurant._id })
      .populate("restaurantId", "restaurantName")
      .populate("addressId", "label address")
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      restaurant: order.restaurantId?.restaurantName || "N/A",
      items: order.items.map((item) => ({
        name: item.name,
        price: item.price,
        category: item.category,
        img: item.imageUrl,
        qty: item.qty,
      })),
      total: order.total,
      status: order.status,
      date: order.date,
      address: order.addressId || {},
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/details", auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user.userId,
    }).select("restaurantName, address");

    res.status(200).json({ restaurant });
  } catch (err) {
    console.error("Error fetching restaurant details: ", err);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.get("/menu", auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user.userId,
    }).select("menu openTime closeTime openDays");

    res.status(200).json({ restaurant });
  } catch (error) {
    console.error("Error fetching restaurant details: ", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.delete("/menu/delete/", auth, async (req, res) => {
  const { name } = req.body;

  try {
    const restaurant = await Restaurant.findOne({ owner: req.user.userId });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    restaurant.menu = restaurant.menu.filter((dish) => dish.name != name);

    await restaurant.save();
    res.status(200).json({ message: "Item removed successfully." });
  } catch (error) {
    console.error("Remove dish error:", error);
    res.status(500).json({ message: "Server error while removing dish." });
  }
});

router.put("/menu/update", auth, async (req, res) => {
  const { originalName, name, price, category, imgUrl } = req.body;

  try {
    const restaurant = await Restaurant.findOne({ owner: req.user.userId });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found." });

    const dish = restaurant.menu.find((item) => item.name === originalName);
    if (!dish) return res.status(404).json({ message: "Dish not found." });

    dish.name = name;
    dish.category = category;
    dish.price = price;
    dish.imgUrl = imgUrl;

    await restaurant.save();
    res.status(200).json({ message: "Dish updated successfully" });
  } catch (err) {
    console.error("Error in updating dish: ", err);
    res
      .status(500)
      .json({ message: "Internal Server Error while updating dish" });
  }
});

module.exports = router;
