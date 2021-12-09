const input = require("./helper");
const chalk = require("chalk");

const max = input[0].length;
const map = new Array(max);

for (let i = 0; i < input.length; i++) {
  map[i] = new Array(max);
}

for (let y = 0; y < input.length; y++) {
  const row = input[y].split("");
  for (let x = 0; x < max; x++) {
    map[y][x] = row[x];
  }
}

let count = 0;
let riskLevels = 0;

// console.log(count);
// console.log(`risk level: ${riskLevels}`);

// const b = getXBasin(0, 1, 1, []);
// console.dir(b);

function memoize(f) {
  const cacheLookup = {}; // Value cache stored in the closure
  return function () {
    const key = Array.prototype.join.call(arguments, "-");
    if (key in cacheLookup) {
      return cacheLookup[key];
    } else {
      return (cacheLookup[key] = f.apply(this, arguments));
    }
  };
}

function getXBasin(y, x, delta, basin, yDelta) {
  if (delta === 1 && x === max) return basin;
  if (delta === -1 && x === 0) return basin;
  const n = Number(map[y][x + delta]);
  if (isNaN(n)) return basin;
  //   console.log(n);
  if (n === 9) return basin;
  basin.push({ x: x + delta, y: y, v: n });

  //   console.log(`x: ${x + delta}, y: ${y} => ${n}`);
  //   const belowBasin = getYBasin(y, x + delta, 1, basin);
  //   yMemoized(y, x + delta, -1, basin);
  //   yMemoized(y, x + delta, 1, basin);

  if (yDelta) {
    yMemoized(y, x + delta, yDelta, basin);
  }

  return getXBasin(y, x + delta, delta, basin);
}

function getYBasin(y, x, delta, basin) {
  if (delta === -1 && y === 0) return basin;
  if (delta === 1 && y === input.length - 1) return basin;
  const n = Number(map[y + delta][x]);
  if (isNaN(n)) return basin;
  //   console.log(`x: ${x}, y: ${y + delta} => ${n}`);
  //   console.log(n);
  if (n === 9) return basin;
  basin.push({ x: x, y: y + delta, v: n });

  xMemoized(y + delta, x, -1, basin, 1);
  xMemoized(y + delta, x, 1, basin, 1);
  //   xMemoized(y + delta, x, 1, basin, -1);

  return getYBasin(y + delta, x, delta, basin);
}

const yMemoized = memoize(getYBasin);
const xMemoized = memoize(getXBasin);

function drawBasin(y, x) {
  const basin = [{ x: x, y: y, v: Number(map[y][x]) }];
  const rightBasin = xMemoized(y, x, 1, basin);
  const leftBasin = xMemoized(y, x, -1, basin);
  const belowBasin = yMemoized(y, x, 1, basin);
  const aboveBasin = yMemoized(y, x, -1, basin);
  console.log(`basin length: ${basin.length}`);

  return basin;
}

let basin = [];
function compareAdjacent(y, x) {
  const n = Number(map[y][x]);

  const left = x === 0 ? undefined : map[y][x - 1];
  const right = map[y][x + 1];
  const up = y === 0 ? undefined : map[y - 1][x];
  const down = y >= input.length - 1 ? undefined : map[y + 1][x];

  const adj = [left, right, up, down].filter((c) => c !== undefined);

  for (const a of adj) {
    const an = Number(a);
    if (an <= n) return false;
  }

  // console.log(`x: ${x}, y: ${y} => ${n}`);
  riskLevels += n + 1;
  basin.push(...drawBasin(y, x));

  return true;
}

for (let y = 0; y < input.length; y++) {
  const row = input[y].split("");
  for (let x = 0; x < max; x++) {
    const isSmallest = compareAdjacent(y, x);
    if (isSmallest) count++;
  }
}

console.log(`\n`);

for (let y = 0; y < input.length; y++) {
  let row = "";
  for (let x = 0; x < max; x++) {
    let isInBasin = false;

    for (const b of basin) {
      if (b.x === x && b.y === y) isInBasin = true;
    }

    if (isInBasin) row += chalk`{bgRed.bold ${map[y][x]}}`;
    else row += map[y][x];
  }

  console.log(chalk`${row}`);
}

// const b = drawBasin(2, 2);
// console.log(b);
