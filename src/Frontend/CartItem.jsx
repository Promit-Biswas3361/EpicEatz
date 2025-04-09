import React from "react";
import veg from "../assets/veg.png";
import nonveg from "../assets/nonveg.jpg";
import { IndianRupee } from "lucide-react";

const CartItem = ({ item, updateItemQty }) => {
  if (!item || !item.item) return null;

  const { _id, item: itemData, restaurant_name } = item;
  const { img, name, category, qty, price } = itemData;

  const handleQtyChange = (change) => {
    const newQty = qty + change;
    if (newQty >= 0) {
      updateItemQty(_id, newQty);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row mb-3 lg:mb-5 border-gray-300 border-b-1 justify-between py-5 lg:py-7 px-4 lg:px-6">
      <div className="flex flex-col rounded-2xl overflow-hidden items-center">
        <img
          src={img}
          alt="Item"
          className="h-40 lg:h-45 w-45 mb-1.5 sm:mb-0 object-cover"
        />
      </div>

      <div className="flex flex-col justify-between sm:ml-8 flex-grow">
        <div className="min-w-60 mb-2 sm:mb-0">
          <div className="flex flex-row items-center">
            {category === "Veg" && <img src={veg} alt="Veg" className="h-5 w-5" />}
            {category === "Non Veg" && (
              <img src={nonveg} alt="Non Veg" className="h-4 w-4" />
            )}
            <p className="text-xl ml-2">{name}</p>
          </div>
          <p className="text-sm font-semibold">by {restaurant_name}</p>
          <p className="text-xs text-green-600">In Stock</p>
        </div>

        <div className="bg-white border-1 border-gray-400 py-2 px-4 rounded-lg text-lg font-bold text-green-600 max-w-30 text-center mb-5 sm:mb-0">
          {qty > 0 ? (
            <div className="flex flex-row justify-between items-center">
              <button
                className="cursor-pointer text-xl font-bold px-2"
                onClick={() => handleQtyChange(-1)}
              >
                -
              </button>
              <p>{qty}</p>
              <button
                className="cursor-pointer text-xl font-bold px-2"
                onClick={() => handleQtyChange(1)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="cursor-pointer font-semibold"
              onClick={() => handleQtyChange(1)}
            >
              ADD
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col mr-2">
        <p>Price</p>
        <div className="flex flex-row items-center">
          <IndianRupee size={19} />
          <p className="text-xl font-bold">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
