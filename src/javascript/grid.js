import Node from "./node.js";
import { isRunning } from "./index.js";

export var grid = [];

export const ROWS = 20;
export const COLS = 40;

export const START_NODE_LOCATION = [10, 5];
export const TARGET_NODE_LOCATION = [10, 35];

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
    !isRunning &&
    grid[row][col]["isStart"] === false &&
    grid[row][col]["isTarget"] === false
  ) {
    grid[row][col]["isWall"] = !grid[row][col]["isWall"];
    if (grid[row][col]["isWall"]) cell.classList.add("isWall");
    else cell.classList.remove("isWall");
  }
};

// if (document.querySelector("#body")) {
//   const body = document.querySelector("#body");
// }

// if (document.querySelector("button")) {
//   document.querySelector("button").addEventListener("click", () => {
//     if (document.querySelector("#body")) {
//       const body = document.querySelector("#body");

//       body.childNodes.forEach((child) => {
//         console.log(child);
//         // body.removeChild(child);
//       });

//       // createGrid();
//     }
//   });
// }

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
  grid[START_NODE_LOCATION[0]][START_NODE_LOCATION[1]]["isStart"] = true;
  grid[TARGET_NODE_LOCATION[0]][TARGET_NODE_LOCATION[1]]["isTarget"] = true;
  renderGrid();
};

export const setGrid = (newGrid) => {
  grid = newGrid;
};

export const adjacentEdges = (locations) => {
  var adjacentEdgesLocations = [];
  adjacentEdgesLocations.push([locations[0] - 1, locations[1]]);
  adjacentEdgesLocations.push([locations[0] + 1, locations[1]]);
  adjacentEdgesLocations.push([locations[0], locations[1] - 1]);
  adjacentEdgesLocations.push([locations[0], locations[1] + 1]);

  return adjacentEdgesLocations;
};

window.addEventListener("mousedown", () => {
  mouseDown = true;
});

window.addEventListener("mouseup", () => {
  mouseDown = false;
});

// window.addEventListener("drag", (e) => {
//   e.preventDefault();
// });
