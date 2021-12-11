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
const corrupedLines = [];

function findChunk() {
  for (const line of corrupedLines) {
    let depth = 1;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];

      for (let x = i + 1; x < line.length; x++) {
        switch (line[x]) {
          case c:
            depth++;
            break;
          case pairMap.get(c):
            if (--depth === 0) {
              return;
            }
            break;
        }

        // console.log(pairMap.get(c));
        illegals.push(pairMap.get(c));
        break;
      }
    }
  }
}

for (const line of input) {
  findCorrupted(line);
}

function findCorrupted(line) {
  let depth = 1;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (openers.includes(c)) {
      for (let x = i + 1; x < line.length; x++) {
        switch (line[x]) {
          case c:
            depth++;
            break;
          case pairMap.get(c):
            if (--depth === 0) {
              break;
            }
            break;
        }
      }
    }
  }

  if (depth > 0) corrupedLines.push(line);
}

findChunk();

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

function findOpeners(line) {
  const op = [];
  let i = 0;
  for (const c of line) {
    if (openers.includes(c)) op.push({ c, i });
    i++;
  }
  return op;
}

function findClosers(c) {
  const found = closers.find((o) => o === c);
  closingChunk = found;
  if (found) console.log(found);
}
