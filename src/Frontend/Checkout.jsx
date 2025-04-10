import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AddressCard from "./AddressCard";
import { IndianRupee, MapPin } from "lucide-react";
import { useCart } from "./context/CartContext";

const Checkout = () => {
  const location = useLocation();
  const { totalAmount } = location.state || { totalAmount: 0 };

  const { cart } = useCart();

  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [userAddresses, setUserAddresses] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAddresses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/user/addresses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUserAddresses(data.addresses);
          console.log("data.addresses", data.addresses);
        } else {
          alert(data.message || "Failed to fetch addresses.");
        }
      } catch (err) {
        console.error("Failed to fetch addresses: ", err);
      }
    };

    fetchUserAddresses();
    console.log("cart", cart);
  }, []);

  const handleOrderSubmit = async () => {
    if (!deliveryAddress) {
      alert("Please choose a valid delivery address.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const orderData = {
      addressId: deliveryAddress._id,
      paymentMethod,
      items: cart.cartItems.map((item) => ({
        name: item.item.name,
        category: item.item.category,
        price: item.item.price,
        imageUrl: item.item.img,
        qty: item.item.qty,
      })),
      restaurantId: cart.cartItems[0].restaurantId,
      total: totalAmount,
    };

    try {
      const response = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Order placed successfully!");
        navigate("/order-confirmation");
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (err) {
      console.error("Order submission error: ", err);
      alert("Something went wrong while placing the order.");
    }
  };

  const handleAddress = (id) => {
    setDeliveryAddress(userAddresses.find((item) => item._id === id));
    console.log(deliveryAddress);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="mt-45 md:mt-50 mx-5 flex-grow flex flex-col">
        <p className="text-2xl md:text-3xl font-bold text-center mb-12">
          Checkout
        </p>

        <div className="bg-white rounded-lg px-4 py-4">
          {deliveryAddress ? (
            <div className="">
              <div className="flex item-center justify-between">
                <div className="flex items-center mb-3">
                  <MapPin size={20} />
                  <p className="text-xl font-bold ml-1.5">Delivery address</p>
                </div>
                <div className="">
                  <button
                    className="text-sm text-orange-500 hover:text-orange-700 font-bold cursor-pointer"
                    onClick={() => setDeliveryAddress(null)}
                  >
                    CHANGE
                  </button>
                </div>
              </div>

              <div className="">
                <p className="font-semibold">{deliveryAddress.label}</p>
                <p className="text-sm">{deliveryAddress.address}</p>
                <div className="flex items-center mt-1.5">
                  <p className="text-sm font-semibold mr-1">Phone: </p>
                  <p className="text-sm">{deliveryAddress.phone}</p>
                </div>
              </div>
            </div>
          ) : userAddresses && userAddresses.length > 0 ? (
            <div className="">
              <p className="text-lg font-bold mb-5">Select delivery address</p>
              <div className="flex flex-wrap gap-3">
                {userAddresses.map((address) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    handleAddress={handleAddress}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="">
              <p className="text-lg font-bold mb-5">Select delivery address</p>
              <p>No addresses found. Add new address in profile</p>
              <button
                className="cursor-pointer bg-green-600 hover:bg-green-800 text-white text-sm font-bold px-3 py-1.5 rounded-lg mt-1.5"
                onClick={() => navigate("/account/addresses")}
              >
                Add Address
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg mt-6 px-4 py-4">
          <div className="flex border-b-1 justify-between pb-2 mb-2.5">
            <p className="text-lg">Total Amount</p>
            <div className="flex items-center text-lg">
              <IndianRupee size={17} />
              <p>{totalAmount}</p>
            </div>
          </div>
          <div className="mb-5">
            <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
            <div className="flex items-center mb-2">
              <label htmlFor="COD" className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  id="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="mr-2"
                />
                Cash on Delivery (COD)
              </label>
            </div>
            <div className="flex items-center">
              <label htmlFor="Card" className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  id="Card"
                  checked={paymentMethod === "Card"}
                  onChange={() => setPaymentMethod("Card")}
                  className="mr-2"
                />
                Credit/Debit Card
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={handleOrderSubmit}
              className="w-fit bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-white py-2 px-4 rounded-lg font-bold"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
