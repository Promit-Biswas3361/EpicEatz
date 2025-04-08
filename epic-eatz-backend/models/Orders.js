const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [
      {
        name: String,
        category: String,
        price: Number,
        imageUrl: String,
        qty: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
    date: Date,
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema, "orders");
