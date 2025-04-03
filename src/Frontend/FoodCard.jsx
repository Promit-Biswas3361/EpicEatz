import React, { useState } from "react";
import { Star, IndianRupee, Heart } from "lucide-react";
import veg from "../assets/veg.png";
import nonveg from "../assets/nonveg.jpg";

const FoodCard = ({ dish }) => {
  const [count, setCount] = useState(0);
  const [favourite, setFavourite] = useState(false);

  return (
    <div className="flex flex-col bg-white p-5 rounded-2xl w-80 lg:w-100 mb-5">
      <div className="flex flex-col pb-5 border-b-3 border-dotted text-gray-700">
        <p className="font-bold">By {dish.restaurant_name}</p>
        <div className="flex flex-row items-center">
          <Star size={16} fill="gold" />
          <p className="ml-2">{dish.restaurant_rating}</p>
        </div>
      </div>
      <div className="flex flex-row items-center mt-4 mb-3 justify-between">
        <div className="flex flex-col mr-6">
          {dish.item.category == "Veg" && (
            <img src={veg} alt="Veg" className="h-7 w-7" />
          )}
          {dish.item.category == "Non Veg" && (
            <img src={nonveg} alt="Non Veg" className="h-6 w-6" />
          )}
          <p className="text-lg font-bold">{dish.item.name}</p>
          <div className="flex flex-row items-center">
            <IndianRupee size={15} />
            <p className="font-semibold"> {dish.item.price} </p>
          </div>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={dish.item.img}
              alt={dish.item.name}
              className="h-50 max-w-45 bg-red-200"
            />
          </div>

          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setFavourite((prev) => !prev)}
          >
            <Heart color="white" fill={favourite ? "red" : "transparent"} />
          </div>

          <div className="bg-white border-1 border-gray-400 py-2 px-4 rounded-lg absolute bottom-[-22px] text-lg font-bold text-green-600">
            {count > 0 ? (
              <div className="flex flex-row justify-between">
                <button
                  className="cursor-pointer mr-5"
                  onClick={() => setCount(count - 1)}
                >
                  -
                </button>
                <p>{count}</p>
                <button
                  className="cursor-pointer ml-5"
                  onClick={() => setCount(count + 1)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="cursor-pointer"
                onClick={() => setCount(count + 1)}
              >
                ADD
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
