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

  levelOrder(callback) {
    let node = this.nodes;
    let visited = {};
    let queue = [node[0]];

    while (queue.length > 0) {
      let currNode = queue[0];
      if (currNode === undefined) break;
      let currEdges = this.edges[currNode];

      callback(currNode);

      currEdges.forEach((edge) => {
        if (visited[edge] !== true) {
          queue.push(edge);
          visited[edge] = true;
        }
      });
      queue.shift();
    }
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
  createEdges(node);
});

function isInBounds(cords) {
  if (cords[0] >= 0 && cords[0] <= 7 && cords[1] >= 0 && cords[1] <= 7) {
    return true;
  } else return false;
}

function createEdges(cords) {
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

test.display();

// console.log(test.edges);
// console.log(test.nodes);
test.levelOrder();
