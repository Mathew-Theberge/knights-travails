const adjacentcyList = new Map();

function addNode(node) {
  adjacentcyList.set(node, []);
}

function addEdge(node1, node2) {
  adjacentcyList.get(node1).push(node2);
  adjacentcyList.get(node2).push(node1);
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    addNode(`${i},${j}`);
  }
}

function setValidMoves(cords) {
  let moves = [
    `${+cords[0] + 2},${+cords[2] + 1}`,
    `${+cords[0] + 1},${+cords[2] + 2}`,
    `${+cords[0] - 2},${+cords[2] - 1}`,
    `${+cords[0] - 1},${+cords[2] - 2}`,
    `${+cords[0] + 2},${+cords[2] - 1}`,
    `${+cords[0] + 1},${+cords[2] - 2}`,
    `${+cords[0] - 2},${+cords[2] + 1}`,
    `${+cords[0] - 1},${+cords[2] + 2}`,
  ];
  moves.forEach((move) => {
    if (+move[0] < 8 && +move[0] > -1 && +move[2] < 8 && +move[2] > -1) {
      addEdge(cords, move);
    }
  });
}

for (let key of adjacentcyList.keys()) {
  setValidMoves(key);
}

function knightMoves(start, end) {}

console.log(adjacentcyList);
