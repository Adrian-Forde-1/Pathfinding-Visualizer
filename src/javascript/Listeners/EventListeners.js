import {
  currentAlgorithm,
  algorithmTypes,
  unweightedAlgrithms,
  algorithmType,
  isRunning,
  setIsFinished,
  visualize,
  setCurrentAlgorithm,
  setAlgorithmType,
} from "../index.js";

import { clearVisited, gridObj, clearGrid, clearWalls, toggleWeight, setWeight } from "../grid.js";

if (document.querySelector("#clear-grid-btn")) {
  document.querySelector("#clear-grid-btn").addEventListener("click", () => {
    clearGrid();
  });
}

if (document.querySelector(".grid__wrapper")) {
  document.querySelector(".grid__wrapper").addEventListener("drag", (e) => {
    e.preventDefault();
  });
}

console.log(document.querySelectorAll(".node"));

setTimeout(() => {
  document.querySelectorAll(".node").forEach((node) => {
    node.addEventListener("click", () => {
      console.log(gridObj.getNodeAtPosition([node.getAttribute("row"), node.getAttribute("col")]));
    });
  });
}, 0);

//Adding event listener to button so that it can start a visualization
if (document.querySelector("#visualize-btn")) {
  document.querySelector("#visualize-btn").addEventListener("click", () => {
    if (!isRunning) {
      setIsFinished(false);
      visualize();
    }
  });
}

if (document.querySelector("#clear-walls")) {
  document.querySelector("#clear-walls").addEventListener("click", () => {
    clearWalls();
  });
}
if (document.querySelector("#add-weight")) {
  document.querySelector("#add-weight").addEventListener("click", () => {
    document.querySelector("#add-weight").parentNode.classList.toggle("active");
    toggleWeight();
  });
}
if (document.querySelector("#add-wall")) {
  document.querySelector("#add-wall").addEventListener("click", () => {
    let weightNavItem = document.querySelector("#add-weight").parentNode;
    let wallNavItem = document.querySelector("#add-wall").parentNode;

    if (weightNavItem.classList.contains("active")) weightNavItem.classList.remove("active");

    wallNavItem.classList.add("active");

    setWeight(false);
  });
}

//Adding event listener to algorithm selector so that it can set the algorithm type to either unweighted or weighted
if (document.querySelector("#current-algorithm")) {
  const algorithmSelector = document.querySelector("#current-algorithm");

  algorithmSelector.addEventListener("change", () => {
    //Keeps track of previous algorithm type
    let previousAlgorithmType = algorithmType;
    //Set current algorithm
    setCurrentAlgorithm(algorithmSelector.options[algorithmSelector.selectedIndex].text);

    //Check weather the current algorithm is weighted or unweighted and assigns either
    //weighted or unweighted to the algorithm type
    if (unweightedAlgrithms.includes(currentAlgorithm)) setAlgorithmType(algorithmTypes.Unweighted);
    else setAlgorithmType(algorithmTypes.Weighted);

    //If the previous algorithm type isn't equal to the current algorithm type, clear all the visited nodes
    if (algorithmType !== previousAlgorithmType) {
      clearVisited();

      gridObj.changeNodeType(algorithmType);
    }
  });
}
