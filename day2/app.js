const fs = require("fs");

const inputFile = fs.readFileSync("./input.txt").toString();
const inputByLine = inputFile.split("\n");
inputByLine.pop();
inputByLine.map((i) => console.log(i));

// const inputByLine = [
//   "forward 5",
//   "down 5",
//   "forward 8",
//   "up 3",
//   "down 8",
//   "forward 2",
// ];

let aim = 0;
let depth = 0;
let h = 0;

for (const input of inputByLine) {
  let isDown = false;
  let isUp = false;
  let isForward = false;

  let value = 0;

  if (input.startsWith("forward")) {
    isForward = true;
    value = Number(input.replace("forward ", ""));
  } else if (input.startsWith("up")) {
    isUp = true;
    value = Number(input.replace("up ", ""));
  } else if (input.startsWith("down")) {
    isDown = true;
    value = Number(input.replace("down ", ""));
  }

  if (isDown) aim += value;
  if (isUp) aim -= value;
  if (isForward) {
    h += value;
    depth += value * aim;
  }
}

console.log(h);
console.log(depth);

console.log(`res: ${h * depth}`);
