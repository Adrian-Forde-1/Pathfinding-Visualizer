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
        }, 5 * i);
      }
    }, 10 * visitiedArray.length);
  });
}
