import React, { useState } from "react";

const RestaurantInfo1 = {
  restaurant_name: "Hungry House",
  restaurant_owner: {
    name: "Santhosh Kamath",
    email: "santhosh.kamath@yahoo.com",
    phone: "9820243177",
  },
  restaurant_address: {
    address: "1st floor, Student Plaza, MIT Campus, Manipal, Karnataka",
    city: "Manipal",
    state: "Karnataka",
    PIN: 576104,
  },
};

const RestaurantDetails = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(RestaurantInfo1);

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
            <p>{restaurantInfo.restaurant_owner.name}</p>
          </div>
          <div className="flex items-center mb-2.5">
            <p className="font-bold text-gray-700 mr-2">Email: </p>
            <p>{restaurantInfo.restaurant_owner.email}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-gray-700 mr-2">Phone No: </p>
            <p className="mr-1">+91</p>
            <p>{restaurantInfo.restaurant_owner.phone}</p>
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
            <p>{restaurantInfo.restaurant_address.address}</p>
          </div>
          <div className="flex items-center mb-2.5">
            <p className="font-bold text-gray-700 mr-2">City: </p>
            <p>{restaurantInfo.restaurant_address.city}</p>
          </div>
          <div className="flex items-center mb-2.5">
            <p className="font-bold text-gray-700 mr-2">State: </p>
            <p>{restaurantInfo.restaurant_address.state}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-gray-700 mr-2">PIN Code: </p>
            <p>{restaurantInfo.restaurant_address.PIN}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
