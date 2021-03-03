import { isRunning, isFinished, visualize, setIsFinished } from "./index.js";
import { Grid } from "./Grid/grid.js";
import { compareArray } from "./helpers/util.js";
import { addEventListenersToGridCell } from "./Listeners/GridCellListeners.js";
import { addEventListenersToGridRow } from "./Listeners/GridRowListeners.js";

// export var grid = [];
export const ROWS = 10;
export const COLS = 20;
export const START_NODE_LOCATION = [0, 0];
export const TARGET_NODE_LOCATION = [9, 19];
export const gridObj = new Grid(
  ROWS,
  COLS,
  START_NODE_LOCATION,
  TARGET_NODE_LOCATION
);
export const grid = gridObj.getGrid();

export var mouseDown = false;
export var draggingStartNode = false;
export var draggingTargetNode = false;

gridObj.createGrid("Unweighted");

export const mouseEnter = (row, col, cell) => {
  console.log("Mouse enter");
  if (mouseDown) {
    createWall(row, col, cell);
  }
};

export const setMouseDown = (value) => {
  mouseDown = value;
};
export const setDraggingStartNode = (value) => {
  draggingStartNode = value;
};
export const setDraggingTargetNode = (value) => {
  draggingTargetNode = value;
};

export const createWall = (row, col, cell) => {
  if (
    !isRunning &&
    grid[row][col]["isStart"] === false &&
    grid[row][col]["isTarget"] === false
  ) {
    if (!grid[row][col]["isWall"]) {
      grid[row][col]["isWall"] = true;
      let wallLocations = gridObj.getWallLocations();
      wallLocations.push(new Array(parseInt(row), parseInt(col)));
      gridObj.setWallLocations(wallLocations);
      cell.classList.add("isWall");
    } else {
      grid[row][col]["isWall"] = false;
      let wallLocations = gridObj.getWallLocations();
      let wallIndex = wallLocations.findIndex((location) =>
        compareArray(location, new Array(parseInt(row), parseInt(col)))
      );

      if (wallIndex > -1) wallLocations.splice(wallIndex, 1);
      gridObj.setWallLocations(wallLocations);

      cell.classList.remove("isWall");
    }

    // console.log("Is Wall:", grid[row][col]["isWall"]);

    if (isFinished) visualize();
  }
};

export const clearGrid = () => {
  clearWalls();
  clearVisited();
  setIsFinished(false);
};

export const clearWalls = () => {
  let wallLocations = gridObj.getWallLocations();
  wallLocations.forEach((location) => {
    if (document.querySelector(`#row-${location[0]}col-${location[1]}`)) {
      let wall = document.querySelector(
        `#row-${location[0]}col-${location[1]}`
      );
      if (wall.classList.contains("isWall")) wall.classList.remove("isWall");
    }
  });
  gridObj.clearWalls();
  if (isFinished) visualize();
};

export const clearVisited = () => {
  var nodes = document.querySelectorAll(".node");
  nodes.forEach((node) => {
    if (node.classList.contains("visited")) node.classList.remove("visited");
    if (node.classList.contains("visited-anim"))
      node.classList.remove("visited-anim");
    if (node.classList.contains("back-track"))
      node.classList.remove("back-track");
  });
};

export const renderGrid = () => {
  const gridWrapper = document.querySelector(".grid__wrapper");
  const body = document.createElement("div");

  body.setAttribute("draggable", false);
  body.setAttribute("id", "body");

  gridWrapper.appendChild(body);

  body.addEventListener("drag", (e) => {
    e.preventDefault();
  });

  for (let i = 0; i < grid.length; i++) {
    var row = document.createElement("div");
    row.setAttribute("draggable", false);
    row.classList.add("row");

    addEventListenersToGridRow(row);

    for (let x = 0; x < grid[i].length; x++) {
      let cell = document.createElement("div");

      cell.setAttribute("row", i);
      cell.setAttribute("col", x);
      cell.setAttribute("draggable", false);
      cell.setAttribute("id", `row-${i}col-${x}`);

      cell.classList.add("node");

      if (grid[i][x]["isStart"]) cell.classList.add("isStart");
      else if (grid[i][x]["isTarget"]) cell.classList.add("isTarget");

      addEventListenersToGridCell(cell, i, x);

      row.appendChild(cell);
    }

    body.appendChild(row);
  }
};

document.addEventListener("mouseup", () => {
  mouseDown = false;
});
