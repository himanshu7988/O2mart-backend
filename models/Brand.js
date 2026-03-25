const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: String, required: true },
    originalPrice: String, // Optional
  },
  { timestamps: true },
);

module.exports = mongoose.model("Brand", brandSchema);
