const math = require("./mathModule");
const helper = require("./helperModule");

console.log("Square of 5 is : ", math.twoPwr(5));
console.log("Cube of 5 is : ", math.threePwr(5));
console.log(
  "Extracting obj from string : ",
  helper.extractObjectFromString(
    '{"name": "John", "age": 30, "city": "New York"}'
  )
);
