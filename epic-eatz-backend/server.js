require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // 👈 ADD THIS
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/restaurant", require("./routes/restaurantRoutes")); 
app.use("/api/dish", require("./routes/searchRoutes"));
app.use("/api/cart", require("./routes/cartRoutes")); 


// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
