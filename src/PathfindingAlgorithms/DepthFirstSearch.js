import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { compareArray } from "../javascript/helpers/util.js";

let DFSBackTrackArray = [];

export const visualizeDepthFirstSearch = (gridObj) => {
  gridObj.clearVisited();

  let visitedArray = [];
  DFSBackTrackArray = [];
  let targetNodeLocation = gridObj.getTargetNodeLocation();
  let startNodeLocation = gridObj.getStartNodeLocation();
  let grid = gridObj.getGrid();

  if (!gridObj.getNodeAtPosition(startNodeLocation)["isTarget"])
    // gridObj.getNodeAtPosition(startNodeLocation)["visited"] = true;
    return depthFirstSearchHelper(
      startNodeLocation,
      startNodeLocation,
      targetNodeLocation,
      grid,
      visitedArray,
      gridObj
    );
};

const depthFirstSearchHelper = (
  startNodeLocation,
  currentNodeLocation,
  targetNodeLocation,
  grid,
  visitedArray,
  gridObj,
  stopAlgo = false
) => {
  let foundTarget = false;
  if (!compareArray(targetNodeLocation, currentNodeLocation) && !stopAlgo) {
    gridObj.getNodeAtPosition(currentNodeLocation)["visited"] = true;
    visitedArray.push(currentNodeLocation);

    var edges = gridObj.adjacentEdges(currentNodeLocation);

    if (allEdgesAreVisited(edges, gridObj))
      backTrack(
        { startNodeLocation, currentNodeLocation, targetNodeLocation, grid, visitedArray },
        gridObj
      );
    else {
      for (let i = 0; i < edges.length; i++) {
        // Check if node/edge is within bounds of grid
        if (
          edges[i][0] >= 0 &&
          edges[i][0] <= gridObj.getRows() - 1 &&
          edges[i][1] >= 0 &&
          edges[i][1] <= gridObj.getCols() - 1 &&
          !foundTarget
        ) {
          if (!gridObj.getNodeAtPosition(edges[i])["visited"]) {
            // Set visited to true so that this node will not be visited more than once
            gridObj.getNodeAtPosition(edges[i])["parentNodeLocation"] = currentNodeLocation;

            // If edge is end node
            if (compareArray(targetNodeLocation, edges[i])) {
              visitedArray.push(edges[i]);
              DFSBackTrackArray = pathfindingAlgorithmBackTrack(
                edges[i],
                gridObj.getStartNodeLocation(),
                grid
              );
              foundTarget = true;
            }

            if (!gridObj.getNodeAtPosition(edges[i])["isWall"]) {
              return depthFirstSearchHelper(
                startNodeLocation,
                edges[i],
                targetNodeLocation,
                grid,
                visitedArray,
                gridObj
              );
            }
          }
        }
      }
    }
  }

  return {
    visitedArray,
    backTrackArray: DFSBackTrackArray,
  };
};

const backTrack = (data, gridObj) => {
  const { startNodeLocation, currentNodeLocation, targetNodeLocation, grid, visitedArray } = data;
  if (
    gridObj.isEdgeInGrid(currentNodeLocation) &&
    Array.isArray(gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"]) &&
    gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"].length > 0
  ) {
    let edgesOfParent = gridObj.adjacentEdges(
      gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"]
    );

    if (
      allEdgesAreVisited(edgesOfParent, gridObj) &&
      compareArray(currentNodeLocation, startNodeLocation)
    )
      return depthFirstSearchHelper(
        startNodeLocation,
        gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"],
        targetNodeLocation,
        grid,
        visitedArray,
        gridObj,
        true
      );
    else if (allEdgesAreVisited(edgesOfParent, gridObj))
      backTrack(
        {
          ...data,
          currentNodeLocation: gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"],
        },
        gridObj
      );

    if (!gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"]["isWall"]) {
      return depthFirstSearchHelper(
        startNodeLocation,
        gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"],
        targetNodeLocation,
        grid,
        visitedArray,
        gridObj
      );
    }
  }
};

const allEdgesAreVisited = (edges, gridObj) => {
  let allVisited = true;
  let nonWallEdges = edges.filter(
    (edge) => gridObj.isEdgeInGrid(edge) && !gridObj.getNodeAtPosition(edge)["isWall"]
  );
  if (nonWallEdges && nonWallEdges.length > 0) {
    nonWallEdges.forEach((edge) => {
      if (!gridObj.getNodeAtPosition(edge)["visited"]) allVisited = false;
    });
  }

  return allVisited;
};
