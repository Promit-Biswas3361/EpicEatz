import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartItem from "./CartItem";
import { IndianRupee } from "lucide-react";

const cart = [
  {
    id: 1,
    restaurant_name: "The Spice House",
    restaurant_rating: 4.5,
    item: {
      name: "Paneer Butter Masala",
      price: 250,
      category: "Veg",
      img: "https://example.com/paneer-butter-masala.jpg",
      qty: 5,
    },
  },
  {
    id: 2,
    restaurant_name: "Royal Biryani",
    restaurant_rating: 4.7,
    item: {
      name: "Chicken Biryani",
      price: 320,
      category: "Non Veg",
      img: "https://example.com/chicken-biryani.jpg",
      qty: 1,
    },
  },
  {
    id: 3,
    restaurant_name: "Pasta Paradise",
    restaurant_rating: 4.3,
    item: {
      name: "Creamy Alfredo Pasta",
      price: 280,
      category: "Veg",
      img: "https://example.com/alfredo-pasta.jpg",
      qty: 2,
    },
  },
  {
    id: 4,
    restaurant_name: "Burger Hub",
    restaurant_rating: 4.6,
    item: {
      name: "Cheese Burger",
      price: 180,
      category: "Non Veg",
      img: "https://example.com/cheese-burger.jpg",
      qty: 1,
    },
  },
  {
    id: 5,
    restaurant_name: "Sushi World",
    restaurant_rating: 4.8,
    item: {
      name: "Salmon Sushi",
      price: 450,
      category: "Non Veg",
      img: "https://example.com/salmon-sushi.jpg",
      qty: 1,
    },
  },
  {
    id: 6,
    restaurant_name: "Vegan Delights",
    restaurant_rating: 4.2,
    item: {
      name: "Vegan Bowl",
      price: 220,
      category: "Veg",
      img: "https://example.com/vegan-bowl.jpg",
      qty: 4,
    },
  },
  {
    id: 7,
    restaurant_name: "Tandoori Nights",
    restaurant_rating: 4.5,
    item: {
      name: "Tandoori Chicken",
      price: 350,
      category: "Non Veg",
      img: "https://example.com/tandoori-chicken.jpg",
      qty: 3,
    },
  },
  {
    id: 8,
    restaurant_name: "Pizza Mania",
    restaurant_rating: 4.6,
    item: {
      name: "Margherita Pizza",
      price: 300,
      category: "Veg",
      img: "https://example.com/margherita-pizza.jpg",
      qty: 3,
    },
  },
  {
    id: 9,
    restaurant_name: "Street Chaat",
    restaurant_rating: 4.1,
    item: {
      name: "Pani Puri",
      price: 80,
      category: "Veg",
      img: "https://example.com/pani-puri.jpg",
      qty: 1,
    },
  },
  {
    id: 10,
    restaurant_name: "Steak House",
    restaurant_rating: 4.9,
    item: {
      name: "Grilled Steak",
      price: 600,
      category: "Non Veg",
      img: "https://example.com/grilled-steak.jpg",
      qty: 2,
    },
  },
  {
    id: 11,
    restaurant_name: "South Indian Spice",
    restaurant_rating: 4.4,
    item: {
      name: "Masala Dosa",
      price: 150,
      category: "Veg",
      img: "https://example.com/masala-dosa.jpg",
      qty: 2,
    },
  },
  {
    id: 12,
    restaurant_name: "Seafood Delight",
    restaurant_rating: 4.7,
    item: {
      name: "Garlic Butter Prawns",
      price: 500,
      category: "Non Veg",
      img: "https://example.com/garlic-prawns.jpg",
      qty: 1,
    },
  },
  {
    id: 13,
    restaurant_name: "Dessert Heaven",
    restaurant_rating: 4.3,
    item: {
      name: "Chocolate Lava Cake",
      price: 220,
      category: "Veg",
      img: "https://example.com/lava-cake.jpg",
      qty: 4,
    },
  },
  {
    id: 14,
    restaurant_name: "BBQ Nation",
    restaurant_rating: 4.6,
    item: {
      name: "BBQ Chicken Wings",
      price: 270,
      category: "Non Veg",
      img: "https://example.com/bbq-wings.jpg",
      qty: 2,
    },
  },
  {
    id: 15,
    restaurant_name: "Café Mocha",
    restaurant_rating: 4.2,
    item: {
      name: "Cappuccino",
      price: 150,
      category: "Veg",
      img: "https://example.com/cappuccino.jpg",
      qty: 5,
    },
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(cart);
  const [itemTotal, setItemTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      let total = cartItems.reduce(
        (sum, item) => sum + item.item.price * item.item.qty,
        0
      );
      setItemTotal(total);
      total = Math.round(total * 1.05 + 40);
      setTotalAmount(total);
    }
  }, [cartItems]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="mt-45 md:mt-50 mx-5 flex-grow flex flex-col">
        <p className="text-2xl md:text-3xl font-bold text-center">
          Shopping Cart
        </p>
        {cartItems ? (
          <div className="py-8 sm:mt-5 md:flex">
            <div className="flex flex-col md:flex-2/3 bg-white rounded-lg px-4 lg:px-7">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <div className="flex flex-row items-center justify-between text-lg my-4 text-right">
                <div className="flex items-center">
                  <p className="mr-2">Subtotal: </p>
                  <IndianRupee size={16} />
                  <p>{itemTotal}</p>
                </div>
                <button className="hidden md:block bg-yellow-400 mt-3 w-fit text-sm text-center font-semibold px-5 py-1.5 rounded-full cursor-pointer">
                  Proceed to Checkout
                </button>
              </div>
            </div>

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
                    <p>{itemTotal * 0.05}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between font-semibold mb-4">
                <p>Item total</p>
                <div className="flex items-center">
                  <IndianRupee size={14} />
                  <p>{totalAmount}</p>
                </div>
              </div>
              <button className="bg-yellow-400 w-full text-sm text-center font-semibold px-3 py-1.5 rounded-full cursor-pointer">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="font-semibold text-lg mt-10">Cart is Empty!!</p>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
