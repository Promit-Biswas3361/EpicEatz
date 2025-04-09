const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Orders = require("../models/Orders");
const Address = require("../models/Address");
const Favourite = require("../models/Favourite");
const bcrypt = require("bcryptjs");

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
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled." });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-password", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { newPassword } = req.body;

    const hashedPass = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPass });
    res.status(200).json({ message: "Password updates successfully." });
  } catch (error) {
    console.error("Error updating password: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all addresses for logged-in user
router.get("/addresses", auth, async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.userId });
    res.status(200).json({ addresses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
});

// Add new address
router.post("/add-address", auth, async (req, res) => {
  try {
    const { label, type, address, phone } = req.body;

    const newAddress = new Address({
      userId: req.user.userId,
      label,
      type,
      address,
      phone,
    });

    await newAddress.save();
    res.status(201).json({ address: newAddress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add address" });
  }
});

// Update address
router.put("/address/update/:id", auth, async (req, res) => {
  try {
    const addressId = req.params.id;

    const updated = await Address.findOneAndUpdate(
      { _id: addressId, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ address: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update address" });
  }
});

// Delete address
router.delete("/address/delete/:id", auth, async (req, res) => {
  try {
    const addressId = req.params.id;

    const deleted = await Address.findOneAndDelete({
      _id: addressId,
      userId: req.user.userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete address" });
  }
});

router.get("/favourites", auth, async (req, res) => {
  try {
    const favourites = await Favourite.find({
      userId: req.user.userId,
    }).populate("restaurantId", "restaurantName restaurantRating");

    const formattedFavourites = favourites.map((favourite) => ({
      id: favourite._id,
      restaurant_name: favourite.restaurantId?.restaurantName || "N/A",
      restaurant_rating: favourite.restaurantId?.restaurantRating || 0,
      item: {
        name: favourite.item.name,
        price: favourite.item.price,
        category: favourite.item.category,
        img: favourite.item.img,
        qty: favourite.item.qty,
      },
    }));

    res.status(200).json({ favourites: formattedFavourites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
});

router.delete("/favourite/delete/:id", auth, async (req, res) => {
  try {
    const favouriteId = req.params.id;

    const deleted = await Favourite.findOneAndDelete({
      _id: favouriteId,
      userId: req.user.userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete item" });
  }
});

module.exports = router;
