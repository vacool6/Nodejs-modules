const bcrypt = require("bcrypt");

const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(4);
  const hash = await bcrypt.hash(password, salt);

  console.log("Salt:", salt);
  console.log("Hash:", hash);
};

hashedPassword();

// const login = async (password, hashedPassword) => {
//   const result = await bcrypt.compare(password, hashedPassword);

//   if (result) {
//     console.log("Successfully logged in.");
//   } else {
//     console.log("Login failed.");
//   }
// };

// login()
