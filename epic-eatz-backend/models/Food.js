const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  img: String,
  restaurant_name: String,
  restaurant_rating: Number,
});

module.exports = mongoose.model("Food", FoodSchema);
