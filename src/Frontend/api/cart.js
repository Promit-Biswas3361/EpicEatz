// api/cart.js
import axios from "./axios"; 

export const fetchCart = async () => {
  const res = await axios.get("/cart");
  return res.data;
};

export const addItemToCart = async (item) => {
  const res = await axios.post("/cart", { item });
  return res.data;
};

export const updateCartItem = async (itemId, qty) => {
  const res = await axios.put(`/cart/${itemId}`, { qty });
  return res.data;
};

export const removeCartItem = async (itemId) => {
  const res = await axios.delete(`/cart/${itemId}`);
  return res.data;
};

export const clearCartItems = async () => {
  await axios.delete("/cart");
};
