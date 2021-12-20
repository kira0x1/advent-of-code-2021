const fs = require("fs");

const testString = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const test = true;
const file = test ? testString : fs.readFileSync("./input.txt").toString();
const input = file.split("\n");

module.exports = input;
