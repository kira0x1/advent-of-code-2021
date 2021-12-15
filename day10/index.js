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

const scores = [];

for (const line of input) {
  const res = isBalanced(line);
  if (!res) continue;
}

function isBalanced(input) {
  let score = 0;

  const stack = [];

  for (let b of input) {
    const bracketIndex = brackets.indexOf(b);

    if (bracketIndex % 2 === 0) {
      stack.push(bracketIndex + 1);
    } else {
      const p = stack.pop();
      if (p !== bracketIndex) {
        // illegals.push(b);
        return false;
      }
    }
  }

  let row = "";
  for (let i = stack.length; i >= 0; i--) {
    const s = brackets[stack[i]];
    if (s) {
      row += s;
    }
  }

  for (const b of row) {
    score *= 5;

    switch (b) {
      case ")":
        score += 1;
        break;
      case "]":
        score += 2;
        break;
      case "}":
        score += 3;
        break;
      case ">":
        score += 4;
        break;
    }
  }

  scores.push(score);

  return stack;
}

scores.sort((a, b) => a - b);
const middle = Math.floor(scores.length / 2);
console.log(scores[middle]);
