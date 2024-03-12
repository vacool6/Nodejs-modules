// Defining our custom error handling middleware
const express = require("express");

const app = express();

app.get("/error", (req, res, next) => {
  try {
    data.remove();
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send("Oops something went wrong!");
});

app.listen("8000", () => {
  console.log("Live at 8000");
});
