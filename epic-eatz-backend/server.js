require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth"); // ✅ Import middleware
const app = express();


app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend to access backend
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/food", require("./routes/foodRoutes"));
const userRoutes = require("./routes/userRoutes.js");
console.log("🔍 Debug: userRoutes =", userRoutes);
app.use("/api/user", userRoutes);


// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop the server if DB fails
  });

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
