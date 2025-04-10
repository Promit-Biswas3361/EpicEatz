const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../utils/multerConfig");
const Restaurant = require("../models/Restaurant")
const Orders = require("../models/Orders");
const { registerRestaurant } = require("../controllers/restaurantController");

// restaurantRoutes.js
router.post(
  "/register-partner",
  auth,
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

module.exports = router;
