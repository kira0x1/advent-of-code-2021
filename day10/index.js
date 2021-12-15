const input = require("./helper");

const openers = ["{", "<", "(", "["];
const closers = ["}", ">", ")", "]"];

const pairMap = new Map();
pairMap.set(openers[0], closers[0]);
pairMap.set(openers[1], closers[1]);
pairMap.set(openers[2], closers[2]);
pairMap.set(openers[3], closers[3]);

const illegals = [];
const brackets = "[]{}()<>";

for (const line of input) {
  const res = isBalanced(line);
  if (res) continue;
}

function isBalanced(input) {
  const stack = [];

  for (let b of input) {
    const bracketIndex = brackets.indexOf(b);

    if (bracketIndex % 2 === 0) {
      stack.push(bracketIndex + 1);
    } else {
      const p = stack.pop();
      if (p !== bracketIndex) {
        illegals.push(b);
        return false;
      }
    }
  }

  return stack;
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
