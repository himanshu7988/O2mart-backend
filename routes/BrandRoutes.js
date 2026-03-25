const express = require("express");
const { getBrands } = require("../controllers/BrandController");
const router = express.Router();

router.get("/brands", getBrands);

module.exports = router;
