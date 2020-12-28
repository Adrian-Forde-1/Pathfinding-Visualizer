import { renderGrid, gridObj } from "./grid.js";
import { visualizeBreathFirstSearch } from "../PathfindingAlgorithms/BreathFirstSearch.js";
// import { visualizeDepthFirstSearch } from "../PathfindingAlgorithms/DepthFirstSearch.js";

export var isRunning = false;
export var isFinished = false;
var currentAlgorithm;

// createGrid();

export const visualize = () => {
  console.log("Visualize Called:", isFinished);
  var nodes = document.querySelectorAll(".node");

  nodes.forEach((node) => {
    if (node.classList.contains("visited")) node.classList.remove("visited");
    if (node.classList.contains("back-track"))
      node.classList.remove("back-track");
  });

  if (document.querySelector("#current-algorithm")) {
    const algorithmSelector = document.querySelector("#current-algorithm");
    currentAlgorithm =
      algorithmSelector.options[algorithmSelector.selectedIndex].text;
  }

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
      }, 10 * i);
    }
    isRunning = false;
    isFinished = true;
  }, 10 * visitedNodes.length);
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
    isFinished = false;
    visualize();
  });
}
