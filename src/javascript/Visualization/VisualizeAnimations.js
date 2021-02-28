import { isRunning, setIsFinished, setIsRunning } from "../index.js";

const visitedNodeAnimTime = 15;
const backTrackNodeAnimTime = 40;

//Visualizes the algorithm
export const visualizeAlgorithm = (visitedNodes, backTrackArray) => {
  setIsRunning(true);
  console.log("Visited Nodes");
  console.log(visitedNodes);

  if (
    document.querySelector("#visualize-btn") &&
    !document.querySelector("#visualize-btn").classList.contains("disabled")
  ) {
    document.querySelector("#visualize-btn").classList.add("disabled");
  }

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
    }, visitedNodeAnimTime * i);
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
      }, backTrackNodeAnimTime * i);
    }
  }, visitedNodeAnimTime * visitedNodes.length);

  setTimeout(() => {
    setIsRunning(false);
    setIsFinished(true);
    if (
      document.querySelector("#visualize-btn") &&
      document.querySelector("#visualize-btn").classList.contains("disabled")
    ) {
      document.querySelector("#visualize-btn").classList.remove("disabled");
    }
  }, visitedNodeAnimTime * visitedNodes.length + backTrackNodeAnimTime * backTrackArray.length);
};

export const renderPath = (visitedNodes, backTrackArray) => {
  console.log("Visualize bfs called");
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
