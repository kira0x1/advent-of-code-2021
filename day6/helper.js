const fs = require("fs");

const testString = `3,4,3,1,2`;

const test = false;
const file = test ? testString : fs.readFileSync("./input.txt").toString();

const input = file
  .split("\n")
  .join("")
  .split(",")
  .map((n) => Number(n));

// input.pop();

module.exports = input;
