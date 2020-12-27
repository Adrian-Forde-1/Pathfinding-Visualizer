import Node from "./node.js";
import { isRunning } from "./index.js";
import { Grid } from "./Grid/grid.js";

// export var grid = [];

export const ROWS = 20;
export const COLS = 40;

export const START_NODE_LOCATION = [0, 0];
export const TARGET_NODE_LOCATION = [19, 39];

export const gridObj = new Grid(
  ROWS,
  COLS,
  START_NODE_LOCATION,
  TARGET_NODE_LOCATION
);

const grid = gridObj.getGrid();

var mouseDown = false;
var draggingStartNode = false;

gridObj.createGrid();

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

export const renderGrid = () => {
  const body = document.querySelector("#body");
  if (body) {
    body.addEventListener("drag", (e) => {
      e.preventDefault();
    });

    for (let i = 0; i < grid.length; i++) {
      var row = document.createElement("div");

      row.addEventListener("drag", (e) => {
        e.preventDefault();
      });

      row.classList.add("row");

      for (let x = 0; x < grid[i].length; x++) {
        let cell = document.createElement("div");

        cell.setAttribute("row", i);
        cell.setAttribute("col", x);
        cell.setAttribute("id", `row-${i}col-${x}`);

        cell.classList.add("node");

        if (grid[i][x]["isStart"]) cell.classList.add("isStart");
        else if (grid[i][x]["isTarget"]) cell.classList.add("isTarget");

        cell.addEventListener("mousedown", () => {
          console.log("Mouse Down");
          console.log(i, x);
          console.log(gridObj.getStartNodeLocation());
          console.log(grid);
          if (grid[i][x]["isStart"]) draggingStartNode = true;
          else {
            mouseDown = true;
            manageWall(
              cell.getAttribute("row"),
              cell.getAttribute("col"),
              cell
            );
          }
        });

        cell.addEventListener("mouseup", () => {
          draggingStartNode = false;
        });

        cell.addEventListener("mouseenter", () => {
          if (draggingStartNode) {
            //Remove Start Node Color
            var startNodeLocation = gridObj.getStartNodeLocation();

            if (
              document.querySelector(
                `#row-${startNodeLocation[0]}col-${startNodeLocation[1]}`
              ) &&
              document
                .querySelector(
                  `#row-${startNodeLocation[0]}col-${startNodeLocation[1]}`
                )
                .classList.contains("isStart")
            )
              document
                .querySelector(
                  `#row-${startNodeLocation[0]}col-${startNodeLocation[1]}`
                )
                .classList.remove("isStart");
            grid[startNodeLocation[0]][startNodeLocation[1]]["isStart"] = false;

            //Set New Start Node Location
            gridObj.setStartNodeLocation([i, x]);
            grid[i][x]["isStart"] = true;

            //Set Start Node Color To New Node
            if (document.querySelector(`#row-${i}col-${x}`)) {
              document
                .querySelector(`#row-${i}col-${x}`)
                .classList.add("isStart");
            }
          } else {
            mouseEnter(
              cell.getAttribute("row"),
              cell.getAttribute("col"),
              cell
            );
          }
        });

        cell.addEventListener("click", () => {
          if (!draggingStartNode) {
            manageWall(
              cell.getAttribute("row"),
              cell.getAttribute("col"),
              cell
            );
          }
        });

        cell.addEventListener("drag", (e) => {
          e.preventDefault();
        });
        row.appendChild(cell);
      }

      body.appendChild(row);
    }
  }
};

// export const createGrid = () => {
//   grid = [];
//   for (let i = 0; i < ROWS; i++) {
//     var row = [];
//     for (let x = 0; x < COLS; x++) {
//       row.push(new Node());
//     }
//     grid.push(row);
//   }
//   grid[START_NODE_LOCATION[0]][START_NODE_LOCATION[1]]["isStart"] = true;
//   grid[TARGET_NODE_LOCATION[0]][TARGET_NODE_LOCATION[1]]["isTarget"] = true;
//   renderGrid();
// };

// export const setGrid = (newGrid) => {
//   grid = newGrid;
// };

// export const adjacentEdges = (locations) => {
//   var adjacentEdgesLocations = [];
//   adjacentEdgesLocations.push([locations[0] - 1, locations[1]]);
//   adjacentEdgesLocations.push([locations[0] + 1, locations[1]]);
//   adjacentEdgesLocations.push([locations[0], locations[1] - 1]);
//   adjacentEdgesLocations.push([locations[0], locations[1] + 1]);

//   return adjacentEdgesLocations;
// };

// window.addEventListener("mousedown", () => {
//   mouseDown = true;
// });

document.addEventListener("mouseup", () => {
  console.log("Mouse up");
  mouseDown = false;
});

// window.addEventListener("drag", (e) => {
//   e.preventDefault();
// });
