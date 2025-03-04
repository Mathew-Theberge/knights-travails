import { Tree } from "./bst.js";

class Vertex {
  constructor(cords, edges) {
    this.cords = cords;
    this.edges = edges;
  }
}

class Graph {
  constructor(knight) {
    this.knight = knight;
    this.graph = this.initGraph();
  }

  createGraph() {
    const graph = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let validMoves = this.isAdjacent([i, j]);
        let vertex = new Vertex([i, j], validMoves);
        graph.push(vertex);
      }
    }
    return graph;
  }

  initGraph() {
    const graph = this.createGraph();
    graph.forEach((vertex) => {
      let validMoves = [];
      vertex.edges.forEach((edge) => {
        let node = this.find(edge, graph);
        validMoves.push(node);
      });
      vertex.edges = validMoves;
    });
    return graph;
  }

  find(value, graph = this.graph) {
    let found = null;
    graph.forEach((vertex) => {
      if (vertex.cords[0] === value[0] && vertex.cords[1] === value[1])
        found = vertex;
    });
    return found;
  }

  isInBounds(cords) {
    if (cords[0] >= 0 && cords[0] <= 7 && cords[1] >= 0 && cords[1] <= 7) {
      return true;
    } else return false;
  }

  isAdjacent(cords) {
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

    let validMoves = [];

    allMoves.forEach((move) => {
      if (this.isInBounds(move)) {
        validMoves.push(move);
      }
    });

    return validMoves;
  }
}

function knightMoves(start, end) {}

const graph = new Graph();

// console.log(graph.graph);

console.log(graph.graph[0]);
