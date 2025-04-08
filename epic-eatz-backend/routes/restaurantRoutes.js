const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../utils/multerConfig");
const { registerRestaurant } = require("../controllers/restaurantController");

// restaurantRoutes.js
router.post(
  "/register-partner",
  auth,
  upload.fields([
    { name: "images", maxCount: 20 },
    { name: "fssai", maxCount: 1 },
    { name: "gst", maxCount: 1 },
    { name: "shopAct", maxCount: 1 },
    { name: "bankProof", maxCount: 1 },
  ]),
  registerRestaurant
);

module.exports = router;
