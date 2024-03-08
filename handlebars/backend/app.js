const e = require("express");
const express = require("express");
const express_hbs = require("express-handlebars");
const fs = require("fs");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

// Write to file helper
function writeToFileHelper(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const path = `${__dirname}/fakeDB.json`;
let data = JSON.parse(fs.readFileSync(path));

// Engine setup
const handlebars = express_hbs.create();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// READ---
app.get("/products", (req, res) => {
  res.render("allItems", { data });
});

app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const product = data.find((e) => e.id === parseInt(id));

  if (!product) {
    return res.status(404).send({ message: "Not found!" });
  }

  res.render("product", product);
});
// ---

// CREATE---
app.get("/add-product", (req, res) => {
  res.render("addProduct");
});

app.post("/product", (req, res) => {
  const { product_name, price, quantity, description } = req.body;
  const pid = Math.ceil(Math.random() * 1000);

  const newProduct = {
    id: pid,
    product: product_name,
    price: parseInt(price),
    quantity: parseInt(quantity),
    description,
  };

  data.push(newProduct);

  writeToFileHelper(path, data)
    .then(() => {
      res.redirect(`/product/${pid}`);
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(500).send({ message: "Internal server error" });
    });
});
// ---

// DELETE---
app.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  const product = data.find((e) => e.id === parseInt(id));

  if (!product) {
    return res.status(404).send({ message: "Not found!" });
  }

  const updatedData = data.filter((e) => e.id !== product.id);
  data = updatedData;

  writeToFileHelper(path, data)
    .then(() => {
      res.redirect(`/products`);
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(500).send({ message: "Internal server error" });
    });
});
// ---

// UPDATE---
app.get("/edit-product/:id", (req, res) => {
  const { id } = req.params;
  const product = data.find((e) => e.id === parseInt(id));

  if (!product) {
    return res.status(404).send({ message: "Not found!" });
  }

  res.render("editProduct", product);
});

app.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const { product_name, price, quantity, description } = req.body;

  const product = data.find((e) => e.id === parseInt(id));

  data.map((e) => {
    if (e.id === product.id) {
      (e.product = product_name),
        (e.price = parseInt(price)),
        (e.quantity = parseInt(quantity)),
        (e.description = description);
    }
    return e;
  });

  writeToFileHelper(path, data)
    .then(() => {
      res.redirect(`/products`);
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(500).send({ message: "Internal server error" });
    });
});

// ---

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
