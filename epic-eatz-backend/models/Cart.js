const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  restaurantId: String,
  restaurant_name: String,
  restaurant_rating: Number,
  item: {
    name: String,
    price: Number,
    category: String,
    img: String,
    qty: Number,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
