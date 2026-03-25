const mongoose = require("mongoose");

const promoSliderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Matches frontend + SubPlants 'name'
    desc: { type: String, required: true }, // Frontend description
    image: { type: String, required: true }, // /uploads/promo1.jpg
    category: { type: String }, // e.g., "Featured", "Discounts"
    slug: { type: String, unique: true }, // SEO-friendly
    price: { type: String }, // "From ₹999"
    // Add other SubPlants keys as needed: name, stock, etc.
  },
  { timestamps: true },
);

module.exports = mongoose.model("PromoSlider", promoSliderSchema);
