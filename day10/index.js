const input = require("./helper");

const openers = ["{", "<", "(", "["];
const closers = ["}", ">", ")", "]"];

const pairMap = new Map();
pairMap.set(openers[0], closers[0]);
pairMap.set(openers[1], closers[1]);
pairMap.set(openers[2], closers[2]);
pairMap.set(openers[3], closers[3]);

const illegals = [];

const line = input[1];
console.log(line.length);
getChunk(line);

for (const line of input) {
}

/**
 *
 * @param {string} line
 */
function getChunk(line) {
  openersStack = [];

  let firstOpener = undefined;

  let openerIndex = 0;
  let i = 0;
  for (i = 0; i < line.length; i++) {
    const c = line[i];
    openerIndex = i + 1;
    if (openers.includes(c)) {
      firstOpener = c;
      openersStack.push(c);
    }
  }

  let depth = openersStack.length;
  let target = pairMap.get(firstOpener);
  let firstChunk = undefined;
  let clos = undefined;

  for (i = 0; i < line.length; i++) {
    const c = line[i];

    if (c === firstOpener) {
      depth++;
    }

    if (c === target) {
      if (--depth === 0)
        return getChunk(
          (firstChunk = line.slice(openerIndex + 1, line.length))
        );
    }

    if (depth === 1 && closers.includes(c)) {
      clos = c;
    }
  }

  if (clos === undefined) {
    return getChunk(line.slice(openerIndex + 1, line.length));
  } else {
    illegals.push(clos);
    console.log(`expecting ${target} but recieved ${clos}`);
  }
}

let paran = 0;
let bracket = 0;
let squigle = 0;
let gt = 0;

for (const i of illegals) {
  if (i === ">") gt++;
  if (i === ")") paran++;
  if (i === "}") squigle++;
  if (i === "]") bracket++;
}

console.log(`): ${paran}`);
console.log(`]: ${bracket}`);
console.log(`}: ${squigle}`);
console.log(`>: ${gt}`);

const paranScore = paran * 3;
const bracketScore = bracket * 57;
const squiggleScore = squigle * 1197;
const gtScore = gt * 25137;

console.log(
  `final score: ${paranScore + bracketScore + squiggleScore + gtScore}`
);
