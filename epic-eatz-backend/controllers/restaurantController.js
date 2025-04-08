const User = require("../models/User"); 
const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
exports.registerRestaurant = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      restaurantName,
      openTime,
      closeTime,
      pan,
      ifsc,
      accountNumber,
    } = req.body;

    const address = {
      line: req.body["address[line]"],
      city: req.body["address[city]"],
      pin: req.body["address[pin]"],
      state: req.body["address[state]"],
    };

    const openDays = Array.isArray(req.body["openDays[]"])
      ? req.body["openDays[]"]
      : [req.body["openDays[]"]];

    const menu = [];
    const imageFiles = req.files["images"] || [];

    let i = 0;
    while (req.body[`menuItems[${i}][name]`]) {
      menu.push({
        name: req.body[`menuItems[${i}][name]`],
        category: req.body[`menuItems[${i}][category]`],
        price: req.body[`menuItems[${i}][price]`],
        imageUrl: imageFiles[i]?.path || "",
      });
      i++;
    }

    const documents = {
      fssai: req.files?.fssai?.[0]?.path || "",
      gst: req.files?.gst?.[0]?.path || "",
      shopAct: req.files?.shopAct?.[0]?.path || "",
      bankProof: req.files?.bankProof?.[0]?.path || "",
      pan,
      ifsc,
      accountNumber,
    };

    // ✅ Check if user exists by email
    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role: "Partner",
      });
    } else {
      // ✅ If user exists but not partner, throw error
      if (user.role !== "Partner") {
        return res.status(400).json({
          message: "Email already exists with a different role",
        });
      }
    }

    // ✅ Create or update restaurant
    const newRestaurant = await Restaurant.findOneAndUpdate(
      { owner: user._id },
      {
        restaurantName,
        owner: user._id,
        address,
        openTime,
        closeTime,
        openDays,
        menu,
        documents,
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: "Restaurant registered",
      restaurant: newRestaurant,
    });
  } catch (err) {
    console.error("Register restaurant error:", err.message);
    res.status(500).json({ message: "Failed to register", error: err.message });
  }
};
