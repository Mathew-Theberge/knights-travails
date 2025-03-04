class Graph {
  constructor() {
    this.nodes = [];
    this.edges = {};
  }

  addVertex(node) {
    this.nodes.push(node);
    this.edges[node] = [];
  }

  addEdge(node1, node2) {
    this.edges[node1].push(node2);
  }

  display() {
    let graph = "";
    this.nodes.forEach((node) => {
      graph += node + "->" + this.edges[node].join(", ") + "\n";
    });
    console.log(graph);
  }
}

const test = new Graph();

function createVertices() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      test.addVertex([i, j]);
    }
  }
}
createVertices();

test.nodes.forEach((node) => {
  isAdjacent(node);
});

test.display();

function isInBounds(cords) {
  if (cords[0] >= 0 && cords[0] <= 7 && cords[1] >= 0 && cords[1] <= 7) {
    return true;
  } else return false;
}

function isAdjacent(cords) {
  let allMoves = [
    [cords[0] + 2, cords[1] + 1],
    [cords[0] + 1, cords[1] + 2],
    [cords[0] - 1, cords[1] - 2],
    [cords[0] - 2, cords[1] - 1],
    [cords[0] + 2, cords[1] - 1],
    [cords[0] + 1, cords[1] - 2],
    [cords[0] - 2, cords[1] + 1],
    [cords[0] - 1, cords[1] + 2],
  ];

  allMoves.forEach((move) => {
    if (isInBounds(move)) {
      test.addEdge(cords, move);
    }
  });
}

console.log(test.nodes);
console.log(test.edges);

test.display();
