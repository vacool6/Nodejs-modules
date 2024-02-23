// Creating a buffer from a string
const buf1 = Buffer.from("Newton School!");

// Converting buffer to string
console.log(buf1);
console.log(buf1.toString());

// Accessing individual bytes that outputs ASCII values
for (let i = 0; i < buf1.toString().length; i++) {
  console.log(`ASCII value of ${buf1.toString()[i]}`, buf1[i]);
  // ASCII table: https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html
}

// Creating & writing to a buffer of size 10
const buf2 = Buffer.alloc(10);
buf2.write("Node.js");
console.log(buf2.toString());
