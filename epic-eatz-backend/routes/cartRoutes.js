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

// ✅ Apply auth middleware to ALL routes
router.use(auth);

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:itemId", updateItemQty);
router.delete("/:itemId", removeFromCart);
router.delete("/", clearCart);

module.exports = router;
