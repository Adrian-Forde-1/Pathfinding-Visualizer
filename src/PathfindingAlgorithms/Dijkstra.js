import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { compareArray } from "../javascript/helpers/util.js";

export const visualizeDijkstra = (gridObj) => {
  let visitedArray = [];
  let backTrackArray = [];
  let sortedNodes = [...gridObj.getNodes()];
  let grid = [...gridObj.getGrid()];
  let startNodeLocation = [...gridObj.getStartNodeLocation()];
  let targetNodeLocation = [...gridObj.getTargetNodeLocation()];
  let currentNodeLocation = [...startNodeLocation];
  let currentNode;

  if (!startNodeLocation || !targetNodeLocation || startNodeLocation === targetNodeLocation) {
    return false;
  }

  if (compareArray(startNodeLocation, targetNodeLocation)) {
    let backTrackArray = [];
    return {
      visitedArray,
      backTrackArray,
    };
  }

  grid[currentNodeLocation[0]][currentNodeLocation[1]]["distance"] = 0;

  while (!compareArray(currentNodeLocation, targetNodeLocation)) {
    sortedNodes = sortNodesByDistance(sortedNodes);
    currentNode = sortedNodes.shift();
    currentNodeLocation = currentNode.getLocation();
    grid[currentNodeLocation[0]][currentNodeLocation[1]]["visited"] = true;

    let edges = gridObj.adjacentEdges(currentNodeLocation);

    edges.forEach((edge) => {
      if (
        edge[0] >= 0 &&
        edge[0] <= gridObj.getRows() - 1 &&
        edge[1] >= 0 &&
        edge[1] <= gridObj.getCols() - 1
      ) {
        if (!grid[edge[0]][edge[1]]["visited"]) {
          if (grid[edge[0]][edge[1]]["isWall"]) {
            let nodeIndex = sortedNodes.findIndex((node) =>
              compareArray(node["location"], grid[edge[0]][edge[1]]["location"])
            );
            grid[edge[0]][edge[1]]["visited"] = true;
            sortedNodes.splice(nodeIndex, 1);

            //TODO: The algorithm is glitching because after it visites all the values,
            //that enclose the start node, it starts visiting the other nodes that have
            //a distance of 9999999999. I need to stop the algorithm if it has visited all the walls somehow

            //1. Do more than just remove the wall when it has been visited
            return;
          } else {
            visitedArray.push(currentNodeLocation);
            grid[edge[0]][edge[1]]["distance"] = currentNode["distance"] + 1;
            grid[edge[0]][edge[1]]["parentNodeLocation"] = currentNodeLocation;

            let nodeIndex = sortedNodes.findIndex((node) =>
              compareArray(node["location"], grid[edge[0]][edge[1]]["location"])
            );

            sortedNodes[nodeIndex]["distance"] = currentNode["distance"] + 1;
          }
        }
      }
    });
  }

  if (compareArray(currentNodeLocation, targetNodeLocation)) {
    backTrackArray = pathfindingAlgorithmBackTrack(currentNodeLocation, startNodeLocation, grid);
  }

  return {
    visitedArray,
    backTrackArray,
  };
};

let sortNodesByDistance = (nodes) => {
  let sortedNodes = nodes.sort((a, b) => compare(a, b));
  return sortedNodes;
};

const compare = (a, b) => {
  if (a["distance"] < b["distance"]) return -1;
  if (a["distance"] > b["distance"]) return 1;

  return 0;
};
