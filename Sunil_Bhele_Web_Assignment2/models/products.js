const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  published: Boolean,
  category: String,
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
