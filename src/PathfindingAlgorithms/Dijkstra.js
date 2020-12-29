import { gridObj } from "../javascript/grid.js";

export const visualizeDijkstra = (gridObj) => {
  var visitedArray = [];
  var backTrackArray = [];
  var grid = gridObj.getGrid();
  var gridNodes = gridObj.getNodes();
  var unvisitedNodes = gridObj.getGrid();
  var startNodeLocation = gridObj.getStartNodeLocation();
  var targetNodeLocation = gridObj.getTargetNodeLocation();
  var currentNodeLocation = startNodeLocation;

  // console.log(gridNodes);

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

  grid[startNodeLocation[0]][startNodeLocation[1]]["visited"] = true;
  grid[startNodeLocation[0]][startNodeLocation[1]]["distance"] = 0;

  visitedArray.push(startNodeLocation);

  var adjacentEdges = gridObj.adjacentEdges(startNodeLocation);

  adjacentEdges.forEach((edge) => {
    if (
      edge[0] >= 0 &&
      edge[0] <= gridObj.getRows() - 1 &&
      edge[1] >= 0 &&
      edge[1] <= gridObj.getCols() - 1
    ) {
      grid[edge[0]][edge[1]]["distance"] = grid[currentNodeLocation[0]][
        currentNodeLocation[1]
      ]["distance"]++;
    }
  });

  return {
    visitedArray,
    backTrackArray,
  };
};
