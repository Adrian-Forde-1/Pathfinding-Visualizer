// import { ROWS, COLS, adjacentEdges } from "../javascript/grid.js";
import { gridObj } from "../javascript/grid.js";
import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { compareArray } from "../javascript/helpers/util.js";

// export const visualizeDepthFirstSearch = (gridObj) => {
//   let stack = [];
//   let visitedArray = [];
//   let backTrackArray = [];
//   let startNodeLocation = gridObj.getStartNodeLocation();
//   let targetNodeLocation = gridObj.getTargetNodeLocation();
//   let grid = gridObj.getGrid();

//   if (
//     !startNodeLocation ||
//     !targetNodeLocation ||
//     startNodeLocation === targetNodeLocation
//   )
//     return false;

//   if (grid[startNodeLocation[0]][startNodeLocation[1]]["isTarget"]) {
//     let backTrackArray = [];
//     return {
//       visitedArray,
//       backTrackArray,
//     };
//   }

//   stack.push(startNodeLocation);

//   while (stack.length > 0) {
//     console.log("Runn");
//     var currentNodeLocation = stack.pop();
//     console.log("Current Node Location");
//     console.log(currentNodeLocation);

//     if (grid[currentNodeLocation[0]][currentNodeLocation[1]]["isTarget"]) {
//       let backTrackArray = pathfindingAlgorithmBackTrack(
//         grid[currentNodeLocation[0]][currentNodeLocation[1]][
//           "parentNodeLocation"
//         ],
//         startNodeLocation,
//         grid
//       );
//       let arr = [];
//       return {
//         visitedArray,
//         backTrackArray: arr,
//       };
//     }

//     if (!grid[currentNodeLocation[0]][currentNodeLocation[1]]["visited"]) {
//       grid[currentNodeLocation[0]][currentNodeLocation[1]]["visited"] = true;
//       visitedArray.push(currentNodeLocation);
//       var edges = gridObj.adjacentEdges(currentNodeLocation);

//       //   console.log(edges);

//       edges.forEach((edge) => {
//         if (
//   edge[0] >= 0 &&
//   edge[0] <= gridObj.getRows() - 1 &&
//   edge[1] >= 0 &&
//   edge[1] <= gridObj.getCols() - 1
//         ) {
//           //   console.log("Edge");
//           grid[edge[0]][edge[1]]["parentNodeLocation"] = currentNodeLocation;
//           //   grid[edge[0]][edge[1]]["visited"] = true;
//           stack.push(edge);
//         }
//       });
//       //   console.log(stack);
//     }
//   }

// backTrackArray = pathfindingAlgorithmBackTrack(
//   grid[currentNodeLocation[0]][currentNodeLocation[1]][
//     "parentNodeLocation"
//   ],
//   startNodeLocation,
//   grid
// );

//   console.log("Depth First Search Visited Array");
//   console.log(visitedArray);
//   let arr = [];
//   return {
//     visitedArray,
//     backTrackArray: arr,
//   };
// };

let DFSBackTrackArray = [];

export const visualizeDepthFirstSearch = (gridObj) => {
  gridObj.clearVisited();

  let visitedArray = [];
  DFSBackTrackArray = [];
  let targetNodeLocation = gridObj.getTargetNodeLocation();
  let startNodeLocation = gridObj.getStartNodeLocation();
  let grid = gridObj.getGrid();

  if (!gridObj.getNodeAtPosition(startNodeLocation)["isTarget"])
    return depthFirstSearchHelper(
      startNodeLocation,
      targetNodeLocation,
      grid,
      visitedArray,
      gridObj
    );
};

const depthFirstSearchHelper = (
  currentNodeLocation,
  targetNodeLocation,
  grid,
  visitedArray,
  gridObj,
  stopAlgo = false
) => {
  let foundTarget = false;
  console.log("CALLED");
  console.log(currentNodeLocation);
  if (!compareArray(targetNodeLocation, currentNodeLocation)) {
    visitedArray.push(currentNodeLocation);

    var edges = gridObj.adjacentEdges(currentNodeLocation);

    if (allEdgesAreVisited(edges, gridObj))
      backTrack({ currentNodeLocation, targetNodeLocation, grid, visitedArray }, gridObj);
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
            gridObj.getNodeAtPosition(edges[i])["visited"] = true;

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
              // Set parent node which will be used for backtracking

              return depthFirstSearchHelper(
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
  const { currentNodeLocation, targetNodeLocation, grid, visitedArray } = data;
  console.log("BACKTRACK CALLED");
  console.log(currentNodeLocation);
  console.log(
    gridObj.isEdgeInGrid(currentNodeLocation) &&
      Array.isArray(gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"]) &&
      gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"].length > 0
  );
  if (
    gridObj.isEdgeInGrid(currentNodeLocation) &&
    Array.isArray(gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"]) &&
    gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"].length > 0
  ) {
    let edgesOfParent = gridObj.adjacentEdges(
      gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"]
    );

    if (allEdgesAreVisited(edgesOfParent, gridObj)) backTrack(data, gridObj);

    if (!gridObj.getNodeAtPosition(currentNodeLocation)["parentNodeLocation"]["isWall"]) {
      return depthFirstSearchHelper(
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
