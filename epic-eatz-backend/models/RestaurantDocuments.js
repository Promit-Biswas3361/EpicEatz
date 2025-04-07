const mongoose = require("mongoose");

const restaurantDocumentsSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // only one document per restaurant
  },
  fssai: String,
  gst: String,
  shopAct: String,
  bankProof: String,
  pan: String,
  ifsc: String,
  accountNumber: String,
  password: String, 
});

module.exports = mongoose.model("RestaurantDocuments", restaurantDocumentsSchema);
