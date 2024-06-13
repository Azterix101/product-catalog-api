const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { publishCatalogChange } = require("../utils/aws");

router.post("/", async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  publishCatalogChange(req.body.owner);
  res.status(201).send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  publishCatalogChange(category.owner);
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  publishCatalogChange(category.owner);
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.send(category);
});

module.exports = router;
