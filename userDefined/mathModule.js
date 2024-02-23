const add = (...num) => {
  let sum = 0;

  for (let i of num) {
    sum += i;
  }

  return sum;
};

const twoPwr = (num) => {
  return num ** 2;
};

const threePwr = (num) => {
  return num ** 3;
};

const PI = 3.141;

module.exports.twoPwr = twoPwr;
module.exports.add = add;
module.exports.PI = PI;
module.exports.threePwr = threePwr;
