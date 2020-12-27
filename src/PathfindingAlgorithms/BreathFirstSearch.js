import { ROWS, COLS, adjacentEdges } from "../javascript/grid.js";
import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";

// import { Queue } from "../DataStructures/queue";

export const visualizeBreathFirstSearch = (startNodeLocation, grid) => {
  // const queue = new Queue();
  const queue = [];
  const visitedArray = [];
  // queue.push(startNodeLocation);

  queue.push(startNodeLocation);

  if (!grid[startNodeLocation[0]][startNodeLocation[1]]["isTarget"]) {
    grid[startNodeLocation[0]][startNodeLocation[1]]["visited"] = true;

    while (queue.length > 0) {
      const firstLocation = queue.shift();

      if (grid[firstLocation[0]][firstLocation[1]]["isTarget"]) {
        const backTrackArray = pathfindingAlgorithmBackTrack(
          grid[firstLocation[0]][firstLocation[1]]["parentNodeLocation"],
          startNodeLocation,
          grid
        );
        return {
          visitedArray,
          backTrackArray,
        };
      }

      var edges = adjacentEdges(firstLocation);

      edges.forEach((edge) => {
        if (
          edge[0] >= 0 &&
          edge[0] <= ROWS - 1 &&
          edge[1] >= 0 &&
          edge[1] <= COLS - 1
        ) {
          if (!grid[edge[0]][edge[1]]["visited"]) {
            grid[edge[0]][edge[1]]["visited"] = true;
            grid[edge[0]][edge[1]]["parentNodeLocation"] = firstLocation;
            if (!grid[edge[0]][edge[1]]["isWall"]) {
              queue.push(edge);
              visitedArray.push(edge);
            }
          }
        }
      });
    }
  }

  return visitedArray;
};
