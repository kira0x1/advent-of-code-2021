const input = require("./helper");

// console.log(input);

const numbers = input.shift().split(",");
input.shift();

const boards = new Map();

let i = 0;
for (const line of input) {
  const b = boards.get(i) || [];

  if (line === "") {
    i++;
    continue;
  }

  b.push(line.trim());
  boards.set(i, b);
}

// console.table(boards);
// console.log(numbers);

const marked = new Map();

let bcounter = 0;
for (const b of boards) {
  const m = [];

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      m.push({ x, y, marked: false });
    }
  }
  marked.set(bcounter, m);
  bcounter++;
}

for (let i = 0; i < boards.size; i++) {
  const b = boards.get(i);
  let x = 0;
  let y = 0;

  for (const col of b) {
    for (const row of col.split(" ")) {
      if (row === "") continue;
      setBoardPosNumber(i, y, x, row);
      y++;
    }
    y = 0;
    x++;
  }
  x = 0;
}

const boardStatus = [];
let lastBoardToWin = -1;
let lastN = -1;

boards.forEach((b, i) => boardStatus.push({ b: i, won: false }));

let hasWon = false;

for (let i = 0; i < numbers.length; i++) {
  const n = numbers[i];

  const boardsWon = boardStatus.filter((b) => b.won);

  if (boardsWon.length >= boards.size - 1 && lastBoardToWin === -1) {
    console.log(`only 1 board remaining`);
    const last = boardStatus.filter((b) => !b.won)[0];
    lastBoardToWin = last.b;
    lastN = n;
  }

  if (lastBoardToWin !== -1) {
    if (boardStatus[lastBoardToWin].won) {
      const last = boardStatus[lastBoardToWin];
      console.log(last);
      console.log(lastN);
      const sum = getSum(last.b);
      console.log(sum * numbers[i - 1]);
      break;
    }
  }

  for (let b = 0; b < boards.size; b++) {
    let rowCount = 0;
    let colCount = 0;
    const board = boards.get(b);

    for (const col of board) {
      for (const row of col.split(" ")) {
        if (row === "") continue;
        if (row === n) {
          setBoardPos(b, colCount, rowCount, n, true);
          hasWon = checkBoard(b);

          if (hasWon) {
            boardStatus[b].won = true;
            // console.log(`board ${b} has won first at number ${n}`);
            // const sum = getSum(b);
            // console.log(`sum: ${sum}`);
            // console.log(sum * n);
            boards[b] = true;
            break;
          }
        }

        colCount++;
      }
      colCount = 0;
      rowCount++;
    }
  }
}

function getSum(i) {
  const b = marked.get(i);
  let sum = 0;
  //   b.filter((m) => m.marked).map((m) => console.log(m));

  b.map((m) => {
    const n = Number(m.number);
    // console.log(n);
    // console.log(m.marked);
    if (!m.marked) sum += n;
  });
  return sum;
}

function setBoardPos(b, x, y, n, val) {
  const m = marked.get(b);
  for (let i = 0; i < m.length; i++) {
    const obj = m[i];
    if (obj.x === x && obj.y === y) {
      if (obj.number.trim() !== n.trim() && b === 2) {
        console.log(obj);
        // console.log(obj.number + " | " + n);
      }
      //   console.log("found");
      obj.marked = val;
      m[i] = obj;
      return;
    }
  }
}

function setBoardPosNumber(i, x, y, number) {
  const m = marked.get(i);
  for (let i = 0; i < m.length; i++) {
    const obj = m[i];
    if (obj.x === x && obj.y === y) {
      obj.number = number;
      m[i] = obj;
      return;
    }
  }
}

function getPos(i, x, y) {
  const m = marked.get(i);
  for (let i = 0; i < m.length; i++) {
    const obj = m[i];
    if (obj.x === x && obj.y === y) {
      return obj;
    }
  }
}

function checkBoard(i) {
  let colCount = 0;
  let rowCount = 0;
  let c = 0;

  for (let z = 0; z < 5; z++) {
    for (let x = 0; x < 5; x++) {
      const pos = getPos(i, x, c);
      if (!pos) continue;
      if (pos?.marked) colCount++;
      if (colCount >= 5) return true;

      for (let y = 0; y < 5; y++) {
        const rowPos = getPos(i, x, y);
        if (rowPos?.marked) rowCount++;
        if (rowCount >= 5) return true;
      }

      rowCount = 0;
    }

    c++;
    colCount = 0;
  }
}
