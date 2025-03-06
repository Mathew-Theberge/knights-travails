const adjacentcyList = new Map();

function addNode(node) {
  adjacentcyList.set(node, []);
}

function addEdge(node1, node2) {
  adjacentcyList.get(node1).push(node2);
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

function findPrevMove(start, end) {
  start = start.toString();
  end = end.toString();
  if (start === end) return;
  let nextLayer = [start];
  let queue = nextLayer.slice();
  let visited = new Set();

  while (queue.length > 0) {
    for (let node of queue) {
      let edges = adjacentcyList.get(node);
      for (let edge of edges) {
        if (edge === end) {
          return node;
        } else {
          if (!visited.has(edge)) {
            visited.add(edge);
            nextLayer.push(edge);
          }
        }
      }
    }
    queue = nextLayer;
    nextLayer = [];
  }
}

function knightMoves(start, end) {
  if (
    start[0] > 7 ||
    start[0] < 0 ||
    start[1] > 7 ||
    start[1] < 0 ||
    end[0] > 7 ||
    end[0] < 0 ||
    end[1] > 7 ||
    end[1] < 0
  ) {
    console.log("must pick values between 0-7");
    return null;
  } else if (start.toString() === end.toString()) {
    return [start.toString()];
  }
  let fullPath = [end.toString()];
  let prevMove = [findPrevMove(start, end)];

  while (prevMove.toString() !== start.toString()) {
    fullPath.unshift(prevMove);
    prevMove = [findPrevMove(start, prevMove)];
  }
  fullPath.unshift([start.toString()]);
  return fullPath;
}

console.log(knightMoves([4, 1], [7, 5]));
