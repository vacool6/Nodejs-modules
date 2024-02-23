// Helps to get systems os info

// DOCS: https://nodejs.org/api/os.html

const os = require("os");

console.log("ARCH :", os.arch());
console.log("CPUs :", os.cpus());
console.log("Free mem :", os.freemem());
console.log("Total eme :", os.totalmem());
console.log("> :", os.availableParallelism());
