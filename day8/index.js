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
    if (f) return;

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
  let nines = [];
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
      nines = getCharArray(s);
    }

    if (s.length === 4) {
      fours = getCharArray(s);
    }
  }

  topBar = getCharDiff(sevens, ones);
  console.log(`\n\nTOP BAR: ${topBar}\n`);

  // if (sevens.length === 0 || ones.length === 0) return false;

  console.log(`\nNine`);
  console.log(nines);

  console.log(`\nSeven`);
  console.log(sevens);

  console.log(`\nOne`);
  console.log(ones);

  console.log(`\nFour`);
  console.log(fours);

  console.log(`\nFives`);
  console.log(fives);

  const inFiveButNotFour = getCharDiff(fives, fours);

  const nineSevenDiff = getCharDiff(nines, sevens);
  const nineOnesDiff = getCharDiff(nines, ones);
  const nineFourDiff = getCharDiff(nines, fours);

  const charDiff = getCharDiff(sevens, ones);

  console.log(`\nIn Five but not four`);
  console.log(inFiveButNotFour);

  // console.log(`\nIn Seven but not One`);
  // console.log(charDiff);

  // console.log(`\nIn nine/zero but not seven`);
  // console.log(nineSevenDiff);

  // console.log(`\nIn nine/zero but not one`);
  // console.log(nineOnesDiff);

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
