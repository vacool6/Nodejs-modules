const express = require("express");
const fs = require("fs");

const app = express();

// Middlewares ----
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing Form data

// DB ----
const path = `${__dirname}/fakeProducts.json`;
const products = JSON.parse(fs.readFileSync(path)); // console.log(__dirname)

// Routes ----
app.get("/products", (req, res) => {
  try {
    res.status(200).send({ message: "Success!", data: products });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/product/:name", (req, res) => {
  const { name } = req.params;
  try {
    const product = products.find((e) => e.name === name);

    if (product) {
      return res.status(200).send({ message: "Success!", data: product });
    }
    return res.status(404).send({ message: "Not found!", data: {} });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/product", (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    if (!name || !price || !quantity) {
      return res
        .status(400)
        .send({ message: "Either name, quantity or price fields" });
    }
    const newProduct = {
      id: Math.ceil(Math.random() * 1000),
      name,
      price: parseInt(price),
      quantity: parseInt(quantity),
    };

    products.push(newProduct);

    fs.writeFileSync(path, JSON.stringify(products), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Oops operation failed" });
      }
    });

    return res.status(201).send({
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  try {
    const product = products.find((e) => e.id === parseInt(id));
    if (product) {
      if (!name || !price || !quantity) {
        return res
          .status(400)
          .send({ message: "Either name, quantity or price fields" });
      }

      products.map((e) => {
        if (e.id === parseInt(id)) {
          (e.name = name), (e.price = parseInt(price));
          e.quantity = parseInt(quantity);

          return e;
        }
        return e;
      });

      fs.writeFileSync(path, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Oops operation failed" });
        }
      });

      return res.status(200).send({ message: "Success!", data: products });
    }
    return res.status(404).send({ message: "Not found!", data: {} });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  try {
    const product = products.find((e) => e.id === parseInt(id));
    console.log(product);
    if (product) {
      const updatedProductList = products.filter((e) => e.id !== product.id);

      fs.writeFileSync(path, JSON.stringify(updatedProductList), (err) => {
        console.log(err);
        return res.status(500).send({ message: "Oops operation failed" });
      });

      return res.status(200).send({
        message: "Successfully removed product",
        removedData: product,
      });
    }
    return res.status(404).send({ message: "Not found! Operation failed" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.listen("8080", () => {
  console.log("We are live on 8080!");
});
