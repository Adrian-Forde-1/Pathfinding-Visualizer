import {
  grid,
  setGrid,
  ROWS,
  COLS,
  adjacentEdges,
} from "../javascript/grid.js";

import { compareArray } from "../javascript/helpers/util.js";

// import { Queue } from "../DataStructures/queue";

export const visualizeBreathFirstSearch = (startNodeLocation) => {
  // const queue = new Queue();
  const queue = [];
  const visitiedArray = [];
  // queue.push(startNodeLocation);

  queue.push(startNodeLocation);

  if (!grid[startNodeLocation[0]][startNodeLocation[1]]["isTarget"]) {
    grid[startNodeLocation[0]][startNodeLocation[1]]["visited"] = true;

    while (queue.length > 0) {
      const firstLocation = queue.shift();

      if (grid[firstLocation[0]][firstLocation[1]]["isTarget"]) {
        const backTrackArray = breathFirstSearchBackTrack(
          grid[firstLocation[0]][firstLocation[1]]["parentNodeLocation"],
          startNodeLocation
        );
        return {
          visitiedArray,
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
              visitiedArray.push(edge);
            }
          }
        }
      });
    }
  }

  return visitiedArray;
};

const breathFirstSearchBackTrack = (firstLocation, startNodeLocation) => {
  var backTrackArray = [];
  backTrackArray.push(firstLocation);
  var currentLocation = firstLocation;
  var currentNode = grid[firstLocation[0]][firstLocation[1]];

  while (!compareArray(currentLocation, startNodeLocation)) {
    backTrackArray.push(currentNode["parentNodeLocation"]);
    currentNode =
      grid[currentNode["parentNodeLocation"][0]][
        currentNode["parentNodeLocation"][1]
      ];
    currentLocation = currentNode["parentNodeLocation"];
  }

  return backTrackArray.reverse();
};
