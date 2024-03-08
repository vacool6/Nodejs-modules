// How we can use middlewares to protect few routes
const express = require("express");

const app = express();

// app.use("/secret", (req, res, next) => {
//   const { password } = req.query;

//   if (password === "123!") return next();

//   res.send("Sorry you are not allowed here");
// });

// Better approach
const guard = (req, res, next) => {
  const { password } = req.query;
  if (password === "123!") return next();
  res.send("Sorry you are not allowed here");
};

app.get("/public", (req, res) => {
  res.send("Welcome");
});

app.get("/secret", guard, (req, res) => {
  res.send("The treasure is under your pillow");
});

app.listen("8000", () => {
  console.log("Live at 8000");
});
