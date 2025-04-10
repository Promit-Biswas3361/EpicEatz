import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantDetails = ({ userInfo }) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState(userInfo);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        Navigate("/");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/restaurant/details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log("data.restaurant", data.restaurant);
          setRestaurantInfo(data.restaurant);
        } else {
          alert(data.message);
          localStorage.removeItem("token"); // Clear invalid token
          navigate("/");
        }
      } catch (err) {
        console.error("Could not fetch restaurant data: ", err);
        localStorage.removeItem("token"); // Remove token in case of error
        navigate("/");
      }
    };

    const fetchOwnerDetails = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect if not logged in
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setOwnerInfo(data);
        } else {
          alert(data.message);
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchRestaurantDetails();
    fetchOwnerDetails();
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-extrabold mb-8">Restaurant Details</h3>

      <div className="bg-gray-100 rounded-lg mb-5 pb-2.5">
        <p className="text-lg font-semibold text-center border-b-3 border-gray-400 border-dotted py-2">
          Owner Details
        </p>
        <div className="px-4 mt-4.5">
          <div className="flex items-center mb-2.5">
            <p className="font-bold text-gray-700 mr-2">Name: </p>
            <p>{ownerInfo?.name}</p>
          </div>
          <div className="flex items-center mb-2.5">
            <p className="font-bold text-gray-700 mr-2">Email: </p>
            <p>{ownerInfo?.email}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-gray-700 mr-2">Phone No: </p>
            <p className="mr-1">+91</p>
            <p>{ownerInfo?.phone}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg mb-4 pb-2">
        <p className="text-lg font-semibold text-center border-b-3 border-gray-400 border-dotted py-2">
          Restaurant Address
        </p>
        <div className="px-4 mt-4.5">
          <div className="flex items-start mb-2.5">
            <p className="font-bold text-gray-700 mr-2">Address: </p>
            <p>{restaurantInfo?.address.line}</p>
          </div>
          <div className="flex items-center mb-2.5">
            <p className="font-bold text-gray-700 mr-2">City: </p>
            <p>{restaurantInfo?.address.city}</p>
          </div>
          <div className="flex items-center mb-2.5">
            <p className="font-bold text-gray-700 mr-2">State: </p>
            <p>{restaurantInfo?.address.state}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-gray-700 mr-2">PIN Code: </p>
            <p>{restaurantInfo?.address.pin}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
