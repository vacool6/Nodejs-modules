const express = require("express");

const app = express();

// Middlewares runs no matter what on any route
app.use((req, res, next) => {
  console.log("First custom middleware!");
  //   next();
  //   console.log("First custom middleware! After next");
  // ^ To avoid code execution after next its a good practice to return next

  return next();
  console.log("First custom middleware! After next");
});

app.use((req, res, next) => {
  console.log("Second custom middleware!");
  return next();
});

// Route specific middleware
app.use("/private", (req, res, next) => {
  console.log("This is a private middleware");
  return next();
});

app.get("/", (req, res) => {
  res.send("Hit");
});

app.get("/home", (req, res) => {
  res.send("Home page!");
});

app.get("/private", (req, res) => {
  res.send("Private page!");
});

// 404 route
app.all("*", (req, res) => {
  res.send("Not found!");
});

app.listen("8000", () => {
  console.log("Live at 8000");
});
