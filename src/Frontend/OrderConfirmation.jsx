import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const OrderConfirmation = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 mt-35">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Order Confirmed! 🎉</h2>
        <p className="text-lg mb-4">
          Thank you for your order. Your delicious food will be delivered soon.
        </p>
        <a
          href="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg font-semibold"
        >
          Back to Home
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
