import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { compareArray } from "../javascript/helpers/util.js";

export const visualizeDijkstra = (gridObj) => {
  var visitedArray = [];
  var backTrackArray = [];
  var sortedNodes;
  var grid = gridObj.getGrid();
  var unvisitedNodes = gridObj.getGrid();
  var startNodeLocation = gridObj.getStartNodeLocation();
  var targetNodeLocation = gridObj.getTargetNodeLocation();
  var currentNodeLocation = startNodeLocation;
  var currentNode;

  console.log("Start Node Location:", startNodeLocation);

  if (
    !startNodeLocation ||
    !targetNodeLocation ||
    startNodeLocation === targetNodeLocation
  ) {
    let visitedArray = [];
    let backTrackArray = [];
    return {
      visitedArray,
      backTrackArray,
    };
  }

  grid[currentNodeLocation[0]][currentNodeLocation[1]]["distance"] = 0;
  sortedNodes = gridObj.getNodes();
  while (!compareArray(currentNodeLocation, targetNodeLocation)) {
    sortedNodes = sortNodesByDistance(sortedNodes);
    currentNode = sortedNodes.shift();
    currentNodeLocation = currentNode.getLocation();
    grid[currentNodeLocation[0]][currentNodeLocation[1]]["visited"] = true;
    visitedArray.push(currentNodeLocation);

    // console.log(sortedNodes[0]["distance"]);

    var edges = gridObj.adjacentEdges(currentNodeLocation);

    edges.forEach((edge) => {
      if (
        edge[0] >= 0 &&
        edge[0] <= gridObj.getRows() - 1 &&
        edge[1] >= 0 &&
        edge[1] <= gridObj.getCols() - 1
      ) {
        if (!grid[edge[0]][edge[1]]["visited"]) {
          if (grid[edge[0]][edge[1]]["isWall"]) {
            console.log("Is Wall");
            let nodeIndex = sortedNodes.findIndex((node) =>
              compareArray(node["location"], grid[edge[0]][edge[1]]["location"])
            );
            grid[edge[0]][edge[1]]["visited"] = true;
            sortedNodes.splice(nodeIndex, 1);
            return;
          } else {
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

  backTrackArray = pathfindingAlgorithmBackTrack(
    currentNodeLocation,
    startNodeLocation,
    grid
  );

  return {
    visitedArray,
    backTrackArray,
  };
};

var sortNodesByDistance = (nodes) => {
  var sortedNodes = nodes.sort((a, b) => compare(a, b));
  return sortedNodes;
};

const compare = (a, b) => {
  if (a["distance"] < b["distance"]) return -1;
  if (a["distance"] > b["distance"]) return 1;

  return 0;
};
