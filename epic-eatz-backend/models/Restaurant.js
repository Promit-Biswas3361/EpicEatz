const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }], // Array of FoodItem references
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
