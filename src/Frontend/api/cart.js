import axios from "axios";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchCart = async () => {
  const res = await axios.get("/api/cart", getAuthHeader());
  // console.log("res.data from cart.js", res.data.cartItems);
  return res.data;
};

export const addItemToCart = async (item) => {
  const res = await axios.post("/api/cart", { item }, getAuthHeader());
  return res.data;
};

export const updateCartItem = async (itemId, qty) => {
  const res = await axios.put(`/api/cart/${itemId}`, { qty }, getAuthHeader());
  return res.data;
};

export const removeCartItem = async (itemId) => {
  const res = await axios.delete(`/api/cart/${itemId}`, getAuthHeader());
  return res.data;
};

export const clearCartItems = async () => {
  await axios.delete("/api/cart", getAuthHeader());
};
