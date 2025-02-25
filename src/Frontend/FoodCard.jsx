import React from "react";
import Burger from "../assets/salad.png";

const FoodCard = ({ name, url }) => {
  return (
    <div className="cursor-pointer text-center w-max-45 h-auto mx-3 md:mx-5 lg:mx-7 mb-10">
      <img
        src={url}
        alt={name}
        className="rounded-[50%] overflow-hidden h-35 w-35 lg:h-37 lg:w-37"
      />
      <p className="text-lg">{name}</p>
    </div>
  );
};

export default FoodCard;
