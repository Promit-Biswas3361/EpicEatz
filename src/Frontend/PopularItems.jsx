import React from "react";
import { useNavigate } from "react-router-dom";

const PopularItems = ({ name, url }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dish/${name}`);
      const data = await response.json();

      console.log(data);

      if (response.ok) {
        navigate(`/dish/${name}`, { state: { dishData: data } });
      } else {
        alert(data.message || "Dish not found");
      }
    } catch (error) {
      console.error("Failed to fetch dish: ", error);
      alert("Error fetching dish: ");
    }
  };

  return (
    <div
      className="cursor-pointer text-center w-max-45 h-auto mx-3 md:mx-5 lg:mx-7 mb-10"
      onClick={handleClick}
    >
      <img
        src={url}
        alt={name}
        className="rounded-[50%] overflow-hidden h-35 w-35 lg:h-37 lg:w-37"
      />
      <p className="text-lg">{name}</p>
    </div>
  );
};

export default PopularItems;
