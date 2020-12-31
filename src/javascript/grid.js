import Node from "./node.js";
import { isRunning, isFinished, visualize, algorithmType } from "./index.js";
import { Grid } from "./Grid/grid.js";
import { compareArray } from "./helpers/util.js";

// export var grid = [];

export const ROWS = 10;
export const COLS = 20;

export const START_NODE_LOCATION = [0, 0];
export const TARGET_NODE_LOCATION = [9, 19];

export var gridObj = new Grid(
  ROWS,
  COLS,
  START_NODE_LOCATION,
  TARGET_NODE_LOCATION
);

const grid = gridObj.getGrid();

var mouseDown = false;
var draggingStartNode = false;
var draggingTargetNode = false;

gridObj.createGrid("Unweighted");

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
    if (!grid[row][col]["isWall"]) {
      grid[row][col]["isWall"] = true;
      let wallLocations = gridObj.getWallLocations();
      wallLocations.push(new Array(row, col));
      gridObj.setWallLocations(wallLocations);
      cell.classList.add("isWall");
    } else {
      grid[row][col]["isWall"] = false;
      let wallLocations = gridObj.getWallLocations();
      let wallIndex = wallLocations.findIndex((location) =>
        compareArray(location, new Array(row, col))
      );

      if (wallIndex > -1) wallLocations.splice(wallIndex, 1);
      gridObj.setWallLocations(wallLocations);

      cell.classList.remove("isWall");
    }

    if (grid[row][col]["isWall"] && isFinished) visualize();
  }
};

export const clearGrid = () => {
  gridObj = new Grid(ROWS, COLS, START_NODE_LOCATION, TARGET_NODE_LOCATION);
  const gridWrapper = document.querySelector(".grid__wrapper");
  const body = document.querySelector("#body");

  gridWrapper.removeChild(body);
  renderGrid();
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

const addEventListenersToGridRow = (row) => {
  row.addEventListener("drag", (e) => {
    e.preventDefault();
  });
  row.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
};

const addEventListenersToGridCell = (cell, i, x) => {
  cell.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (grid[i][x]["isStart"]) draggingStartNode = true;
    else if (grid[i][x]["isTarget"]) draggingTargetNode = true;
    else {
      mouseDown = true;
      manageWall(cell.getAttribute("row"), cell.getAttribute("col"), cell);
    }
  });

  cell.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(grid[i][x]);
  });

  cell.addEventListener("mouseup", () => {
    draggingStartNode = false;
    draggingTargetNode = false;
  });

  cell.addEventListener("mouseenter", () => {
    if (draggingStartNode && !isRunning) {
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
        document.querySelector(`#row-${i}col-${x}`).classList.add("isStart");
      }
      if (isFinished) visualize();
    } else if (draggingTargetNode && !isRunning) {
      //Remove Start Node Color
      var targetNodeLocation = gridObj.getTargetNodeLocation();

      if (
        document.querySelector(
          `#row-${targetNodeLocation[0]}col-${targetNodeLocation[1]}`
        ) &&
        document
          .querySelector(
            `#row-${targetNodeLocation[0]}col-${targetNodeLocation[1]}`
          )
          .classList.contains("isTarget")
      )
        document
          .querySelector(
            `#row-${targetNodeLocation[0]}col-${targetNodeLocation[1]}`
          )
          .classList.remove("isTarget");

      grid[targetNodeLocation[0]][targetNodeLocation[1]]["isTarget"] = false;

      //Set New Target Node Location
      gridObj.setTargetNodeLocation([i, x]);
      grid[i][x]["isTarget"] = true;

      //Set Target Node Color To New Node
      if (document.querySelector(`#row-${i}col-${x}`)) {
        document.querySelector(`#row-${i}col-${x}`).classList.add("isTarget");
      }

      if (isFinished) visualize();
    } else {
      mouseEnter(cell.getAttribute("row"), cell.getAttribute("col"), cell);
    }
  });

  cell.addEventListener("click", () => {
    if (!draggingStartNode && !draggingTargetNode) {
      manageWall(cell.getAttribute("row"), cell.getAttribute("col"), cell);
    }
  });

  cell.addEventListener("drag", (e) => {
    e.preventDefault();
  });
};

document.addEventListener("mouseup", () => {
  mouseDown = false;
});
