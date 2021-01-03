// import { ROWS, COLS, adjacentEdges } from "../javascript/grid.js";
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

export const visualizeDepthFirstSearch = (gridObj) => {
  var visitedNodes = [];

  let stack = [];
  let backTrackArray = [];
  let targetNodeLocation = gridObj.getTargetNodeLocation();
  let visitedArray = [];
  let startNodeLocation = gridObj.getStartNodeLocation();
  let grid = gridObj.getGrid();

  if (!grid[startNodeLocation[0]][startNodeLocation[1]]["isTarget"])
    visitedArray.push(startNodeLocation);

  return depthFirstSearchHelper(
    startNodeLocation,
    targetNodeLocation,
    grid,
    visitedNodes,
    gridObj
  );
};

const depthFirstSearchHelper = (
  currentNodeLocation,
  targetNodeLocation,
  grid,
  visitedArray,
  gridObj
) => {
  let backTrackArray = [];
  if (!compareArray(targetNodeLocation, currentNodeLocation)) {
    visitedArray.push(currentNodeLocation);

    var edges = gridObj.adjacentEdges(currentNodeLocation);

    for (let i = 0; i < edges.length; i++) {
      if (
        edges[i][0] >= 0 &&
        edges[i][0] <= gridObj.getRows() - 1 &&
        edges[i][1] >= 0 &&
        edges[i][1] <= gridObj.getCols() - 1
      ) {
        if (!grid[edges[i][0]][edges[i][1]]["visited"]) {
          grid[edges[i][0]][edges[i][1]][
            "parentNodeLocation"
          ] = currentNodeLocation;
          grid[edges[i][0]][edges[i][1]]["visited"] = true;

          if (compareArray(targetNodeLocation, edges[i])) {
            visitedArray.push(edges[i]);
            backTrackArray = pathfindingAlgorithmBackTrack(
              edges[i],
              gridObj.getStartNodeLocation(),
              grid
            );
            break;
          }

          if (!grid[edges[i][0]][edges[i][1]]["isWall"]) {
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

  return {
    visitedArray,
    backTrackArray,
  };
};
