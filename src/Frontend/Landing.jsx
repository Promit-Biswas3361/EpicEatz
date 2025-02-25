import React from "react";
import NavbarLanding from "./NavbarLanding";
import FoodCard from "./FoodCard";
import biryani from "../assets/Biryani.png";
import burger from "../assets/burger.png";
import cake from "../assets/cake.png";
import dosa from "../assets/Dosa.png";
import momos from "../assets/momos.png";
import noodles from "../assets/noodles.png";
import paratha from "../assets/parantha.png";
import pizza from "../assets/pizza.jpg";
import salad from "../assets/salad.png";
import rolls from "../assets/Rolls.png";
import pav from "../assets/pav.png";
import pasta from "../assets/pasta.png";
import bhature from "../assets/Chhole_Bhature.png";
import khichdi from "../assets/khichdi.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

const foodItems = [
  { id: 1, name: "Biryani", url: biryani },
  { id: 2, name: "Burger", url: burger },
  { id: 3, name: "Cake", url: cake },
  { id: 4, name: "Dosa", url: dosa },
  { id: 5, name: "Momos", url: momos },
  { id: 6, name: "Noodles", url: noodles },
  { id: 7, name: "Paratha", url: paratha },
  { id: 8, name: "Pizza", url: pizza },
  { id: 9, name: "Salad", url: salad },
  { id: 10, name: "Rolls", url: rolls },
  { id: 11, name: "Pav Bhaji", url: pav },
  { id: 12, name: "Pasta", url: pasta },
  { id: 13, name: "Chhole Bhature", url: bhature },
  { id: 14, name: "Khichdi", url: khichdi },
];

const Landing = () => {
  return (
    <div>
      <NavbarLanding />
      {/* <Navbar /> */}

      <div className="mt-25 mx-3">
        <p className="text-2xl font-bold mb-7">What's on your mind?</p>
        <div className="flex flex-row flex-wrap justify-evenly">
          {foodItems.map((item) => (
            <FoodCard key={item.id} name={item.name} url={item.url} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
