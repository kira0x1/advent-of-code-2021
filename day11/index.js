const chalk = require("chalk");
const input = require("./helper");
const MAX = input.length;
const steps = 1000;
const table = new Array(MAX);

let totalFlashes = 0;

for (let i = 0; i < MAX; i++) {
  table[i] = new Array(MAX);

  let j = 0;
  for (const n of input[i].split("")) {
    table[i][j] = formatEntity(Number(n), i, j);
    j++;
  }
}

function formatEntity(n, x, y) {
  return { n, x, y, flashed: false };
}

for (let i = 0; i < steps; i++) {
  for (let y = 0; y < MAX; y++) {
    for (let x = 0; x < MAX; x++) {
      table[x][y].n++;
    }
  }

  for (let y = 0; y < MAX; y++) {
    for (let x = 0; x < MAX; x++) {
      upDiagonal(x, y, false);
    }
  }

  // console.log(`step: ${i + 1}\n`);
  // logTable();
  // console.log(`----------------------------\n`);

  for (let y = 0; y < MAX; y++) {
    for (let x = 0; x < MAX; x++) {
      if (!table[x][y].flashed) {
        continue;
      }

      const pos = table[x][y];
      pos.n = 0;
      pos.flashed = false;
      totalFlashes++;
    }
  }

  const synced = isSync();
  if (synced) {
    console.log(`IS SYNCED AT STEP: ${i + 1}`);
    break;
  }
}

function upDiagonal(x, y, increment = false) {
  const left = x - 1 >= 0 && table[x - 1][y];
  const right = x + 1 < MAX && table[x + 1][y];
  const up = y + 1 < MAX && table[x][y + 1];
  const down = y - 1 >= 0 && table[x][y - 1];

  let upleft,
    downleft,
    upright,
    downright = undefined;

  if (x - 1 >= 0) {
    if (y + 1 < MAX) upleft = table[x - 1][y + 1];
    if (y - 1 >= 0) downleft = table[x - 1][y - 1];
  }

  if (x + 1 < MAX) {
    if (y + 1 < MAX) upright = table[x + 1][y + 1];
    if (y - 1 >= 0) downright = table[x + 1][y - 1];
  }

  const center = table[x][y];

  const positions = [
    center,
    left,
    right,
    up,
    down,
    upleft,
    downleft,
    upright,
    downright,
  ];

  for (const p of positions.filter((p) => p)) {
    if (increment) p.n++;

    if (p.n > 9) {
      p.n = 0;
      if (!p.flashed) upDiagonal(p.x, p.y, true);
      p.flashed = true;
    }
  }
}

function logTable() {
  let row = "";
  for (let x = 0; x < MAX; x++) {
    for (let y = 0; y < MAX; y++) {
      const pos = table[x][y];
      if (pos.flashed) row += chalk`{bgRed.bold ${0}}`;
      else row += pos.n;
    }
    row += "\n";
  }

  console.log(chalk`${row}`);
}

function isSync() {
  const first = table[0][0].n;
  for (let y = 0; y < MAX; y++) {
    for (let x = 0; x < MAX; x++) {
      const pos = table[x][y];

      if (pos.n !== first) {
        return false;
      }
    }
  }
  return true;
}

console.log(`total flashes: ${totalFlashes}`);
