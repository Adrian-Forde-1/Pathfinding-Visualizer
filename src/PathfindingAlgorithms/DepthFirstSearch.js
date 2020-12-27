// import { ROWS, COLS, adjacentEdges } from "../javascript/grid.js";
import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { Grid } from "../javascript/Grid/grid.js";

// export const visualizeDepthFirstSearch = (startNodeLocation, grid) => {
//   let stack = [];
//   var visitedArray = [];

//   stack.push(startNodeLocation);

//   while (stack.length > 0) {
//     var currentNodeLocation = stack.pop();

//     if (grid[currentNodeLocation[0]][currentNodeLocation[1]]["isTarget"]) {
//       // const backTrackArray = pathfindingAlgorithmBackTrack(
//       //   grid[currentNodeLocation[0]][currentNodeLocation[1]][
//       //     "parentNodeLocation"
//       //   ],
//       //   startNodeLocation,
//       //   grid
//       // );
//       console.log(grid);
//       var arr = [];
//       return {
//         visitedArray,
//         arr,
//       };
//     }

//     if (!grid[currentNodeLocation[0]][currentNodeLocation[1]]["visited"]) {
//       grid[currentNodeLocation[0]][currentNodeLocation[1]]["visited"] = true;
//       visitedArray.push(currentNodeLocation);
//       var edges = adjacentEdges(currentNodeLocation);

//       edges.forEach((edge) => {
//         if (
//           edge[0] >= 0 &&
//           edge[0] <= ROWS - 1 &&
//           edge[1] >= 0 &&
//           edge[1] <= COLS - 1
//         ) {
//           grid[edge[0]][edge[1]]["parentNodeLocation"] = currentNodeLocation;
//           grid[edge[0]][edge[1]]["visited"] = true;
//           stack.push(edge);
//         }
//       });
//     }
//   }

//   return visitedArray;
// };

// export const visualizeDepthFirstSearch = (startNodeLocation, grid) => {
//   var visitedNodes = [];
//   var gridObj = new Grid();

//   const visitedArray = depthFirstSearchHelper(
//     startNodeLocation,
//     grid,
//     visitedNodes,
//     gridObj
//   );

//   // var backTrackArray = depthFirstSearchBackTrack(
//   //   visitedArray[visitedArray.length - 1],
//   //   startNodeLocation,
//   //   grid
//   // );
//   var arr = [];

//   return {
//     visitedArray,
//     arr,
//   };
// };

// const depthFirstSearchHelper = (
//   currentNodeLocation,
//   grid,
//   visitedArray,
//   gridObj
// ) => {
//   var vArr = [];
//   if (!grid[currentNodeLocation[0]][currentNodeLocation[1]]["isTarget"]) {
//     visitedArray.push(currentNodeLocation);
//     grid[currentNodeLocation[0]][currentNodeLocation[1]]["visited"] = true;

//     var edges = gridObj.adjacentEdges(currentNodeLocation);

//     edges.forEach((edge) => {
//       if (
//         edge[0] >= 0 &&
//         edge[0] <= ROWS - 1 &&
//         edge[1] >= 0 &&
//         edge[1] <= COLS - 1
//       ) {
//         if (!grid[edge[0]][edge[1]]["visited"]) {
//           grid[edge[0]][edge[1]]["parentNodeLocation"] = currentNodeLocation;
//           // grid[edge[0]][edge[1]]["visited"] = true;
//           if (!grid[edge[0]][edge[1]]["isWall"]) {
//             return depthFirstSearchHelper(edge, grid, visitedArray, gridObj);
//           }
//         }
//       }
//     });
//   } else {
//     vArr = [...visitedArray];
//     console.log();
//     return visitedArray;
//   }

//   if (vArr.length > 0) return vArr;
//   //   const backTrackArray = breathFirstSearchBackTrack(
//   //     grid[currentNodeLocation[0]][currentNodeLocation[1]]["parentNodeLocation"],
//   //     startNodeLocation,
//   //     grid
//   //   );
//   //   return {
//   //     visitedArray,
//   //     backTrackArray,
//   //   };
// };
