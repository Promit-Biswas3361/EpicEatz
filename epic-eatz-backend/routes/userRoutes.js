const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Orders = require("../models/Orders");
const Address = require("../models/Address")

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

router.get("/orders", auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Orders.find({ userId })
      .populate("restaurantId", "restaurantName")
      .populate("addressId", "label address")
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

// Cancel a user's order (only if it's still Pending)
router.put("/orders/:orderId/cancel", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.orderId;

    const order = await Orders.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Only pending orders can be cancelled." });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
