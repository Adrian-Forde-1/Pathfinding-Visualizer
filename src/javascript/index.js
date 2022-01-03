import { renderGrid, gridObj, clearGrid, clearVisited, clearWalls } from "./grid.js";

import { visualizeBreadthFirstSearch } from "../PathfindingAlgorithms/BreadthFirstSearch.js";
import { visualizeDijkstra } from "../PathfindingAlgorithms/Dijkstra.js";
import { visualizeDepthFirstSearch } from "../PathfindingAlgorithms/DepthFirstSearch.js";
import { renderPath, visualizeAlgorithm } from "./Visualization/VisualizeAnimations.js";

import "./Listeners/EventListeners.js";

export const algorithmTypes = {
  Unweighted: "Unweighted",
  Weighted: "Weighted",
};

export const unweightedAlgrithms = ["Breadth First Search", "Depth First Search"];

export var isRunning = false;
export var isFinished = false;
export var algorithmType = algorithmTypes.Unweighted;
export var currentAlgorithm =
  document.querySelector("#current-algorithm").options[
    document.querySelector("#current-algorithm").selectedIndex
  ].text;
var reset = false;

// createGrid();

export const visualize = () => {
  clearVisited();
  gridObj.clearVisited();
  gridObj.clearDistance();

  if (currentAlgorithm === "Breadth First Search") {
    const { visitedArray, backTrackArray } = visualizeBreadthFirstSearch(gridObj);
    if (!isFinished) visualizeAlgorithm(visitedArray, backTrackArray);
    else renderPath(visitedArray, backTrackArray);
  } else if (currentAlgorithm === "Depth First Search") {
    var { visitedArray, backTrackArray } = visualizeDepthFirstSearch(gridObj);
    if (!isFinished) visualizeAlgorithm(visitedArray, backTrackArray);
    else renderPath(visitedArray, backTrackArray);
  } else if (currentAlgorithm === "Dijkstra") {
    const { visitedArray, backTrackArray } = visualizeDijkstra(gridObj);
    if (!isFinished) visualizeAlgorithm(visitedArray, backTrackArray);
    else renderPath(visitedArray, backTrackArray);
  }
};

export const setIsFinished = (finished) => {
  isFinished = finished;
};

export const setIsRunning = (running) => {
  isRunning = running;
};

export const setCurrentAlgorithm = (algo) => {
  currentAlgorithm = algo;
};

export const setAlgorithmType = (type) => {
  algorithmType = type;
};

renderGrid();
