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
    let paths = [];

    while (queue.length > 0) {
      let currNode = queue[0];
      if (currNode === undefined) break;
      let currEdges = this.edges[currNode];

      callback(currNode);

      currEdges.forEach((edge) => {
        paths.push([]);
        if (visited[edge] !== true) {
          queue.push(edge);
          visited[edge] = true;
        } else console.log(`back edge ${edge}`);
      });
      queue.shift();
    }
    console.log(paths);
  }

  knightMoves(start, end) {
    let visited = {};
    visited[start] = true;
    let currLayer = [start];
    let nextLayer = [];
    let path;

    while (currLayer.length > 0) {
      for (let node of currLayer) {
        if (arraysEqual(node, end)) {
          let edges = this.edges[node];
          let prevEdge = null;
          for (let edge of edges) {
            if (visited[edge] === true) {
              prevEdge = edge;
            }
          }
          path = prevEdge;
        }

        let currEdges = this.edges[node];

        currEdges.forEach((edge) => {
          if (visited[edge] !== true) {
            nextLayer.push(edge);
            visited[edge] = true;
          }
        });
      }
      currLayer = nextLayer;
      nextLayer = [];
    }
    return path;
  }

  knightMoves2(start, end) {
    let node = this.knightMoves(start, end);
    let mainPath = [];
    mainPath.unshift(node);
    while (!arraysEqual(mainPath[0], start)) {
      let path = this.knightMoves(start, mainPath[0]);
      mainPath.unshift(path);
    }
    return mainPath;
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

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

console.log(test.knightMoves([3, 3], [4, 3]));
