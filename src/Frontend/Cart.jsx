import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartItem from "./CartItem";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemTotal, setItemTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  // 🛒 Get cart items on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/cart", { withCredentials: true });
        setCartItems(res.data.cartItems);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  // 💰 Calculate totals
  useEffect(() => {
    if (cartItems.length > 0) {
      let subtotal = cartItems.reduce(
        (acc, item) => acc + item.item.price * item.item.qty,
        0
      );
      setItemTotal(subtotal);
      const total = Math.round(subtotal * 1.05 + 40);
      setTotalAmount(total);
    }
  }, [cartItems]);

  // 🔄 Update quantity
  const updateItemQty = async (id, newQty) => {
    if (newQty === 0) {
      try {
        await axios.delete(`/api/cart/${id}`, { withCredentials: true });
        setCartItems((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting cart item:", error);
      }
    } else {
      try {
        const res = await axios.patch(
          `/api/cart/${id}`,
          { qty: newQty },
          { withCredentials: true }
        );
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, item: { ...item.item, qty: newQty } } : item
          )
        );
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="mt-45 md:mt-50 mx-5 flex-grow flex flex-col">
        <p className="text-2xl md:text-3xl font-bold text-center">Shopping Cart</p>

        {cartItems.length > 0 ? (
          <div className="py-8 sm:mt-5 md:flex">
            <div className="flex flex-col md:flex-2/3 bg-white rounded-lg px-4 lg:px-7">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  updateItemQty={updateItemQty}
                />
              ))}

              <div className="flex flex-row items-center justify-between text-lg my-4 text-right">
                <div className="flex items-center">
                  <p className="mr-2">Subtotal: </p>
                  <IndianRupee size={16} />
                  <p>{itemTotal}</p>
                </div>
                <button
                  className="hidden md:block bg-yellow-400 mt-3 w-fit text-sm text-center font-semibold px-5 py-1.5 rounded-full cursor-pointer"
                  onClick={() => navigate("/checkout", { state: { totalAmount } })}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

            {/* Right Bill Section */}
            <div className="bg-white max-h-fit md:flex-1/3 md:ml-5 rounded-lg md:max-w-85 px-3 lg:px-5 py-4 mt-10 md:mt-0 text-sm">
              <p className="text-lg text-center font-bold mb-3">Bill Details</p>
              <div className="border-b-1 border-gray-300 mb-2">
                <div className="flex justify-between mb-2">
                  <p>Item total</p>
                  <div className="flex items-center">
                    <IndianRupee size={14} />
                    <p>{itemTotal}</p>
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Delivery Fee</p>
                  <div className="flex items-center">
                    <IndianRupee size={14} />
                    <p>40</p>
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Taxes</p>
                  <div className="flex items-center">
                    <IndianRupee size={14} />
                    <p>{(itemTotal * 0.05).toFixed(0)}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between font-semibold mb-4">
                <p>Total</p>
                <div className="flex items-center">
                  <IndianRupee size={14} />
                  <p>{totalAmount}</p>
                </div>
              </div>
              <button
                className="bg-yellow-400 w-full text-sm text-center font-semibold px-3 py-1.5 rounded-full cursor-pointer"
                onClick={() => navigate("/checkout", { state: { totalAmount } })}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="font-semibold text-lg mt-10">Cart is Empty!!</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
