require("dotenv").config(); 
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const FoodItem = require("../models/FoodItem");

// Replace with your actual MongoDB connection string
mongoose.connect(process.env.MONGO_URI);



const sampleData = [
  {
    restaurant_name: "The Spice House",
    restaurant_rating: 4.5,
    menu: [
      {
        name: "Paneer Butter Masala",
        price: 250,
        category: "Veg",
        img: "https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg",
      },
      {
        name: "Dal Tadka",
        price: 180,
        category: "Veg",
        img: "https://www.cookwithmanali.com/wp-content/uploads/2020/04/Restaurant-Style-Dal-Tadka.jpg",
      },
    ],
  },
  {
    restaurant_name: "Royal Biryani",
    restaurant_rating: 4.7,
    menu: [
      {
        name: "Chicken Biryani",
        price: 320,
        category: "Non Veg",
        img: "https://blendofspicesbysara.com/wp-content/uploads/2020/10/PXL_20201011_200951855.PORTRAIT-01.jpeg",
      },
      {
        name: "Mutton Biryani",
        price: 400,
        category: "Non Veg",
        img: "https://www.cubesnjuliennes.com/wp-content/uploads/2021/04/Best-Hyderabadi-Mutton-Biryani.jpg",
      },
    ],
  },
];

const insertData = async () => {
  try {
    // Delete existing data to avoid duplicates
    await Restaurant.deleteMany({});
    await FoodItem.deleteMany({});

    for (const data of sampleData) {
      // Step 1: Create Restaurant
      const restaurant = new Restaurant({
        name: data.restaurant_name,
        rating: data.restaurant_rating,
      });

      const savedRestaurant = await restaurant.save();

      // Step 2: Add Food Items and Link Them
      const foodItems = [];

      for (const item of data.menu) {
        const foodItem = new FoodItem({
          name: item.name,
          price: item.price,
          category: item.category,
          img: item.img,
          restaurant: savedRestaurant._id, // Link to restaurant
        });

        const savedFoodItem = await foodItem.save();
        foodItems.push(savedFoodItem._id); // Collect the IDs
      }

      // Step 3: Update Restaurant with FoodItem References
      savedRestaurant.menu = foodItems;
      await savedRestaurant.save();
    }

    console.log("Sample data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting sample data:", err);
  }
};

// Run the function
insertData();
