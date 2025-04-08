const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurantName: String,
  ownerId: {
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
  fssai: String,
  gst: String,
  shopAct: String,
  bankProof: String,
  pan: String,
  ifsc: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
