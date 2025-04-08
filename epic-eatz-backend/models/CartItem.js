const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  item: {
    name: String,
    price: Number,
    category: String,
    img: String,
    qty: Number,
  },
  restaurant_name: String,
  restaurant_rating: Number,
});

module.exports = mongoose.model("CartItem", cartItemSchema);
