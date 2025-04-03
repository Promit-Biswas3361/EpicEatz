import React from "react";
import veg from "../../assets/veg.png";
import nonveg from "../../assets/nonveg.jpg";
import { Star, IndianRupee, CircleMinus } from "lucide-react";

const FavouritesCard = ({ item, onDelete }) => {
  const addToCart = (item_name) => {
    alert(`Added ${item_name} to your Cart`);
    return;
  };

  return (
    <div className="border-gray-200 border-1 w-full my-2.5">
      <div className="flex">
        <div className="flex-1/2 lg:flex-1/6 overflow-hidden mr-3 md:mr-5 relative">
          <img
            src={item.item.img}
            alt={item.item.name}
            className="h-42 w-full"
          />
          <div className="absolute top-2 left-2">
            <CircleMinus
              color="white"
              size={22}
              onClick={() => onDelete(item.id)}
              className="hover:fill-red-500 cursor-pointer"
            />
          </div>
          <div className="absolute bottom-1.5 text-center w-full">
            <button
              className="bg-white text-green-600 rounded-md border-1 border-gray-400 px-2 py-1 font-bold cursor-pointer hover:bg-gray-100"
              onClick={() => addToCart(item.item.name)}
            >
              ADD
            </button>
          </div>
        </div>
        <div className="flex-2/3 lg:flex-3/4 flex flex-col py-1.5 pr-3">
          <div className="flex flex-col pb-3 border-b-2 border-gray-400 border-dotted text-gray-700 mb-3 px-3">
            <p className="font-bold text-sm sm:text-xs md:text-sm">
              By {item.restaurant_name}
            </p>
            <div className="flex flex-row items-center">
              <Star size={14} fill="gold" />
              <p className="ml-2 text-sm sm:text-xs md:text-sm">
                {item.restaurant_rating}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between px-3">
            <div className="flex items-center">
              {item.item.category === "Veg" ? (
                <img src={veg} alt="Veg" className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <img
                  src={nonveg}
                  alt="Non Veg"
                  className="h-3 w-3 md:h-4 md:w-4"
                />
              )}

              <p className="sm:text-sm md:text-lg font-bold ml-2 mr-3">
                {item.item.name}
              </p>
            </div>
            <div className="flex items-center max-md:mt-2.5">
              <IndianRupee size={15} />
              <p className="font-semibold md:text-lg">{item.item.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouritesCard;
