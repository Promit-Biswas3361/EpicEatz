const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const RestaurantDocuments = require("../models/RestaurantDocuments");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documents");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Route to check if logged-in user has already added restaurant documents
router.get("/me", auth, async (req, res) => {
  // console.log("req.user");
  try {
    const existingDocs = await RestaurantDocuments.findOne({
      restaurantId: req.user.userId,
    });

    if (!existingDocs) {
      return res
        .status(404)
        .json({ exists: false, message: "No restaurant found" });
    }

    res.status(200).json({ exists: true, restaurant: existingDocs });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 📤 Route to upload restaurant documents
router.post(
  "/upload-documents",
  auth,
  upload.fields([
    { name: "fssai", maxCount: 1 },
    { name: "gst", maxCount: 1 },
    { name: "shopAct", maxCount: 1 },
    { name: "bankProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const documentPaths = {
        restaurantId: req.user.userId,
        fssai: req.files.fssai?.[0]?.path || "",
        gst: req.files.gst?.[0]?.path || "",
        shopAct: req.files.shopAct?.[0]?.path || "",
        bankProof: req.files.bankProof?.[0]?.path || "",
        pan: req.body.pan,
        ifsc: req.body.ifsc,
        accountNumber: req.body.accountNumber,
        password: req.body.password,
      };

      const updatedDoc = await RestaurantDocuments.findOneAndUpdate(
        { restaurantId: req.user.userId },
        documentPaths,
        { upsert: true, new: true }
      );

      res
        .status(201)
        .json({ message: "Documents uploaded successfully", updatedDoc });
    } catch (err) {
      res.status(500).json({ message: "Failed to upload", error: err.message });
    }
  }
);

module.exports = router;
