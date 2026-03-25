const mongoose = require("mongoose");
const PromoSlider = require("./models/PromoSlider");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const plantProducts = [
  {
    title: "Rose Plant",
    desc: "Classic garden flowering plant with fragrant blooms - Medium Maintenance",
    image: "/images/outdoor/Rose.jpg",
    category: "Outdoor Plants",
    slug: "Rose Plant",
    price: "₹299",
  },
  {
    title: "Rubber Plant",
    desc: "Glossy-leaved ornamental plant ideal for modern interiors - Perfect for Home & Office Decor",
    image: "/images/giftPlant/RubberPlant.jpg",
    category: "Gift Plants",
    slug: "Gift Plants",
    price: "₹299",
  },
  {
    title: "Pineapple",
    desc: "Tropical fruit known for its sweet-tangy taste and vitamin C - Medium Maintenance",
    image: "/images/Fruit/Pineapple.jpg",
    category: "Fruit Plants",
    slug: "Pineapple",
    price: "₹299",
  },
  {
    title: "Money Plant",
    desc: "Popular indoor vine known for removing indoor pollutants - Easy Maintenance",
    image: "/images/AirPurifier/MoneyPlant.jpg",
    category: "Air Purifying",
    slug: "Money Plant",
    price: "₹299",
  },
  {
    title: "Arjun",
    desc: "Medicinal tree whose bark is widely used for heart health",
    image: "/images/MedicinalHerbal/Arjun.jpg",
    category: "Medicinal Herbal",
    slug: "Arjun",
    price: "₹299",
  },
];

PromoSlider.insertMany(plantProducts)
  .then(() => {
    console.log("Promo Plant seeded");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
