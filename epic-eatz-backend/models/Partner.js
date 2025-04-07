// models/Partner.js
const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  restaurantName: String,
  owner: {
    fullName: String,
    email: String,
    phone: String,
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
      description: String,
      price: Number,
      imageUrl: String,
    },
  ],
});

const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;
