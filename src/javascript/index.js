import { renderGrid, gridObj, clearGrid, clearVisited } from "./grid.js";
import { visualizeBreathFirstSearch } from "../PathfindingAlgorithms/BreathFirstSearch.js";
import { visualizeDijkstra } from "../PathfindingAlgorithms/Dijkstra.js";
// import { visualizeDepthFirstSearch } from "../PathfindingAlgorithms/DepthFirstSearch.js";

const algorithmTypes = {
  Unweighted: "Unweighted",
  Weighted: "Weighted",
};

const unweightedAlgrithms = ["Breath First Search", "Depth First Search"];

export var isRunning = false;
export var isFinished = false;
export var algorithmType = algorithmTypes.Unweighted;
var currentAlgorithm = "Breath First Search";
var reset = false;

// createGrid();

if (document.querySelector("#clear-grid-btn")) {
  document.querySelector("#clear-grid-btn").addEventListener("click", () => {
    clearGrid();
  });
}

export const visualize = () => {
  console.log("Visualize Called:", isFinished);
  clearVisited();

  if (currentAlgorithm === "Breath First Search") {
    const { visitedArray, backTrackArray } = visualizeBreathFirstSearch(
      gridObj
    );
    if (!isFinished) visualizeAlgorithm(visitedArray, backTrackArray);
    else renderPath(visitedArray, backTrackArray);
  } else if (currentAlgorithm === "Depth First Search") {
    var { visitedArray, backTrackArray } = visualizeDepthFirstSearch(
      START_NODE_LOCATION,
      grid
    );
    if (!isFinished) visualizeAlgorithm(visitedArray, backTrackArray);
    else renderPath(visitedArray, backTrackArray);
  } else if (currentAlgorithm === "Dijkstra") {
    const { visitedArray, backTrackArray } = visualizeDijkstra(gridObj);
    if (!isFinished) visualizeAlgorithm(visitedArray, backTrackArray);
    else renderPath(visitedArray, backTrackArray);
  }
};

//Visualizes the algorithm
const visualizeAlgorithm = (visitedNodes, backTrackArray) => {
  isRunning = true;

  for (let i = 0; i < visitedNodes.length; i++) {
    setTimeout(() => {
      if (
        document.querySelector(
          `#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`
        )
      ) {
        if (
          document
            .querySelector(
              `#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`
            )
            .classList.contains("visited")
        )
          document
            .querySelector(
              `#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`
            )
            .classList.remove("visited");
        document
          .querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)
          .classList.add("visited-anim");
      }
    }, 10 * i);
  }

  setTimeout(() => {
    for (let i = 0; i < backTrackArray.length; i++) {
      setTimeout(() => {
        if (
          document.querySelector(
            `#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`
          )
        ) {
          document
            .querySelector(
              `#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`
            )
            .classList.remove("visited-anim");

          document
            .querySelector(
              `#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`
            )
            .classList.add("back-track");
        }
      }, 40 * i);
    }
  }, 10 * visitedNodes.length);

  setTimeout(() => {
    isRunning = false;
    isFinished = true;
  }, 10 * visitedNodes.length + 40 * backTrackArray.length);
};

const renderPath = (visitedNodes, backTrackArray) => {
  for (let i = 0; i < visitedNodes.length; i++) {
    if (
      document.querySelector(
        `#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`
      )
    ) {
      if (
        document
          .querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)
          .classList.contains("visited-anim")
      )
        document
          .querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)
          .classList.remove("visited-anim");
      document
        .querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)
        .classList.add("visited");
    }
  }

  for (let i = 0; i < backTrackArray.length; i++) {
    if (
      document.querySelector(
        `#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`
      )
    ) {
      document
        .querySelector(
          `#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`
        )
        .classList.remove("visited");

      document
        .querySelector(
          `#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`
        )
        .classList.add("back-track");
    }
  }
};

renderGrid();

if (document.querySelector(".grid__wrapper")) {
  document.querySelector(".grid__wrapper").addEventListener("drag", (e) => {
    e.preventDefault();
  });
}

//Adding event listener to button so that it can start a visualization
if (document.querySelector("#visualize-btn")) {
  document.querySelector("#visualize-btn").addEventListener("click", () => {
    if (!isRunning) {
      console.log(gridObj.getGrid());
      isFinished = false;
      visualize();
    }
  });
}

//Adding event listener to algorithm selector so that it can set the algorithm type to either unweighted or weighted
if (document.querySelector("#current-algorithm")) {
  const algorithmSelector = document.querySelector("#current-algorithm");

  algorithmSelector.addEventListener("change", () => {
    //Keeps track of previous algorithm type
    let previousAlgorithmType = algorithmType;
    //Set current algorithm
    currentAlgorithm =
      algorithmSelector.options[algorithmSelector.selectedIndex].text;

    //Check weather the current algorithm is weighted or unweighted and assigns either
    //weighted or unweighted to the algorithm type
    if (unweightedAlgrithms.includes(currentAlgorithm))
      algorithmType = algorithmTypes.Unweighted;
    else algorithmType = algorithmTypes.Weighted;

    //If the previous algorithm type isn't equal to the current algorithm type, clear all the visited nodes
    if (algorithmType !== previousAlgorithmType) {
      clearVisited();

      gridObj.changeNodeType(algorithmType);
    }
  });
}
