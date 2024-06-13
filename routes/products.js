const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { publishCatalogChange } = require("../utils/aws");

router.post("/", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  publishCatalogChange(req.body.owner);
  res.status(201).send(product);
});

router.put("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  publishCatalogChange(product.owner);
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  publishCatalogChange(product.owner);
  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
});

module.exports = router;
