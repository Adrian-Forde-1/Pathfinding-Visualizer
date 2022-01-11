import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { compareArray } from "../javascript/helpers/util.js";
import PathfindingAlgorithm from "./PathfindingAlgorithm.js";

class Dijkstra extends PathfindingAlgorithm {
  sortedNodes = [];

  constructor(gridObj) {
    super(gridObj);
    this.sortedNodes = [...gridObj.getNodes()];
  }
  visualize = () => {
    if (
      !this.startNodeLocation ||
      !this.targetNodeLocation ||
      this.startNodeLocation === this.targetNodeLocation
    ) {
      return false;
    }

    if (compareArray(this.startNodeLocation, this.targetNodeLocation)) {
      return {
        visitedArray: this.visitedArray,
        backTrackArray: [],
      };
    }

    this.grid[this.currentNodeLocation[0]][this.currentNodeLocation[1]]["distance"] = 0;

    while (!compareArray(this.currentNodeLocation, this.targetNodeLocation)) {
      this.sortedNodes = this.sortNodesByDistance(this.sortedNodes);
      let node = this.sortedNodes.shift();
      this.currentNodeLocation = node.getLocation();
      this.grid[this.currentNodeLocation[0]][this.currentNodeLocation[1]]["visited"] = true;

      let edges = this.gridObj.adjacentEdges(this.currentNodeLocation);

      edges.forEach((edge) => {
        if (
          edge[0] >= 0 &&
          edge[0] <= this.gridObj.getRows() - 1 &&
          edge[1] >= 0 &&
          edge[1] <= this.gridObj.getCols() - 1
        ) {
          if (!this.grid[edge[0]][edge[1]]["visited"]) {
            if (this.grid[edge[0]][edge[1]]["isWall"]) {
              let nodeIndex = this.sortedNodes.findIndex((node) =>
                compareArray(node["location"], this.grid[edge[0]][edge[1]]["location"])
              );
              this.grid[edge[0]][edge[1]]["visited"] = true;
              this.sortedNodes.splice(nodeIndex, 1);

              //TODO: The algorithm is glitching because after it visites all the values,
              //that enclose the start node, it starts visiting the other nodes that have
              //a distance of 9999999999. I need to stop the algorithm if it has visited all the walls somehow

              //1. Do more than just remove the wall when it has been visited
              return;
            } else {
              this.visitedArray.push(this.currentNodeLocation);

              this.grid[edge[0]][edge[1]]["distance"] =
                this.gridObj.getNodeAtPosition(this.currentNodeLocation)["distance"] + 1;

              this.grid[edge[0]][edge[1]]["parentNodeLocation"] = this.currentNodeLocation;

              let nodeIndex = this.sortedNodes.findIndex((node) =>
                compareArray(node["location"], this.grid[edge[0]][edge[1]]["location"])
              );

              this.sortedNodes[nodeIndex]["distance"] =
                this.gridObj.getNodeAtPosition(this.currentNodeLocation)["distance"] + 1;
            }
          }
        }
      });
    }

    if (compareArray(this.currentNodeLocation, this.targetNodeLocation)) {
      this.backTrackArray = pathfindingAlgorithmBackTrack(
        this.currentNodeLocation,
        this.startNodeLocation,
        this.grid
      );
    }

    return {
      visitedArray: this.visitedArray,
      backTrackArray: this.backTrackArray,
    };
  };

  sortNodesByDistance = (nodes) => {
    let sortedNodes = nodes.sort((a, b) => this.compare(a, b));
    return sortedNodes;
  };

  compare = (a, b) => {
    if (a["distance"] < b["distance"]) return -1;
    if (a["distance"] > b["distance"]) return 1;

    return 0;
  };
}

export default Dijkstra;
