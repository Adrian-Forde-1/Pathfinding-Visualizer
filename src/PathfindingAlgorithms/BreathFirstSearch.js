// import { ROWS, COLS, adjacentEdges } from "../javascript/grid.js";
import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { Grid } from "../javascript/Grid/grid.js";
import { compareArray } from "../javascript/helpers/util.js";

// import { Queue } from "../DataStructures/queue";

export const visualizeBreathFirstSearch = (gridObj) => {
  const queue = [];
  const visitedArray = [];

  var startNodeLocation = gridObj.getStartNodeLocation();
  var targetNodeLocation = gridObj.getTargetNodeLocation();
  var currentNodeLocation;

  gridObj.clearVisited();
  var grid = gridObj.getGrid();

  queue.push(startNodeLocation);

  if (
    !startNodeLocation ||
    !targetNodeLocation ||
    startNodeLocation === targetNodeLocation
  )
    return false;

  if (grid[startNodeLocation[0]][startNodeLocation[1]]["isTarget"]) {
    let backTrackArray = [];
    return {
      visitedArray,
      backTrackArray,
    };
  }

  grid[startNodeLocation[0]][startNodeLocation[1]]["visited"] = true;

  while (queue.length > 0) {
    currentNodeLocation = queue.shift();

    if (grid[currentNodeLocation[0]][currentNodeLocation[1]]["isTarget"]) break;

    var edges = gridObj.adjacentEdges(currentNodeLocation);
    edges.forEach((edge) => {
      if (
        edge[0] >= 0 &&
        edge[0] <= gridObj.getRows() - 1 &&
        edge[1] >= 0 &&
        edge[1] <= gridObj.getCols() - 1
      ) {
        if (!grid[edge[0]][edge[1]]["visited"]) {
          if (grid[edge[0]][edge[1]]["isWall"]) return;

          grid[edge[0]][edge[1]]["visited"] = true;
          grid[edge[0]][edge[1]]["parentNodeLocation"] = currentNodeLocation;
          visitedArray.push(edge);
          queue.push(edge);
        }
      }
    });
  }
  var backTrackArray = [];
  if (compareArray(currentNodeLocation, targetNodeLocation)) {
    backTrackArray = pathfindingAlgorithmBackTrack(
      grid[currentNodeLocation[0]][currentNodeLocation[1]][
        "parentNodeLocation"
      ],
      startNodeLocation,
      grid
    );
  } else backTrackArray = [];
  return {
    visitedArray,
    backTrackArray,
  };
};
