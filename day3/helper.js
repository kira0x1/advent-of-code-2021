const fs = require("fs");

const testString = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

const test = false;
const file = test ? testString : fs.readFileSync("./input.txt").toString();

const input = file.split("\n");
input.pop();

module.exports = input;
