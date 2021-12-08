const fs = require("fs");

const testString = `16,1,2,0,4,2,7,1,2,14`;

const test = false;
const file = test ? testString : fs.readFileSync("./input.txt").toString();

const input = file
  .split("\n")
  .join("")
  .split(",")
  .map((n) => Number(n));

// input.pop();

module.exports = input;
