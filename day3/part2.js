const input = require("./helper");

let i = 0;
const bits = input[0].length;
let left = [...input];

let oxygen = 0;

for (let i = 0; i < bits; i++) {
  let z = 0;
  let o = 0;

  for (const line of left) {
    const char = line[i];
    if (char === "0") z++;
    else o++;
  }

  const mostCommon = z > o ? "0" : "1";
  left = left.filter((c) => c[i] === mostCommon);

  // console.log(i);
  // console.log(`ones: ${o}, zeros: ${z}`);
  // console.log(mostCommon);
  // console.table(left);

  if (left.length === 1) {
    oxygen = parseInt(left[0], 2);
  }
}

left = [...input];
let co2 = 0;

for (let i = 0; i < bits; i++) {
  let z = 0;
  let o = 0;

  for (const line of left) {
    const char = line[i];
    if (char === "0") z++;
    else o++;
  }

  const mostCommon = z > o ? "1" : "0";
  left = left.filter((c) => c[i] === mostCommon);

  if (left.length === 1) {
    co2 = parseInt(left[0], 2);
  }
}

const lifeSupport = oxygen * co2;
console.log(`life support: ${lifeSupport}`);
