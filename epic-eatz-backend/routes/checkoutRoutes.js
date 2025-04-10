const express = require("express");
const auth = require("../middleware/auth");
const Orders = require("../models/Orders");
const Cart = require("../models/Cart");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const userId = req.user.userId;
  const { addressId, restaurantId, items, total, paymentMethod } = req.body;

  if (!addressId || !restaurantId || !items || !total || !paymentMethod) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const newOrder = new Orders({
      userId,
      restaurantId,
      items,
      total,
      paymentMethod,
      addressId,
    });

    await newOrder.save();
    await Cart.findOneAndDelete({userId: userId});
    res
      .status(200)
      .json({ message: "Order placed successfully. ", order: newOrder });
  } catch (error) {
    console.error("Error placing order: ", error);
    res.status(500).json({ message: "Server error while placing order." });
  }
});

module.exports = router;
