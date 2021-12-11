const input = require("./helper");

// const line = "{([(<{}[<>[]}>";
// const line = input[4];
// console.log(line);
// const line = `<{([([[(<>()){}]>(<<{{`;

const openers = ["{", "<", "(", "["];
const closers = ["}", ">", ")", "]"];
const illegals = [];

const pairMap = new Map();
pairMap.set(openers[0], closers[0]);
pairMap.set(openers[1], closers[1]);
pairMap.set(openers[2], closers[2]);
pairMap.set(openers[3], closers[3]);

const chunks = [];

for (const line of input) {
  for (let i = 0; i < line.length; i++) {
    const c = line[i];

    if (openers.includes(c)) {
      findChunk(c, i, [...line]);
      //   console.log(x.join(""));
      break;
    }
  }
}

function findChunk(o, index, line, ch = []) {
  const target = pairMap.get(o);
  ch = [...ch, o];

  //   const filter = line.filter((l) => l === target || l === o);
  //   console.log(filter);

  for (let i = index + 1; i < line.length; i++) {
    const c = line[i];

    if (c === o) {
      //   findChunk(c, i + 1, line, ch);
      //   return;
    }

    if (openers.includes(c)) {
      return findChunk(c, i, line, ch);
    }

    if (closers.includes(c) && c !== target) {
      //   console.log(target);
      //   console.log(c);
      //   console.log("--");
      illegals.push(c);
      //   ch.push(c);
      return;
    }
  }

  return ch;
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

function logChunks() {
  for (const c of chunks) {
    let r = "";
    const op = c[0];
    const target = pairMap.get(op);
    for (const l of c) {
      r += l;
    }
    console.log(r);
  }
}

// console.table(openChunks);
// console.table(closeChunks);

function findOpeners(c) {
  const found = openers.find((o) => o === c);
  openingChunk = found;
  console.log(found);
}

function findClosers(c) {
  const found = closers.find((o) => o === c);
  closingChunk = found;
  if (found) console.log(found);
}
