const Brand = require("../models/Brand");

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
