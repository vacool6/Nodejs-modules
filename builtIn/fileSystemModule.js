// Using this module we can interact/modify with systems files.

// DOCS: https://nodejs.org/api/fs.html

// Refer: fileSystem.txt

const fs = require("fs");

const modifiedData = "Hello new stuff";

fs.writeFile("example.txt", modifiedData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File has been modified successfully.");
});
