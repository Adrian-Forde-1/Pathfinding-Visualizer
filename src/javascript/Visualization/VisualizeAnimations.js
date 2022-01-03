import { isRunning, setIsFinished, setIsRunning } from "../index.js";

const speedSlider = document.querySelector("#algo-speed-slider");
const speedSliderValue = document.querySelector("#algo-speed-slider-value");

let visitedNodeAnimTime = 100;
let backTrackNodeAnimTime = 40;

if (speedSlider !== null && speedSliderValue !== null) {
  visitedNodeAnimTime = parseInt(speedSlider.value);
  // backTrackNodeAnimTime = parseInt(speedSlider.value);
  speedSliderValue.innerHTML = speedSlider.value;

  speedSlider.addEventListener("change", (e) => {
    visitedNodeAnimTime = parseInt(e.target.value);
    // backTrackNodeAnimTime = parseInt(e.target.value);
    speedSliderValue.innerHTML = e.target.value;
  });
}

//Visualizes the algorithm
export const visualizeAlgorithm = (visitedNodes, backTrackArray) => {
  setIsRunning(true);
  speedSlider.disabled = true;

  if (
    document.querySelector("#visualize-btn") &&
    !document.querySelector("#visualize-btn").classList.contains("disabled")
  ) {
    document.querySelector("#visualize-btn").classList.add("disabled");
  }

  for (let i = 0; i < visitedNodes.length; i++) {
    setTimeout(() => {
      if (document.querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)) {
        if (
          document
            .querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)
            .classList.contains("visited")
        )
          document
            .querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)
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
        if (document.querySelector(`#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`)) {
          document
            .querySelector(`#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`)
            .classList.remove("visited-anim");

          document
            .querySelector(`#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`)
            .classList.add("back-track");
        }
      }, backTrackNodeAnimTime * i);
    }
  }, visitedNodeAnimTime * visitedNodes.length);

  setTimeout(() => {
    setIsRunning(false);
    setIsFinished(true);
    speedSlider.disabled = false;
    if (
      document.querySelector("#visualize-btn") &&
      document.querySelector("#visualize-btn").classList.contains("disabled")
    ) {
      document.querySelector("#visualize-btn").classList.remove("disabled");
    }
  }, visitedNodeAnimTime * visitedNodes.length + backTrackNodeAnimTime * backTrackArray.length);
};

export const renderPath = (visitedNodes, backTrackArray) => {
  // console.log(visitedNodes);
  for (let i = 0; i < visitedNodes.length; i++) {
    if (document.querySelector(`#row-${visitedNodes[i][0]}col-${visitedNodes[i][1]}`)) {
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
    if (document.querySelector(`#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`)) {
      document
        .querySelector(`#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`)
        .classList.remove("visited");

      document
        .querySelector(`#row-${backTrackArray[i][0]}col-${backTrackArray[i][1]}`)
        .classList.add("back-track");
    }
  }
};
