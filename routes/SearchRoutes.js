const express = require("express");
const router = express.Router();
const SubPlants = require("../models/SubPlants"); // or AllPlants/PromoSlider

// GET /api/search?q=snake
router.get("/", async (req, res) => {
  try {
    const { q } = req.query; // search term

    if (!q || typeof q !== "string") {
      return res.status(400).json({ error: "Missing search query ?q=" });
    }

    // Simple case-insensitive search on name/title/category
    const regex = new RegExp(q, "i");

    const results = await SubPlants.find({
      $or: [
        { name: regex },
        { title: regex }, // if your model has title
        { category: regex },
        { desc: regex }, // optional description field
      ],
    }).limit(20); // avoid huge responses

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
