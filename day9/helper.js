const fs = require("fs");

const testString = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const test = true;
const file = test ? testString : fs.readFileSync("./input.txt").toString();

const input = file.split("\n");

module.exports = input;
