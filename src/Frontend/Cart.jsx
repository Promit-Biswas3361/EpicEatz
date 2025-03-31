import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartItem from "./CartItem";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cart = [
  {
    id: 1,
    restaurant_name: "The Spice House",
    restaurant_rating: 4.5,
    item: {
      name: "Paneer Butter Masala",
      price: 250,
      category: "Veg",
      img: "https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg",
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
      img: "https://blendofspicesbysara.com/wp-content/uploads/2020/10/PXL_20201011_200951855.PORTRAIT-01.jpeg",
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
      img: "https://www.halfbakedharvest.com/wp-content/uploads/2021/04/One-Pot-Creamy-Penne-Alfredo-with-Spicy-Arugula-1.jpg",
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
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg",
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
      img: "https://aisforappleau.com/wp-content/uploads/2023/07/how-to-make-sushi-salmon-nigiri-6.jpg",
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
      img: "https://minimalistbaker.com/wp-content/uploads/2015/04/30-minute-CHICKPEA-Sweet-Potato-BUDDHA-Bowls-A-complete-meal-packed-with-protein-fiber-and-healthy-fats-with-a-STELLAR-Tahini-Lemon-Maple-Sauce-vegan-glutenfree-healthy.jpg",
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
      img: "https://www.hungrylankan.com/wp-content/uploads/2022/12/dosa-and-sambar-1-500x500.jpg",
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
      img: "https://safrescobaldistatic.blob.core.windows.net/media/2022/11/PIZZA-MARGHERITA.jpg",
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
      img: "https://cdn1.foodviva.com/static-content/food-images/snacks-recipes/pani-puri/pani-puri.jpg",
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
      img: "https://www.halfbakedharvest.com/wp-content/uploads/2018/06/Korean-Grilled-Steak-with-Toasted-Sesame-Chimichurri-1.jpg",
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
      img: "https://i0.wp.com/binjalsvegkitchen.com/wp-content/uploads/2015/12/Masala-Dosa-L1.jpg?resize=600%2C900&ssl=1",
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
      img: "https://headbangerskitchen.com/wp-content/uploads/2023/01/BGPRAWNS-Vertical.jpg",
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
      img: "https://bluebowlrecipes.com/wp-content/uploads/2022/01/molten-chocolate-lava-cakes-for-two-7641.jpg",
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
      img: "https://iamhomesteader.com/wp-content/uploads/2023/02/bbq-wings.jpg",
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
      img: "https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg",
      qty: 5,
    },
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(cart);
  const [itemTotal, setItemTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

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

  const updateItemQty = (id, newQty) => {
    if (newQty === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id
            ? { ...item, item: { ...item.item, qty: newQty } }
            : item
        )
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="mt-45 md:mt-50 mx-5 flex-grow flex flex-col">
        <p className="text-2xl md:text-3xl font-bold text-center">
          Shopping Cart
        </p>
        {cartItems && cartItems.length > 0 ? (
          <div className="py-8 sm:mt-5 md:flex">
            <div className="flex flex-col md:flex-2/3 bg-white rounded-lg px-4 lg:px-7">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
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
                  onClick={() =>
                    navigate("/checkout", { state: { totalAmount } })
                  }
                >
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

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
