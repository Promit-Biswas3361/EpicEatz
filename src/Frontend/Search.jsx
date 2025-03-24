import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import FoodCard from "./FoodCard";

const result = [
  {
    id: 1,
    restaurant_name: "The Spice House",
    restaurant_rating: 4.5,
    item: {
      name: "Paneer Butter Masala",
      price: 250,
      category: "Veg",
      img: "https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg",
    },
  },
  {
    id: 2,
    restaurant_name: "Royal Biryani",
    restaurant_rating: 4.7,
    item: {
      name: "Chicken Biryani",
      price: 320,
      category: "Non Veg",
      img: "https://blendofspicesbysara.com/wp-content/uploads/2020/10/PXL_20201011_200951855.PORTRAIT-01.jpeg",
    },
  },
  {
    id: 3,
    restaurant_name: "Pasta Paradise",
    restaurant_rating: 4.3,
    item: {
      name: "Creamy Alfredo Pasta",
      price: 280,
      category: "Veg",
      img: "https://www.halfbakedharvest.com/wp-content/uploads/2021/04/One-Pot-Creamy-Penne-Alfredo-with-Spicy-Arugula-1.jpg",
    },
  },
  {
    id: 4,
    restaurant_name: "Burger Hub",
    restaurant_rating: 4.6,
    item: {
      name: "Cheese Burger",
      price: 180,
      category: "Non Veg",
      img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg",
    },
  },
  {
    id: 5,
    restaurant_name: "Sushi World",
    restaurant_rating: 4.8,
    item: {
      name: "Salmon Sushi",
      price: 450,
      category: "Non Veg",
      img: "https://aisforappleau.com/wp-content/uploads/2023/07/how-to-make-sushi-salmon-nigiri-6.jpg",
    },
  },
  {
    id: 6,
    restaurant_name: "Vegan Delights",
    restaurant_rating: 4.2,
    item: {
      name: "Vegan Bowl",
      price: 220,
      category: "Veg",
      img: "https://minimalistbaker.com/wp-content/uploads/2015/04/30-minute-CHICKPEA-Sweet-Potato-BUDDHA-Bowls-A-complete-meal-packed-with-protein-fiber-and-healthy-fats-with-a-STELLAR-Tahini-Lemon-Maple-Sauce-vegan-glutenfree-healthy.jpg",
    },
  },
  {
    id: 7,
    restaurant_name: "Tandoori Nights",
    restaurant_rating: 4.5,
    item: {
      name: "Tandoori Chicken",
      price: 350,
      category: "Non Veg",
      img: "https://www.hungrylankan.com/wp-content/uploads/2022/12/dosa-and-sambar-1-500x500.jpg",
    },
  },
  {
    id: 8,
    restaurant_name: "Pizza Mania",
    restaurant_rating: 4.6,
    item: {
      name: "Margherita Pizza",
      price: 300,
      category: "Veg",
      img: "https://safrescobaldistatic.blob.core.windows.net/media/2022/11/PIZZA-MARGHERITA.jpg",
    },
  },
  {
    id: 9,
    restaurant_name: "Street Chaat",
    restaurant_rating: 4.1,
    item: {
      name: "Pani Puri",
      price: 80,
      category: "Veg",
      img: "https://cdn1.foodviva.com/static-content/food-images/snacks-recipes/pani-puri/pani-puri.jpg",
    },
  },
  {
    id: 10,
    restaurant_name: "Steak House",
    restaurant_rating: 4.9,
    item: {
      name: "Grilled Steak",
      price: 600,
      category: "Non Veg",
      img: "https://www.halfbakedharvest.com/wp-content/uploads/2018/06/Korean-Grilled-Steak-with-Toasted-Sesame-Chimichurri-1.jpg",
    },
  },
  {
    id: 11,
    restaurant_name: "South Indian Spice",
    restaurant_rating: 4.4,
    item: {
      name: "Masala Dosa",
      price: 150,
      category: "Veg",
      img: "https://i0.wp.com/binjalsvegkitchen.com/wp-content/uploads/2015/12/Masala-Dosa-L1.jpg?resize=600%2C900&ssl=1",
    },
  },
  {
    id: 12,
    restaurant_name: "Seafood Delight",
    restaurant_rating: 4.7,
    item: {
      name: "Garlic Butter Prawns",
      price: 500,
      category: "Non Veg",
      img: "https://headbangerskitchen.com/wp-content/uploads/2023/01/BGPRAWNS-Vertical.jpg",
    },
  },
  {
    id: 13,
    restaurant_name: "Dessert Heaven",
    restaurant_rating: 4.3,
    item: {
      name: "Chocolate Lava Cake",
      price: 220,
      category: "Veg",
      img: "https://bluebowlrecipes.com/wp-content/uploads/2022/01/molten-chocolate-lava-cakes-for-two-7641.jpg",
    },
  },
  {
    id: 14,
    restaurant_name: "BBQ Nation",
    restaurant_rating: 4.6,
    item: {
      name: "BBQ Chicken Wings",
      price: 270,
      category: "Non Veg",
      img: "https://iamhomesteader.com/wp-content/uploads/2023/02/bbq-wings.jpg",
    },
  },
  {
    id: 15,
    restaurant_name: "Café Mocha",
    restaurant_rating: 4.2,
    item: {
      name: "Cappuccino",
      price: 150,
      category: "Veg",
      img: "https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg",
    },
  },
];

const Search = () => {
  const [searchResult, setSearchResult] = useState(result);
  const location = useLocation();
  const isDish = location.pathname.startsWith("/dish");
  const isRestaurant = location.pathname.startsWith("/restaurant");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow mx-5 mt-50">
        {searchResult ? (
          <>
            {isDish && (
              <div className="flex flex-row flex-wrap justify-evenly bg-gray-100 py-8 rounded">
                {searchResult.map((item) => (
                  <FoodCard key={item.id} dish={item} />
                ))}
              </div>
            )}
            {isRestaurant && <p>Searched Restaurants</p>}
          </>
        ) : (
          <p className="text-lg font-semibold">
            Oops! We couldn't find what you were looking for.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Search;
