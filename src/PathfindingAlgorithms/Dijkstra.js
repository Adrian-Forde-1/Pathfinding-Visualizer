import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { compareArray } from "../javascript/helpers/util.js";

export const visualizeDijkstra = (gridObj) => {
  let visitedArray = new Array();
  let backTrackArray = [];
  let sortedNodes;
  let grid = [...gridObj.getGrid()];
  let startNodeLocation = [...gridObj.getStartNodeLocation()];
  let targetNodeLocation = [...gridObj.getTargetNodeLocation()];
  let currentNodeLocation = [...startNodeLocation];
  let currentNode;

  // console.log("Start Node Location:", startNodeLocation);
  // console.log("Target Node Location:", targetNodeLocation);
  // console.log("Current Node Location:", currentNodeLocation);

  gridObj.clearVisited();

  if (
    !startNodeLocation ||
    !targetNodeLocation ||
    startNodeLocation === targetNodeLocation
  ) {
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
  sortedNodes = [...gridObj.getNodes()];

  // console.log("Sorted Nodes Length:", sortedNodes.length);

  grid[startNodeLocation[0]][startNodeLocation[1]]["visited"] = true;

  // console.log(gridObj.getWallLocations());
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

  // backTrackArray = pathfindingAlgorithmBackTrack(
  //   currentNodeLocation,
  //   startNodeLocation,
  //   grid
  // );

  // console.log("Dijkstra called");
  // console.log(visitedArray);
  let arr = [];

  return {
    visitedArray,
    backTrackArray: arr,
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
