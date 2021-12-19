const fs = require("fs");

const testString = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const test = false;
const file = test ? testString : fs.readFileSync("./input.txt").toString();
const input = file.split("\n");

module.exports = input;
