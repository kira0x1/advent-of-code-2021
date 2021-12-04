const input = require("./helper");

const ones = new Map();
const zeros = new Map();

let i = 0;
const bits = input[0].length;

for (const line of input) {
  for (const x of line) {
    let z = zeros.get(i) || 0;
    let o = ones.get(i) || 0;

    const n = Number(x);
    const isZero = n === 0;

    if (isZero) {
      z++;
      zeros.set(i, z);
    } else {
      o++;
      ones.set(i, o);
    }

    i++;
  }

  i = 0;
}

function getGamma(pos) {
  const z = zeros.get(pos);
  const o = ones.get(pos);

  return z > o ? 0 : 1;
}

function getEps(pos) {
  const z = zeros.get(pos);
  const o = ones.get(pos);

  return z > o ? 1 : 0;
}

let gamma = "";
let eps = "";

for (let i = 0; i < bits; i++) {
  const g = getGamma(i);
  gamma += g;

  const e = getEps(i);
  eps += e;
}

// console.log(gamma);
// console.log(parseInt(gamma, 2));

// console.log(eps);
// console.log(parseInt(eps, 2));

const gDec = parseInt(gamma, 2);
const eDec = parseInt(eps, 2);

console.log(gDec * eDec);
