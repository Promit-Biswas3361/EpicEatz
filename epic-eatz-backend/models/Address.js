const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Home", "Office", "Others"],
    required: true,
    default: "Home",
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Address", addressSchema, "addresses");
