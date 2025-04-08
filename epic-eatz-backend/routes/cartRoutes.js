const express = require("express");
const {
  getCart,
  addToCart,
  updateItemQty,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");

const router = express.Router();
router.use(auth);
router.get("/", auth, getCart);
router.post("/", auth, addToCart);
router.put("/:itemId", auth, updateItemQty);
router.delete("/:itemId", auth, removeFromCart);
router.delete("/", auth, clearCart);

module.exports = router;
