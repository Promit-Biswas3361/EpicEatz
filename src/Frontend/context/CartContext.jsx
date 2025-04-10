// context/CartContext.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCartItems,
} from "../api/cart";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const items = await fetchCart();
    setCart(items);
  };

  const addToCart = async (item) => {
    try {
      const updated = await addItemToCart(item);
      setCart(updated);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message.includes("multiple restaurants")
      ) {
        const confirmClear = window.confirm(
          "Your cart contains items from another restaurant. Do you want to clear the cart and add this item?"
        );
        if (confirmClear) {
          await clearCartItems(); // backend clear
          const updated = await addItemToCart(item); // retry same item
          setCart(updated);
        }
      } else {
        console.error("Failed to add to cart:", error);
      }
    }
  };

  const updateQty = async (itemId, qty) => {
    const updated = await updateCartItem(itemId, qty);
    setCart(updated);
  };

  const removeFromCart = async (itemId) => {
    const updated = await removeCartItem(itemId);
    setCart(updated);
  };

  const clearCart = async () => {
    await clearCartItems();
    setCart([]);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
