// models/SubPlants.js - CommonJS for your seed.js
const mongoose = require("mongoose");

const featuresSchema = new mongoose.Schema({
  rawMaterial: [String],
  temperature: String,
  sunlight: String,
  waterFrequency: String,
  oxygenEmission: String,
  difficulty: String,
});

const PlantSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    scientificName: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: featuresSchema, required: true },
    price: { type: String, required: true },
    originalPrice: String,
    deliveryBy: { type: String, required: true },
    offers: [String],
    category: {
      type: String,
      required: true,
      enum: [
        "Fruit Plants",
        "Outdoor Plants",
        "Flowering Plants",
        "Indoor Plants",
        "Gift Plants",
        "Air Purifying",
        "Medicinal Herbal",
        "Succulents Cacti",
      ],
    },
  },
  {
    timestamps: true, // ✅ OPTIONS object (2nd param)
  },
); // ❌ NOT here: }, { timestamps: true });

PlantSchema.index({ category: 1 });

module.exports = mongoose.model("SubPlants", PlantSchema); // Match your require()
