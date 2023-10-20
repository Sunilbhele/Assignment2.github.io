const express = require("express");
const connection = require("./config/db");
const Product = require("./models/products");
const bodyParser = require("body-parser");
const app = express();
const productRouter = express.Router();

app.use(bodyParser.json());
app.use("/api/products", productRouter); // Mount the productRouter at '/api/products'

// Get all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching product by ID" });
  }
});


// Add a new product
productRouter.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update product by ID
productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete product by ID
productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndRemove(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete all products
productRouter.delete("/", async (req, res) => {
  try {
    await Product.deleteMany({});
    res.status(200).json({ message: "All products deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

productRouter.get("/search/:keyword", async (req, res) => {
  const { keyword } = req.params;

  try {
    const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error searching for products" });
  }
});

connection.once("open", () => {
  console.log("DB connected");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DressStore Application" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000. http://localhost:3000");
});
