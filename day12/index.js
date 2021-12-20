const input = require("./inputHelper");
const { Graph, Node } = require("./util");

const graph = new Graph(Graph.UNDIRECTED);

const [first] = graph.addEdge(1, 2);

graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(5, 2);
graph.addEdge(6, 3);
graph.addEdge(7, 3);
graph.addEdge(8, 4);
graph.addEdge(9, 5);
graph.addEdge(10, 6);

const bfsFromFirst = graph.bfs(first);

console.log(bfsFromFirst.next().value.value); // 1
console.log(bfsFromFirst.next().value.value); // 2
console.log(bfsFromFirst.next().value.value); // 3
console.log(bfsFromFirst.next().value.value); // 4
