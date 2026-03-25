require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // Or your connectDB
const cors = require("cors");
const path = require("path");

// Import routes AFTER app declaration
const authRoutes = require("./routes/AuthRoutes");
const brandRoutes = require("./routes/BrandRoutes");
const subPlantsRouter = require("./routes/SubPlantsRoutes");
const promoPlant = require("./routes/PromoSliderRoutes");
const searchRoutes = require("./routes/SearchRoutes");

const app = express(); // Declare BEFORE use()

app.set("etag", false);
app.disable("x-powered-by");

// ✅ BULLETPROOF CORS - Handles everything
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.status(200).end();
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// After express.json()
app.use("/uploads/:image", (req, res) => {
  const imageName = req.params.image;
  const imagePath = path.join(__dirname, "uploads", imageName);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "image/jpeg"); // ✅ ORB killer
  res.sendFile(imagePath, (err) => err && res.status(404).end());
});

app.use(express.static("public"));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes AFTER app setup

app.use("/api/auth", authRoutes);
app.use("/api", brandRoutes);
app.use("/api/subplants", subPlantsRouter);
app.use("/api/promoSlider", promoPlant);
app.use("/api/search", searchRoutes);

// console.log("MONGODB_URI Laxman:", process.env.MONGODB_URI);

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../plant/build')));
  app.get('/**/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../plant/build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
