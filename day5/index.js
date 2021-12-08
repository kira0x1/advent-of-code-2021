const input = require("./helper");

const max = 1000;

let map = new Array(max);

for (let x = 0; x < max; x++) {
  map[x] = new Array(max);
  for (let y = 0; y < max; y++) {
    map[x][y] = ".";
  }
}

for (const line of input) {
  let points = formatLine(line);
  const sortedPoints = sortVectors(points[0], points[1]);

  const sx1 = sortedPoints[0][0];
  const sx2 = sortedPoints[1][0];
  const sy1 = sortedPoints[0][1];
  const sy2 = sortedPoints[1][1];

  const x1 = points[0][0];
  const x2 = points[1][0];
  const y1 = points[0][1];
  const y2 = points[1][1];

  if (sx1 === sx2 || sy1 === sy2) connectPoints(sx1, sx2, sy1, sy2);
  else connectDiagonal([x1, y1], [x2, y2]);
}

function connectPoints(x1, x2, y1, y2) {
  for (let x = x2; x <= x1; x++) {
    for (let y = y2; y <= y1; y++) {
      let cur = map[y][x];
      if (cur === ".") cur = 1;
      else cur++;

      map[y][x] = cur;
    }
  }
}

// connectDiagonal([0, 9], [6, 4]);

function connectDiagonal(v1, v2) {
  const x1 = v1[0];
  const y1 = v1[1];
  const x2 = v2[0];
  const y2 = v2[1];

  const points = [];

  let x = x1;
  let y = y1;

  points.push([x, y]);

  do {
    if (y !== y2) {
      if (y < y2) y++;
      else y--;
    }

    if (x !== x2) {
      if (x < x2) x++;
      else x--;
    }

    points.push([x, y]);
  } while (y !== y2 || x !== x2);

  for (const p of points) {
    const x = p[0];
    const y = p[1];

    let cur = map[y][x];
    if (cur === ".") cur = 1;
    else cur++;

    map[y][x] = cur;
  }
}

function getDistance(x1, y1, x2, y2) {
  const xDiff = x1 - x2;
  const yDiff = y1 - y2;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function formatLine(line) {
  const vectors = line.split("->");
  const point1 = vectors[0].split(",").map((n) => Number(n));
  const point2 = vectors[1].split(",").map((n) => Number(n));

  const x1 = point1[0];
  const x2 = point2[0];

  const y1 = point1[1];
  const y2 = point2[1];

  return [
    [x1, y1],
    [x2, y2],
  ];
}

function sortVectors(v1, v2) {
  const x1 = v1[0];
  const x2 = v2[0];

  const y1 = v1[1];
  const y2 = v2[1];

  const largestVector = [];
  const lesserVector = [];

  if (x1 > x2) {
    largestVector.push(x1);
    lesserVector.push(x2);
  } else {
    largestVector.push(x2);
    lesserVector.push(x1);
  }

  if (y1 > y2) {
    largestVector.push(y1);
    lesserVector.push(y2);
  } else {
    largestVector.push(y2);
    lesserVector.push(y1);
  }

  return [largestVector, lesserVector];
}

let overlap = 0;

for (let x = 0; x < max; x++) {
  for (let y = 0; y < max; y++) {
    const cur = map[x][y];
    if (cur === ".") continue;
    if (cur >= 2) overlap++;
  }
}

// logTable();
console.log(overlap);

function logTable() {
  let row = "";
  for (let x = 0; x < max; x++) {
    for (let y = 0; y < max; y++) {
      row += map[x][y] + " ";
    }
    row += "\n";
  }
  console.log(row);
}
