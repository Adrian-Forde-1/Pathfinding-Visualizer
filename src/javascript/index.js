import {
  createGrid,
  grid,
  START_NODE_LOCATION,
  visualizeBreathFirstSearch,
} from "./grid.js";
// import { visualizeBreathFirstSearch } from "../PathfindingAlgorithms/BreathFirstSearch.js";

createGrid();

if (document.querySelector("#visualize-btn")) {
  document.querySelector("#visualize-btn").addEventListener("click", () => {
    visualize();
  });
}

setTimeout(() => {
  const visitedNodes = visualizeBreathFirstSearch(START_NODE_LOCATION);

  for (let i = 0; i < visitedNodes.length; i++) {
    console.log(
      document.querySelector(
        `#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`
      )
    );
    setTimeout(() => {
      if (
        document.querySelector(
          `#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`
        )
      ) {
        console.log("Found node");
        document
          .querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)
          .classList.add("visited");
      }
    }, 20 * i);
  }

  // console.log(visitedNodes);
  console.log(grid);
}, 0);
