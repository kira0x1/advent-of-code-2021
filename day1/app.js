// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
const { input } = require("./input");

let delta = 0;

let a = [];
let b = [];

const windows = sliceWindow(input, 3);

for (let i = 1; i < windows.length; i++) {
  a = windows[i - 1];
  b = windows[i];

  let suma = 0;
  a.map((x) => (suma += x));
  let sumb = 0;
  b.map((x) => (sumb += x));

  if (sumb > suma) delta++;
}

function sliceWindow(arr, size) {
  let result = [];
  let lastWindow = arr.length - size;

  for (let i = 0; i <= lastWindow; i++) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

// console.table(windows);
console.log(delta);
