const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model("Category", CategorySchema);
