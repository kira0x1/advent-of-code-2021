const input = require("./inputHelper");
const { Graph, Node } = require("./util");

const graph = new Map();

for (const line of input) {
  const points = line.split("-");

  const p1 = points[0];
  const p2 = points[1];

  if (!graph.has(p1)) graph.set(p1, []);

  const connections = graph.get(p1);
  connections.push(p2);

  graph.set(p1, connections);
}

function logGraph() {
  const graphKeys = [];

  for (const { 0: key, 1: connections } of graph) {
    graphKeys.push(key);
  }

  const start = graphKeys.shift();
  console.log(`  ${start}`);
  const web = graphKeys.length;
  let webString = "";
  let endRow = "";

  for (let i = 0; i < web; i++) {
    if (i === web - 1) {
      webString += "  \\";
      endRow += "  / ";
      continue;
    }

    if (i === 0) {
      webString += "  / ";
      endRow += "  \\ ";
      continue;
    }

    webString += "|";
    endRow += "|";
  }

  endRow += "\n";
  for (let i = 0; i < web / 2; i++) {
    endRow += " ";
  }

  endRow += "  end";

  let connections = "";
  for (const conn of graphKeys) {
    connections += ` ${conn}    `;
  }

  console.log(webString);
  console.log(connections);
  console.log(endRow);
}

logGraph();
