import { createGrid, grid, START_NODE_LOCATION } from "./grid.js";
import { visualizeBreathFirstSearch } from "../PathfindingAlgorithms/BreathFirstSearch.js";

export var isRunning = false;

createGrid();

if (document.querySelector("#visualize-btn")) {
  document.querySelector("#visualize-btn").addEventListener("click", () => {
    visualizeAlgorithm();
  });
}

const visualizeAlgorithm = () => {
  isRunning = true;
  const { visitiedArray, backTrackArray } = visualizeBreathFirstSearch(
    START_NODE_LOCATION
  );

  for (let i = 0; i < visitiedArray.length; i++) {
    setTimeout(() => {
      if (
        document.querySelector(
          `#row-${visitiedArray[i][0]}col-${visitiedArray[i][1]}`
        )
      ) {
        document
          .querySelector(
            `#row-${visitiedArray[i][0]}col-${visitiedArray[i][1]}`
          )
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
  }, 10 * visitiedArray.length);
};
