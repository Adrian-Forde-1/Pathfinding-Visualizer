import Node from "./node.js";

window.addEventListener("mousedown", () => {
  mouseDown = true;
});

window.addEventListener("mouseup", () => {
  mouseDown = false;
});

window.addEventListener("drag", (e) => {
  e.preventDefault();
});

export var grid = [];

const ROWS = 40;
const COLS = 80;

export const START_NODE_LOCATION = [20, 5];
export const TARGET_NODE_LOCATION = [20, 75];

var mouseDown = false;

const manageWall = (row, col, cell) => {
  createWall(row, col, cell);
};

const mouseEnter = (row, col, cell) => {
  if (mouseDown) {
    createWall(row, col, cell);
  }
};

const createWall = (row, col, cell) => {
  if (
    grid[row][col]["isStart"] === false &&
    grid[row][col]["isTarget"] === false
  ) {
    grid[row][col]["isWall"] = !grid[row][col]["isWall"];
    if (grid[row][col]["isWall"]) cell.classList.add("isWall");
    else cell.classList.remove("isWall");
  }
};

if (document.querySelector("#body")) {
  const body = document.querySelector("#body");
}

if (document.querySelector("button")) {
  document.querySelector("button").addEventListener("click", () => {
    if (document.querySelector("#body")) {
      const body = document.querySelector("#body");

      body.childNodes.forEach((child) => {
        console.log(child);
        // body.removeChild(child);
      });

      // createGrid();
    }
  });
}

const renderGrid = () => {
  for (let i = 0; i < ROWS; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for (let x = 0; x < COLS; x++) {
      let cell = document.createElement("div");

      cell.setAttribute("row", i);
      cell.setAttribute("col", x);
      cell.setAttribute("id", `row-${i}col-${x}`);

      cell.classList.add("node");

      if (i == START_NODE_LOCATION[0] && x === START_NODE_LOCATION[1])
        cell.classList.add("isStart");
      else if (i == TARGET_NODE_LOCATION[0] && x === TARGET_NODE_LOCATION[1])
        cell.classList.add("isTarget");

      cell.addEventListener("mousedown", () => {
        manageWall(cell.getAttribute("row"), cell.getAttribute("col"), cell);
      });

      cell.addEventListener("mouseenter", () => {
        mouseEnter(cell.getAttribute("row"), cell.getAttribute("col"), cell);
      });

      cell.addEventListener("drag", (e) => {
        e.preventDefault();
      });
      row.appendChild(cell);
    }

    body.appendChild(row);
  }
};

export const createGrid = () => {
  grid = [];
  for (let i = 0; i < ROWS; i++) {
    var row = [];
    for (let x = 0; x < COLS; x++) {
      row.push(new Node());
    }
    grid.push(row);
  }
  renderGrid();
};

export const setGrid = (newGrid) => {
  grid = newGrid;
};

export const visualizeBreathFirstSearch = (startNodeLocation) => {
  // const queue = new Queue();
  const queue = [];
  const visitiedArray = [];
  // queue.push(startNodeLocation);

  queue.push(startNodeLocation);

  if (!grid[startNodeLocation[0]][startNodeLocation[1]]["isTarget"]) {
    grid[startNodeLocation[0]][startNodeLocation[1]]["visited"] = true;

    while (queue.length > 0) {
      const firstLocation = queue.shift();

      if (grid[firstLocation[0]][firstLocation[1]]["isTarget"])
        return visitiedArray;

      var edges = adjacentEdges(firstLocation);

      edges.forEach((edge) => {
        if (
          edge[0] >= 0 &&
          edge[0] <= ROWS - 1 &&
          edge[1] >= 0 &&
          edge[1] <= COLS - 1
        ) {
          if (!grid[edge[0]][edge[1]]["visited"]) {
            grid[edge[0]][edge[1]]["visited"] = true;
            queue.push(edge);
            visitiedArray.push(edge);
          }
        }
      });
    }
  }

  return visitiedArray;
};

const adjacentEdges = (locations) => {
  var adjacentEdgesLocations = [];
  adjacentEdgesLocations.push([locations[0] - 1, locations[1]]);
  adjacentEdgesLocations.push([locations[0] + 1, locations[1]]);
  adjacentEdgesLocations.push([locations[0], locations[1] - 1]);
  adjacentEdgesLocations.push([locations[0], locations[1] + 1]);

  return adjacentEdgesLocations;
};
