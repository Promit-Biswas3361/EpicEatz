import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import FoodCard from "./FoodCard";

const searchResult = [
  {
    id: 1,
    restaurant_name: "The Spice House",
    restaurant_rating: 4.5,
    item: {
      name: "Paneer Butter Masala",
      price: 250,
      category: "Veg",
      img: "https://example.com/paneer-butter-masala.jpg"
    }
  },
  {
    id: 2,
    restaurant_name: "Royal Biryani",
    restaurant_rating: 4.7,
    item: {
      name: "Chicken Biryani",
      price: 320,
      category: "Non Veg",
      img: "https://example.com/chicken-biryani.jpg"
    }
  },
  {
    id: 3,
    restaurant_name: "Pasta Paradise",
    restaurant_rating: 4.3,
    item: {
      name: "Creamy Alfredo Pasta",
      price: 280,
      category: "Veg",
      img: "https://example.com/alfredo-pasta.jpg"
    }
  },
  {
    id: 4,
    restaurant_name: "Burger Hub",
    restaurant_rating: 4.6,
    item: {
      name: "Cheese Burger",
      price: 180,
      category: "Non Veg",
      img: "https://example.com/cheese-burger.jpg"
    }
  },
  {
    id: 5,
    restaurant_name: "Sushi World",
    restaurant_rating: 4.8,
    item: {
      name: "Salmon Sushi",
      price: 450,
      category: "Non Veg",
      img: "https://example.com/salmon-sushi.jpg"
    }
  },
  {
    id: 6,
    restaurant_name: "Vegan Delights",
    restaurant_rating: 4.2,
    item: {
      name: "Vegan Bowl",
      price: 220,
      category: "Veg",
      img: "https://example.com/vegan-bowl.jpg"
    }
  },
  {
    id: 7,
    restaurant_name: "Tandoori Nights",
    restaurant_rating: 4.5,
    item: {
      name: "Tandoori Chicken",
      price: 350,
      category: "Non Veg",
      img: "https://example.com/tandoori-chicken.jpg"
    }
  },
  {
    id: 8,
    restaurant_name: "Pizza Mania",
    restaurant_rating: 4.6,
    item: {
      name: "Margherita Pizza",
      price: 300,
      category: "Veg",
      img: "https://example.com/margherita-pizza.jpg"
    }
  },
  {
    id: 9,
    restaurant_name: "Street Chaat",
    restaurant_rating: 4.1,
    item: {
      name: "Pani Puri",
      price: 80,
      category: "Veg",
      img: "https://example.com/pani-puri.jpg"
    }
  },
  {
    id: 10,
    restaurant_name: "Steak House",
    restaurant_rating: 4.9,
    item: {
      name: "Grilled Steak",
      price: 600,
      category: "Non Veg",
      img: "https://example.com/grilled-steak.jpg"
    }
  },
  {
    id: 11,
    restaurant_name: "South Indian Spice",
    restaurant_rating: 4.4,
    item: {
      name: "Masala Dosa",
      price: 150,
      category: "Veg",
      img: "https://example.com/masala-dosa.jpg"
    }
  },
  {
    id: 12,
    restaurant_name: "Seafood Delight",
    restaurant_rating: 4.7,
    item: {
      name: "Garlic Butter Prawns",
      price: 500,
      category: "Non Veg",
      img: "https://example.com/garlic-prawns.jpg"
    }
  },
  {
    id: 13,
    restaurant_name: "Dessert Heaven",
    restaurant_rating: 4.3,
    item: {
      name: "Chocolate Lava Cake",
      price: 220,
      category: "Veg",
      img: "https://example.com/lava-cake.jpg"
    }
  },
  {
    id: 14,
    restaurant_name: "BBQ Nation",
    restaurant_rating: 4.6,
    item: {
      name: "BBQ Chicken Wings",
      price: 270,
      category: "Non Veg",
      img: "https://example.com/bbq-wings.jpg"
    }
  },
  {
    id: 15,
    restaurant_name: "Café Mocha",
    restaurant_rating: 4.2,
    item: {
      name: "Cappuccino",
      price: 150,
      category: "Veg",
      img: "https://example.com/cappuccino.jpg"
    }
  }
];



const Search = () => {
//   const [searchResult, setSearchResult] = useState(null);
  const location = useLocation();
  const isDish = location.pathname.startsWith("/dish");
  const isRestaurant = location.pathname.startsWith("/restaurant");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow mt-15 mx-5">
        {searchResult ? (
          <>
            {isDish && (
                <div className="flex flex-row flex-wrap justify-evenly bg-gray-100 py-8 rounded">
                    {searchResult.map((item) => (
                        <FoodCard key={item.id} dish={item}/>
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
