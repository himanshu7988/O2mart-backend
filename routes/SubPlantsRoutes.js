const express = require("express");
const router = express.Router();
const SubPlants = require("../models/SubPlants");
const fs = require("fs"); // ✅ Add
const path = require("path"); // ✅ Add

// GET /api/subplants?category=Indoor Plants
router.get("/", async (req, res) => {
  try {
    const { category } = req.query; // ✅ Extract query param

    let query = {};
    if (category) {
      query.category = category; // ✅ Filter by category string
    }

    const subplants = await SubPlants.find(query);
    res.json(subplants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/subplants/indoor (path param)
router.get("/:slug", async (req, res) => {
  try {
    const subplants = await SubPlants.find({ slug: req.params.slug });
    res.json(subplants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ NEW: Image proxy - Kills ORB!
router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename; // Rose.jpg
  const imagePath = path.join(__dirname, "..", "uploads", filename);

  // Security: Prevent directory traversal
  if (
    filename.includes("..") ||
    !filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  ) {
    return res.status(400).json({ error: "Invalid filename" });
  }

  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(`Image not found: ${imagePath}`);
      res.status(404).end();
    }
  });
});

module.exports = router;
