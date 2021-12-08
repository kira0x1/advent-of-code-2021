const input = require("./helper");

const seven = 3;
const four = 4;
const eight = 7;
const one = 2;

let sevenCount = 0;
let fourCount = 0;
let eightCount = 0;
let oneCount = 0;

const wMap = new Map();

for (const line of input) {
  const n = line.split(" | ")[1].split(" ");

  for (const w of n) {
    const f = compareNumbers(w, line);
    return;

    if (w.length === seven) {
      wMap.set("seven", w);
      sevenCount++;
    }
    if (w.length === eight) {
      wMap.set("eight", w);
      eightCount++;
    }
    if (w.length === four) {
      fourCount++;
    }
    if (w.length === one) {
      wMap.set("one", w);
      oneCount++;
    }

    // if (w.length === 6) {
    //   if (isZero) {
    //     console.log(`\nZERO = ${w}`);
    //   }
    // }
  }
}

function compareNumbers(w, line) {
  const n = line.split(" | ")[0].split(" ");

  let ones = [];
  let sevens = [];
  let sixes = [];
  let fours = [];
  let fives = [];

  let topBar = "";
  let rightBars = [];

  for (const s of n) {
    if (s.length === 5) {
      fives = getCharArray(s);
    }

    if (s.length === 2) {
      ones = getCharArray(s);
    }

    if (s.length === 3) {
      sevens = getCharArray(s);
    }

    if (s.length === 6) {
      sixes.push(getCharArray(s));
    }

    if (s.length === 4) {
      fours = getCharArray(s);
    }
  }

  topBar = getCharDiff(sevens, ones);
  console.log(`\nTOP BAR: ${topBar}\n`);

  rightBars = ones;
  console.log(`SIDE BAR: ${rightBars}\n`);

  let nSix = undefined;
  let topRight = undefined;
  let bottomRight = undefined;

  for (const x of sixes) {
    let sideCount = 0;

    for (const c of x) {
      if (rightBars.includes(c)) sideCount++;
    }

    if (sideCount === 1) {
      nSix = x;

      topRight = rightBars.find((c) => !nSix.includes(c));
      bottomRight = rightBars.find((c) => nSix.includes(c));
      break;
    }
  }

  console.log(`Six: ${nSix}`);

  console.log(`\ntopRight: ${topRight}`);
  console.log(`\nbottomRight: ${bottomRight}`);

  return true;
}

function getCharArray(w) {
  const arr = [];
  for (let i = 0; i < w.length; i++) {
    arr.push(w[i]);
  }

  return arr;
}

function getCharDiff(w1, w2) {
  return w1.filter((c) => !w2.includes(c));
}

console.log(`\n`);
console.log(`one: ${oneCount}`);
console.log(`four: ${fourCount}`);
console.log(`seven: ${sevenCount}`);
console.log(`eight: ${eightCount}`);

console.log(`\ntotal: ${oneCount + fourCount + sevenCount + eightCount}`);
