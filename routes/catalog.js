const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");

router.get("/:ownerId", async (req, res) => {
  const categories = await Category.find({ owner: req.params.ownerId }).lean();
  const products = await Product.find({ owner: req.params.ownerId }).lean();

  const catalog = {
    owner: req.params.ownerId,
    catalog: categories.map((category) => ({
      category_title: category.title,
      category_description: category.description,
      items: products.filter(
        (product) => product.category.toString() === category._id.toString()
      ),
    })),
  };

  res.send(catalog);
});

module.exports = router;
