import React, { useEffect, useState } from "react";
import { Star, IndianRupee, Heart } from "lucide-react";
import veg from "../assets/veg.png";
import nonveg from "../assets/nonveg.jpg";
import { useSelector } from "react-redux";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ dish }) => {
  const [count, setCount] = useState(0);
  const [favourite, setFavourite] = useState(false);

  const navigate = useNavigate();

  const { isAuthenticated, role } = useSelector((state) => state.login);
  const { cart, addToCart, updateQty, removeFromCart } = useCart();

  const restaurantId = dish.restaurantId;
  const itemName = dish.item.name;
  const category = dish.item.category?.toLowerCase();

  // Helper to find existing cart item
  const getExistingItem = () => {
    return cart?.cartItems?.find(
      (dish) =>
        dish.restaurantId === restaurantId && dish.item?.name === itemName
    );
  };

  // Sync count on mount or cart change
  useEffect(() => {
    const existing = getExistingItem();
    console.log("existing", existing);
    setCount(existing ? existing.item.qty : 0);
  }, [cart, addToCart, updateQty, removeFromCart]);

  const handleAdd = async () => {
    // const existing = getExistingItem();
    // if (!existing) {
    //   alert("Cant add items form multiple restaurants");
    //   return;
    // }

    const itemPayload = {
      restaurantId: dish.restaurantId,
      restaurant_name: dish.restaurant_name,
      restaurant_rating: dish.restaurant_rating,
      item: {
        name: dish.item.name,
        price: dish.item.price,
        category: dish.item.category,
        img: dish.item.imgUrl,
        qty: 1,
      },
    };
    setCount((prev) => prev + 1);
    await addToCart(itemPayload);
  };

  const handleIncrement = async () => {
    const existing = getExistingItem();
    if (existing) {
      const newQty = count + 1;
      await updateQty(existing._id, newQty);
      setCount(newQty);
    }
  };

  const handleDecrement = async () => {
    const existing = getExistingItem();
    if (existing) {
      const newQty = count - 1;
      if (newQty === 0) {
        await removeFromCart(existing._id);
      } else {
        await updateQty(existing._id, newQty);
      }
      setCount(newQty);
    }
  };

  const addToFavourites = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    const favouriteItem = {
      restaurantId: dish.restaurantId,
      item: {
        name: dish.item.name,
        price: dish.item.price,
        category: dish.item.category,
        img: dish.item.imgUrl,
      },
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/favourites/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(favouriteItem),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Item added to favourites.");
        return true;
      } else {
        console.log(data.message || "Failed to add to Favourites.");
        return false;
      }
    } catch (err) {
      console.error("Error while adding item to favourites.");
      return false;
    }
  };

  const removeFromFavourites = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    const item = {
      restaurantId: dish.restaurantId,
      dish_name: dish.item.name,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/favourites/remove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Item removed from favourites.");
        return true;
      } else {
        console.log(data.message || "Failed to remove from Favourites.");
        return false;
      }
    } catch (err) {
      console.error("Error while removing item from favourites.");
      return false;
    }
  };

  useEffect(() => {
    const checkIfFavourite = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/user/favourites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          const exists = data.favourites.some(
            (fav) =>
              fav.restaurantId === dish.restaurantId &&
              fav.item.name === dish.item.name
          );
          setFavourite(exists);
        }
      } catch (err) {
        console.error("Failed to fetch favourites.");
      }
    };

    checkIfFavourite();
  }, []);

  const toggleFavourite = async () => {
    if (favourite) {
      const success = await removeFromFavourites();
      if (success) setFavourite(false);
    } else {
      const success = await addToFavourites();
      if (success) setFavourite(true);
    }
  };

  return (
    <div className="flex flex-col bg-white p-5 rounded-2xl w-80 lg:w-100 mb-5">
      {/* 👤 Restaurant Info */}
      <div className="flex flex-col pb-5 border-b-3 border-dotted text-gray-700">
        <p className="font-bold">By {dish.restaurant_name}</p>
        <div className="flex flex-row items-center">
          <Star size={16} fill="gold" />
          <p className="ml-2">{dish.restaurant_rating}</p>
        </div>
      </div>

      {/* 🍽 Dish Info */}
      <div className="flex flex-row items-center mt-4 mb-3 justify-between">
        <div className="flex flex-col mr-6">
          {category === "veg" && (
            <img src={veg} alt="Veg" className="h-7 w-7" />
          )}
          {category === "non veg" && (
            <img src={nonveg} alt="Non Veg" className="h-6 w-6" />
          )}
          <p className="text-lg font-bold">{dish.item.name}</p>
          <div className="flex flex-row items-center">
            <IndianRupee size={15} />
            <p className="font-semibold">{dish.item.price}</p>
          </div>
        </div>

        <div className="flex flex-col items-center relative">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={dish.item.imgUrl}
              alt={dish.item.name}
              className="h-50 w-45"
            />
          </div>

          {isAuthenticated && role === "User" && (
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={toggleFavourite}
            >
              <Heart color="white" fill={favourite ? "red" : "transparent"} />
            </div>
          )}

          {isAuthenticated && role === "User" && (
            <div className="bg-white border-1 border-gray-400 py-2 px-4 rounded-lg absolute bottom-[-22px] text-lg font-bold text-green-600">
              {count > 0 ? (
                <div className="flex flex-row justify-between items-center">
                  <button
                    className="cursor-pointer mr-5"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <p>{count}</p>
                  <button
                    className="cursor-pointer ml-5"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className="cursor-pointer" onClick={handleAdd}>
                  ADD
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
