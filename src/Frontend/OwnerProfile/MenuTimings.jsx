import { IndianRupee } from "lucide-react";
import React, { useEffect, useState } from "react";
import veg from "../../assets/veg.png";
import nonveg from "../../assets/nonveg.jpg";
import { useNavigate } from "react-router-dom";

const menu1 = {
  dishes: [
    {
      id: 1,
      name: "Paneer Butter Masala",
      price: 250,
      category: "Veg",
      img: "https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg",
    },
    {
      id: 2,
      name: "Chicken Biryani",
      price: 320,
      category: "Non Veg",
      img: "https://blendofspicesbysara.com/wp-content/uploads/2020/10/PXL_20201011_200951855.PORTRAIT-01.jpeg",
    },
    {
      id: 3,
      name: "Creamy Alfredo Pasta",
      price: 280,
      category: "Veg",
      img: "https://www.halfbakedharvest.com/wp-content/uploads/2021/04/One-Pot-Creamy-Penne-Alfredo-with-Spicy-Arugula-1.jpg",
    },
    {
      id: 4,
      name: "Cheese Burger",
      price: 180,
      category: "Non Veg",
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg",
    },
    {
      id: 5,
      name: "Salmon Sushi",
      price: 450,
      category: "Non Veg",
      img: "https://aisforappleau.com/wp-content/uploads/2023/07/how-to-make-sushi-salmon-nigiri-6.jpg",
    },
    {
      id: 6,
      name: "Vegan Bowl",
      price: 220,
      category: "Veg",
      img: "https://minimalistbaker.com/wp-content/uploads/2015/04/30-minute-CHICKPEA-Sweet-Potato-BUDDHA-Bowls-A-complete-meal-packed-with-protein-fiber-and-healthy-fats-with-a-STELLAR-Tahini-Lemon-Maple-Sauce-vegan-glutenfree-healthy.jpg",
    },
    {
      id: 7,
      name: "Tandoori Chicken",
      price: 350,
      category: "Non Veg",
      img: "https://www.hungrylankan.com/wp-content/uploads/2022/12/dosa-and-sambar-1-500x500.jpg",
    },
    {
      id: 8,
      name: "Margherita Pizza",
      price: 300,
      category: "Veg",
      img: "https://safrescobaldistatic.blob.core.windows.net/media/2022/11/PIZZA-MARGHERITA.jpg",
    },
  ],
};

const timings1 = {
  open: "10.30 AM",
  close: "9.00 PM",
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
};

