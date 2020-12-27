import { renderGrid, gridObj } from "./grid.js";
import { visualizeBreathFirstSearch } from "../PathfindingAlgorithms/BreathFirstSearch.js";
// import { visualizeDepthFirstSearch } from "../PathfindingAlgorithms/DepthFirstSearch.js";

export var isRunning = false;
var currentAlgorithm;

// createGrid();
renderGrid();

//Adding event listener to button so that it can start a visualization
if (document.querySelector("#visualize-btn")) {
  document.querySelector("#visualize-btn").addEventListener("click", () => {
    if (document.querySelector("#current-algorithm")) {
      const algorithmSelector = document.querySelector("#current-algorithm");
      currentAlgorithm =
        algorithmSelector.options[algorithmSelector.selectedIndex].text;
    }
    if (currentAlgorithm === "Breath First Search") {
      const { visitedArray, backTrackArray } = visualizeBreathFirstSearch(
        gridObj
      );
      visualizeAlgorithm(visitedArray, backTrackArray);
    } else if (currentAlgorithm === "Depth First Search") {
      var { visitedArray, backTrackArray } = visualizeDepthFirstSearch(
        START_NODE_LOCATION,
        grid
      );
      visualizeAlgorithm(visitedArray, backTrackArray);
    }
  });
}

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
        document
          .querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)
          .classList.add("visited");
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
            .classList.remove("visited");

          document
            .querySelector(
              `#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`
            )
            .classList.add("back-track");
        }
      }, 10 * i);
    }
    isRunning = false;
  }, 10 * visitedNodes.length);
};

if (document.querySelector(".grid__wrapper")) {
  document.querySelector(".grid__wrapper").addEventListener("drag", (e) => {
    e.preventDefault();
  });
}
