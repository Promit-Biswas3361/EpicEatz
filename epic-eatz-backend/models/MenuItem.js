const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // image path
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assuming each user is a restaurant
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
