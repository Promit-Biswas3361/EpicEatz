const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  item: {
    name: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
      type: String,
      enum: ["Veg", "Non Veg"],
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Favourites", favouriteSchema);
