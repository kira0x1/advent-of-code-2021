const input = require("./helper");

let sum = 0;

for (const line of input) {
  let endString = "";
  const n = line.split(" | ")[1].split(" ");

  for (const w of n) {
    const map = compareNumbers(w, line);
    const sorted = sortString(w);
    const res = map.get(sorted);
    endString += res;
  }

  sum += Number(endString);
}

console.log(sum);

function compareNumbers(w, line) {
  const n = line.split(" | ")[0].split(" ");

  let ones = [];
  let sevens = [];
  let sixes = [];
  let fours = [];
  let fives = [];
  let eights = [];

  let topBar = "";
  let rightBars = [];

  for (const s of n) {
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

    if (s.length === 5) {
      fives.push(getCharArray(s));
    }

    if (s.length === 7) {
      eights = getCharArray(s);
    }
  }

  topBar = getCharDiff(sevens, ones);

  rightBars = ones;

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

  let nThree = undefined;

  let leftSides = [];

  let unkownFives = [];

  for (const x of fives) {
    let sideCount = 0;

    for (const c of x) {
      if (rightBars.includes(c)) sideCount++;
    }

    if (sideCount === 2) {
      nThree = x;
    } else {
      unkownFives.push(x);
    }
  }

  for (const x of unkownFives) {
    const charDiff = getCharDiff(nSix, x);

    if (charDiff.length === 1) {
      leftSides.push(charDiff[0]);
    } else {
      const lf = charDiff.find((c) => !rightBars.includes(c));
      leftSides.push(lf);
    }
  }

  let nNine = undefined;
  let nZero = undefined;

  let bottomLeft = undefined;
  let upperLeft = undefined;

  for (const x of sixes) {
    if (x === nSix) continue;

    let leftSideCount = 0;
    let lf = undefined;
    for (const c of x) {
      if (leftSides.includes(c)) {
        leftSideCount++;
        lf = c;
      }
    }

    if (leftSideCount === 1) {
      nNine = x;
      upperLeft = lf;
      bottomLeft = leftSides.find((c) => c !== upperLeft);
    } else {
      nZero = x;
    }
  }

  let nFive = undefined;
  let nTwo = undefined;

  for (const x of unkownFives) {
    let hasUpperLeft = false;

    for (const c of x) {
      if (c === upperLeft) hasUpperLeft = true;
    }

    if (hasUpperLeft) nFive = x;
    else nTwo = x;
  }

  const map = new Map();
  map.set(sortString(nZero.join("")), 0);
  map.set(sortString(ones.join("")), 1);
  map.set(sortString(nTwo.join("")), 2);
  map.set(sortString(nThree.join("")), 3);
  map.set(sortString(fours.join("")), 4);
  map.set(sortString(nFive.join("")), 5);
  map.set(sortString(nSix.join("")), 6);
  map.set(sortString(sevens.join("")), 7);
  map.set(sortString(eights.join("")), 8);
  map.set(sortString(nNine.join("")), 9);

  return map;
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

function sortString(str) {
  var arr = str.split("");
  var tmp;
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      /* if ASCII code greater then swap the elements position*/
      if (arr[i] > arr[j]) {
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
  return arr.join("");
}

// console.log(`\n`);
// console.log(`one: ${oneCount}`);
// console.log(`four: ${fourCount}`);
// console.log(`seven: ${sevenCount}`);
// console.log(`eight: ${eightCount}`);
