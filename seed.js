const mongoose = require("mongoose");
const Brand = require("./models/Brand");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const brands = [
  {
    image: "/images/indoor.jpg",
    brand: "Indoor Plants",
    price: "Starting ₹699",
  },
  {
    image: "/images/outdoor.jpg",
    brand: "Outdoor Plants",
    price: "Starting ₹499",
  },
  {
    image: "/images/flowering.jpg",
    brand: "Flowering Plants",
    price: "Starting ₹189",
  },
  {
    image: "/images/cacti.jpg",
    brand: "Succulents & Cacti",
    price: "Starting ₹699",
  },
  {
    image: "/images/herbal.jpg",
    brand: "Medicinal/Herbal",
    price: "Starting ₹499",
  },
  {
    image: "/images/fruit.jpg",
    brand: "Fruit Plants",
    price: "Starting ₹499",
  },
  {
    image: "/images/airPurify.jpg",
    brand: "Air Purifying",
    price: "Starting ₹399",
  },
  {
    image: "/images/giftPlant.jpg",
    brand: "Gift Plants",
    price: "Starting ₹299",
  },
];

Brand.insertMany(brands).then(() => {
  console.log("Brands seeded");
  process.exit();
});
