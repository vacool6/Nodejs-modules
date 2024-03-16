const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/productDB")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error connecting to db", err));

const app = express();
const corsOptions = {
  // Whitelisting
  //   origin: ["","",...],
  origin: "*",
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Routes
app.get("/products", async (req, res) => {
  try {
    const { page, limit } = req.query;

    if (!page && !limit) {
      const products = await Product.find();
      return res.status(200).send({ data: products });
    }

    // Method - 1 (basic)
    // const products = await Product.find();
    // const paginatedData = products.slice(page * limit - limit, page * limit);
    // return res.status(200).send({ data: paginatedData });

    // Method - 2 (built-in)
    const paginatedData = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return res.status(200).send({ data: paginatedData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).send({ data: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/product", async (req, res) => {
  try {
    const { name, price } = req.body;

    const newProduct = new Product({
      name,
      price: parseInt(price),
    });

    const dbResponse = await newProduct.save();

    if (dbResponse)
      res.status(201).send({ data: newProduct, message: "Product created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const dbResponse = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price: parseInt(price),
      },
      { new: true }
    );

    if (dbResponse)
      res.status(200).send({ product: dbResponse, message: "Product updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    res
      .status(200)
      .send({ product: deletedProduct, message: "Product deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen("3000", () => console.log("Live at 3000!"));
