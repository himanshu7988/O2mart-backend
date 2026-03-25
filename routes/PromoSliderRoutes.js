const express = require("express");
const router = express.Router();
const PromoSlider = require("../models/PromoSlider"); // Create this model

// GET /api/promoSlider
router.get("/", async (req, res) => {
  try {
    const { category } = req.query; // Optional filter like SubPlants
    let query = {};
    if (category) {
      query.category = category;
    }
    const promos = await PromoSlider.find(query);
    res.json(promos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/promoSlider/:slug (matches SubPlants detail route)
router.get("/:slug", async (req, res) => {
  try {
    const promos = await PromoSlider.find({ slug: req.params.slug });
    res.json(promos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
