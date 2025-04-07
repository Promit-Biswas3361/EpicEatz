const Partner = require("../models/Partner");

// STEP 1: Restaurant Info + Owner Info + Address
exports.handleStep1 = async (req, res) => {
  console.log("✅ Step1 reached");
  try {
    const userId = req.user.userId;
    const {
      restaurantName,
      fullName,
      email,
      phone,
      address,
      city,
      pin,
      state,
    } = req.body;

    const existingPartner = await Partner.findById(userId);

    if (existingPartner) {
      // Update existing Partner
      existingPartner.restaurantName = restaurantName;
      existingPartner.owner = { fullName, email, phone };
      existingPartner.address = { line: address, city, pin, state };

      const updated = await existingPartner.save();
      return res.status(200).json({ message: "Step 1 updated", partner: updated });
    } else {
      // Create new Partner with _id = userId
      const newPartner = new Partner({
        _id: userId, // ✅ Important line
        restaurantName,
        owner: { fullName, email, phone },
        address: { line: address, city, pin, state },
      });

      const saved = await newPartner.save();
      return res.status(201).json({ message: "Step 1 completed", partner: saved });
    }
  } catch (err) {
    console.error("Step 1 error:", err.message);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


// STEP 2: Menu + Operational Info
exports.handleStep2 = async (req, res) => {
  try {
    const { openTime, closeTime } = req.body;
    const openDays = JSON.parse(req.body.openDays || "[]");

    let menu = [];

    if (req.body["menuItems[]"]) {
      const rawItems = req.body["menuItems[]"];
      let menuItems = [];

      if (typeof rawItems === "string") {
        menuItems.push(JSON.parse(rawItems));
      } else if (Array.isArray(rawItems)) {
        menuItems = rawItems.map((item) => JSON.parse(item));
      }

      req.files.forEach((file, index) => {
        if (menuItems[index]) {
          menuItems[index].imageUrl = file.path;
        }
      });

      menu = menuItems;
    } else if (req.body.itemNames) {
      let parsedNames = req.body.itemNames;
      if (typeof parsedNames === "string") {
        parsedNames = JSON.parse(parsedNames);
      }

      menu = req.files.map((file, index) => ({
        name: parsedNames[index],
        imageUrl: `/uploads/${file.filename}`,
      }));
    }

    const updated = await Partner.findByIdAndUpdate(
      req.user.userId,
      {
        openTime,
        closeTime,
        openDays,
        menu,
      },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Step 2 completed", partner: updated });
  } catch (err) {
    console.error("Step 2 error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
