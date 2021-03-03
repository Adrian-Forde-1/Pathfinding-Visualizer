import {
  draggingStartNode,
  draggingTargetNode,
  createWall,
  mouseEnter,
  grid,
  setMouseDown,
  setDraggingStartNode,
  setDraggingTargetNode,
  gridObj,
} from "../grid.js";

import { isRunning, isFinished, visualize } from "../index.js";

export const addEventListenersToGridCell = (cell, i, x) => {
  cell.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (grid[i][x]["isStart"]) setDraggingStartNode(true);
    else if (grid[i][x]["isTarget"]) setDraggingTargetNode(true);
    else {
      setMouseDown(true);
      createWall(i, x, cell);
    }
  });

  cell.addEventListener("mouseup", () => {
    setDraggingStartNode(false);
    setDraggingTargetNode(false);
  });

  cell.addEventListener("mousemove", () => {
    //If the node is the start node and the application isn't running
    if (draggingStartNode && !isRunning) {
      //Get start node location
      var startNodeLocation = gridObj.getStartNodeLocation();

      //Remove start node class if the element contains it
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

      //Set the isStart property on the current start node to false so that
      //it will no longer be the start node
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
      //If the node is the target node and the application isn't running
      var targetNodeLocation = gridObj.getTargetNodeLocation(); //Get target node location

      //Remove target node class if the element contains it
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

      //Set the isTarget property on the current start node to false so that
      //it will no longer be the start node
      grid[targetNodeLocation[0]][targetNodeLocation[1]]["isTarget"] = false;

      //Set New Target Node Location
      gridObj.setTargetNodeLocation([i, x]);
      grid[i][x]["isTarget"] = true;

      //Set Target Node Color To New Node
      if (document.querySelector(`#row-${i}col-${x}`)) {
        document.querySelector(`#row-${i}col-${x}`).classList.add("isTarget");
      }

      if (isFinished) visualize();
    }
  });

  cell.addEventListener("mouseover", () => {
    mouseEnter(cell.getAttribute("row"), cell.getAttribute("col"), cell);
  });

  cell.addEventListener("click", () => {
    console.log(grid[i][x]);
  });

  cell.addEventListener("drag", (e) => {
    e.preventDefault();
  });
};
