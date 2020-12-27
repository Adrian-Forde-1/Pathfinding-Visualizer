import { compareArray } from "./util.js";

export const pathfindingAlgorithmBackTrack = (
  backTrackStartLocation,
  startNodeLocation,
  grid
) => {
  var backTrackArray = [];
  backTrackArray.push(backTrackStartLocation);
  var currentLocation = backTrackStartLocation;
  var currentNode = grid[backTrackStartLocation[0]][backTrackStartLocation[1]];

  console.log("Start Node Location: ", startNodeLocation);

  while (!compareArray(currentLocation, startNodeLocation)) {
    if (currentNode["parentNodeLocation"].length > 0) {
      backTrackArray.push(currentNode["parentNodeLocation"]);
      currentNode =
        grid[currentNode["parentNodeLocation"][0]][
          currentNode["parentNodeLocation"][1]
        ];
      currentLocation = currentNode["parentNodeLocation"];
    }
  }

  return backTrackArray.reverse();
};
