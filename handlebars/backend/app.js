const express = require("express");
const express_hbs = require("express-handlebars");

const app = express();
const PORT = 3000;

const data = [
  {
    id: 1,
    product: "Glasses",
    price: 3450,
    quantity: 50,
    description: "Get this product for",
  },
  {
    id: 3,
    product: "Rolex-y7",
    price: 12050,
    quantity: 5,
    description: "Own this luxury product for",
  },
  {
    id: 5,
    product: "Sweater",
    price: 1450,
    quantity: 10,
    description: "Product sells for",
  },
  {
    id: 7,
    product: "Phone",
    price: 14000,
    quantity: 50,
    description: "Own this luxury product for",
  },
];

// Engine setup
const handlebars = express_hbs.create();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/products", (req, res) => {
  res.render("allItems", { data });
});

app.get("/product/:id", (req, res) => {
  const { id } = req.params;

  const product = data.find((e) => e.id === parseInt(id));

  res.render("product", product);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
