import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation, useParams } from "react-router-dom";
import FoodCard from "./FoodCard";

const Search = () => {
  const location = useLocation();
  const isDish = location.pathname.startsWith("/dish");
  const isRestaurant = location.pathname.startsWith("/restaurant");
  const searchResult = location.state?.dishData || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow mx-5 mt-50">
        {searchResult && searchResult.length > 0 ? (
          <>
            {isDish && (
              <div className="flex flex-row flex-wrap justify-evenly bg-gray-100 py-8 rounded">
                {searchResult.map((restaurant, index) => (
                  <div key={index}>
                    {restaurant.item.map((dish, i) => (
                      <FoodCard
                        key={i}
                        dish={{
                          item: dish,
                          restaurant_name: restaurant.restaurant_name,
                          restaurant_rating: restaurant.restaurant_rating,
                        }}
                      />
                    ))}
                  </div>
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
