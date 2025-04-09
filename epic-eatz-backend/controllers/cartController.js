const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    res.json({ cartItems: cart?.items || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addToCart = async (req, res) => {
  try {
    const { item } = req.body;
    let cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [item] });
    } else {
      const hasDifferentRestaurant =
        cart.items.length > 0 &&
        cart.items[0].restaurantId !== item.restaurantId;

      if (hasDifferentRestaurant) {
        return res.status(400).json({
          message: "Cannot add items from multiple restaurants. Please clear the cart first.",
        });
      }

      const exists = cart.items.find(
        (i) =>
          i.item.name === item.item.name &&
          i.restaurantId === item.restaurantId
      );

      if (exists) {
        exists.item.qty += item.item.qty;
      } else {
        cart.items.push(item);
      }
    }

    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItemQty = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { qty } = req.body;

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.item.qty = qty;
    await cart.save();

    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
    await cart.save();

    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.userId });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateItemQty,
  removeFromCart,
  clearCart,
};
