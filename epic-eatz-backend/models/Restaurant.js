const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  restaurantName: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  address: {
    line: String,
    city: String,
    pin: String,
    state: String,
  },
  openTime: String,
  closeTime: String,
  openDays: [String],
  menu: [
    {
      name: String,
      category: String,
      price: Number,
      imageUrl: String,
    },
  ],
  documents: {
    fssai: String,
    gst: String,
    shopAct: String,
    bankProof: String,
    pan: String,
    ifsc: String,
    accountNumber: String,
  },
  restaurantRating: {
    type: Number,
    default: 0.0,
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
