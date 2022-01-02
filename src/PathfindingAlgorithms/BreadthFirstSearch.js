// import { ROWS, COLS, adjacentEdges } from "../javascript/grid.js";
import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { compareArray } from "../javascript/helpers/util.js";

// import { Queue } from "../DataStructures/queue";

export const visualizeBreadthFirstSearch = (gridObj) => {
  let queue = [];
  let visitedArray = [];

  var startNodeLocation = gridObj.getStartNodeLocation();
  var targetNodeLocation = gridObj.getTargetNodeLocation();
  var currentNodeLocation;

  gridObj.clearVisited();
  var grid = gridObj.getGrid();

  queue.push(startNodeLocation);

  if (!startNodeLocation || !targetNodeLocation || startNodeLocation === targetNodeLocation)
    return false;

  if (gridObj.getNodeAtPosition(startNodeLocation)["isTarget"]) {
    let backTrackArray = [];
    return {
      visitedArray,
      backTrackArray,
    };
  }

  gridObj.getNodeAtPosition(startNodeLocation)["visited"] = true;

  while (queue.length > 0) {
    currentNodeLocation = queue.shift();

    if (grid[currentNodeLocation[0]][currentNodeLocation[1]]["isTarget"]) {
      break;
    }

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
            grid[edge[0]][edge[1]]["visited"] = true;
            return;
          }

          grid[edge[0]][edge[1]]["visited"] = true;
          grid[edge[0]][edge[1]]["parentNodeLocation"] = currentNodeLocation;
          visitedArray.push(edge);
          queue.push(edge);
        }
      }
    });
  }

  //To remove all the unnecessary visited nodes from the array
  //I did this until I can find a solution to stop the while loop when it encounters the visited array

  // let targetNodeIndex = visitedArray.findIndex((location) =>
  //   compareArray(location, targetNodeLocation)
  // );
  // visitedArray = visitedArray.slice(0, targetNodeIndex + 1);
  // var backTrackArray = [];
  // if (compareArray(currentNodeLocation, targetNodeLocation)) {
  //   backTrackArray = pathfindingAlgorithmBackTrack(
  //     new Array(currentNodeLocation[0], currentNodeLocation[1]),
  //     startNodeLocation,
  //     grid
  //   );
  // } else backTrackArray = [];
  var backTrackArray = [];

  if (compareArray(currentNodeLocation, targetNodeLocation)) {
    backTrackArray = pathfindingAlgorithmBackTrack(
      new Array(currentNodeLocation[0], currentNodeLocation[1]),
      startNodeLocation,
      grid
    );
  }

  return {
    visitedArray,
    backTrackArray,
  };
};