const MenuTimings = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [editDish, setEditDish] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuTimings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/restaurant/menu",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setRestaurantInfo(data.restaurant);
          console.log("data.restaurant", data.restaurant);
        } else {
          alert(data.message);
          localStorage.removeItem("token"); // Clear invalid token
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching menu & timings:", error);
        localStorage.removeItem("token"); // Remove token in case of error
        navigate("/");
      }
    };

    fetchMenuTimings();
  }, [refresh]);

  const removeDish = async (name) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/restaurant/menu/delete/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setRestaurantInfo((prevInfo) => ({
          ...prevInfo,
          menu: prevInfo.menu.filter((item) => item.name !== name),
        }));
        setRefresh((prev) => !prev);
      } else {
        alert(data.message || "Failed to delete menu item.");
      }
    } catch (err) {
      console.error("Failed to delete menu item: ", err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDish((prevEdit) => ({
      ...prevEdit,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/restaurant/menu/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editDish),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setRestaurantInfo((prev) => ({
          ...prev,
          menu: prev.menu.map((item) =>
            item.name === editDish.name
              ? {
                  ...item,
                  name: editDish.name,
                  price: parseFloat(editDish.price),
                  img: editDish.img,
                  category: editDish.category,
                }
              : item
          ),
        }));
        setEditDish(null);
        setRefresh((prev) => !prev);
      } else {
        alert(data.message || "Failed to update menu.");
      }
    } catch (err) {
      console.error("Error updating menu: ", err);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold mb-8">Menu & Timings</h3>

      <div className="bg-gray-100 rounded-lg mb-5 pb-2.5">
        <p className="text-lg font-semibold text-center border-b-3 border-gray-400 border-dotted py-2">
          Delivery Timings
        </p>
        <div className="px-4 mt-4.5">
          <div className="flex items-center mb-2.5">
            <p className="font-bold text-gray-700 mr-2">Open time: </p>
            <p>{restaurantInfo?.openTime}</p>
          </div>
          <div className="flex items-center mb-2.5">
            <p className="font-bold text-gray-700 mr-2">Close time: </p>
            <p>{restaurantInfo?.closeTime}</p>
          </div>
          <div className="flex items-start">
            <p className="font-bold text-gray-700 mr-2 flex-shrink-0">
              Days Open:{" "}
            </p>
            <div className="flex flex-wrap">
              {restaurantInfo?.openDays.map((day, index) => (
                <span key={index} className="flex">
                  {day}
                  {index < restaurantInfo.openDays.length - 1 && <pre>, </pre>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg mb-5 pb-2.5">
        <p className="text-lg font-semibold text-center border-b-3 border-gray-400 border-dotted py-2">
          Menu
        </p>
        <div className="px-4 mt-4.5">
          {restaurantInfo?.menu.map((item, index) => (
            <div
              key={index}
              className="border-1 border-gray-400 flex flex-col mb-3.5 py-2.5"
            >
              <div className="flex justify-between items-center px-3 mb-5">
                <div className="flex items-center">
                  <p>{index + 1}.</p>
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="h-15 w-15 sm:h-20 sm:w-20 md:h-27 md:w-27 ml-4"
                  />
                </div>
                <div className="flex-grow flex max-sm:flex-col items-center justify-center">
                  <div className="">
                    {item.category === "Veg" && (
                      <img src={veg} alt="Veg" className="h-4 w-4 mr-1" />
                    )}
                    {item.category === "Non Veg" && (
                      <img
                        src={nonveg}
                        alt="Non Veg"
                        className="h-3.5 w-3.5 mr-1"
                      />
                    )}
                  </div>
                  <p className="font-bold text-center">{item.name}</p>
                </div>

                <div className="flex items-center">
                  <IndianRupee size={14} />
                  <p className="font-semibold">{item.price}</p>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold w-[82px] py-0.5 cursor-pointer rounded-md mx-2"
                  onClick={() => removeDish(item.name)}
                >
                  REMOVE
                </button>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold w-[82px] py-0.5 cursor-pointer rounded-md mx-2"
                  onClick={() =>
                    setEditDish({
                      ...item,
                      originalName: item.name,
                    })
                  }
                >
                  EDIT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editDish && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center mt-7">
          <div className="bg-white p-6 rounded-md w-[90%] sm:w-[400px] shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Edit Dish</h3>
            <div>
              <label className="block text-sm font-semibold">Dish Name:</label>
              <input
                type="text"
                name="name"
                value={editDish.name}
                onChange={handleEditChange}
                className="border-2 p-2 w-full mb-3"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Price:</label>
              <input
                type="number"
                name="price"
                value={editDish.price}
                onChange={handleEditChange}
                className="border-2 p-2 w-full mb-3"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Category: </label>
              <select
                name="category"
                value={editDish.category}
                onChange={handleEditChange}
                className="outline-none border-2 p-2 w-full mb-3"
              >
                <option value="Veg">Veg</option>
                <option value="Non Veg">Non Veg</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Image URL:</label>
              <input
                type="text"
                name="img"
                value={editDish.imgUrl}
                onChange={handleEditChange}
                className="border-2 p-2 w-full mb-3"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1.5 px-4 rounded-md cursor-pointer"
              >
                SAVE
              </button>
              <button
                onClick={() => setEditDish(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1.5 px-4 rounded-md cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuTimings;
