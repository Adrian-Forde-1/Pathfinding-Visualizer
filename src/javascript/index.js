import { renderGrid, gridObj, clearGrid, clearVisited, clearWalls } from "./grid.js";

import { visualizeBreadthFirstSearch } from "../PathfindingAlgorithms/BreadthFirstSearch.js";
// import { visualizeDepthFirstSearch } from "../PathfindingAlgorithms/DepthFirstSearch.js";
import { renderPath, visualizeAlgorithm } from "./Visualization/VisualizeAnimations.js";
import DepthFirstSearch from "../PathfindingAlgorithms/DepthFirstSearch.js";
import Dijkstra from "../PathfindingAlgorithms/Dijkstra.js";

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

  const depthFirstSearch = new DepthFirstSearch(gridObj);
  const dijkstra = new Dijkstra(gridObj);

  if (currentAlgorithm === "Breadth First Search") {
    const { visitedArray, backTrackArray } = visualizeBreadthFirstSearch(gridObj);
    if (!isFinished) visualizeAlgorithm(visitedArray, backTrackArray);
    else renderPath(visitedArray, backTrackArray);
  } else if (currentAlgorithm === "Depth First Search") {
    var { visitedArray, backTrackArray } = depthFirstSearch.visualize();
    if (!isFinished) visualizeAlgorithm(visitedArray, backTrackArray);
    else renderPath(visitedArray, backTrackArray);
  } else if (currentAlgorithm === "Dijkstra") {
    const { visitedArray, backTrackArray } = dijkstra.visualize();
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
